import { _decorator, Color, Component, EventKeyboard, Graphics, input, Input, KeyCode, Label, Node, sp, UITransform, Vec3 } from 'cc';
import { SlotSymbol } from './SlotTypes';

const { ccclass, property, requireComponent } = _decorator;

export type SymbolAnimationName =
  | 'appear'
  | 'dispatch'
  | 'fall'
  | 'idle'
  | 'multiply'
  | 'sticky_appear'
  | 'sticky_disappear'
  | 'sticky_idle'
  | 'trigger'
  | 'win'
  | 'reveal_in'
  | 'reveal_loop'
  | 'reveal_out'
  | 'land'
  | 'transform';

type SpinState = 'idle' | 'accelerating' | 'spinning' | 'stopping';

interface SpinVisualItem {
  node: Node;
  visualNode: Node;
  skeleton: sp.Skeleton;
  symbol: SlotSymbol;
}

@ccclass('SymbolCell')
@requireComponent(UITransform)
export class SymbolCell extends Component {
  @property(sp.Skeleton)
  public skeleton: sp.Skeleton | null = null;

  @property(Label)
  public valueLabel: Label | null = null;

  @property(sp.SkeletonData)
  public coinData: sp.SkeletonData | null = null;

  @property(sp.SkeletonData)
  public rhinoData: sp.SkeletonData | null = null;

  @property(sp.SkeletonData)
  public mysteryCoinData: sp.SkeletonData | null = null;

  @property(sp.SkeletonData)
  public mysteryRhinoData: sp.SkeletonData | null = null;

  @property(sp.SkeletonData)
  public rhinoJackpotData: sp.SkeletonData | null = null;

  @property(sp.SkeletonData)
  public superCoinData: sp.SkeletonData | null = null;

  @property(sp.SkeletonData)
  public superRhinoData: sp.SkeletonData | null = null;

  @property(sp.SkeletonData)
  public boostData: sp.SkeletonData | null = null;

  @property
  public baseSymbolSize = 180;

  @property
  public visualScale = 0.9;

  @property
  public visualOffsetX = 0;

  @property
  public visualOffsetY = 0;

  @property
  public previewOnStart = false;

  @property
  public previewSymbol = 'COIN_2';

  @property
  public previewAnimation = 'idle';

  @property
  public enableSpaceDebug = false;

  @property
  public debugStopTarget = 'RHINO';

  @property
  public spinItemCount = 5;

  @property
  public minSpinSpeed = 420;

  @property
  public maxSpinSpeed = 1400;

  @property
  public spinAcceleration = 2600;

  @property
  public stopDeceleration = 1800;

  @property
  public stopRandomCount = 3;

  @property
  public maxSpinStretch = 0.38;

  @property
  public fastSpinOpacity = 170;

  @property
  public showDebugBorder = true;

  @property
  public debugBorderLineWidth = 2;

  private currentSymbol: SlotSymbol | null = null;
  private currentAnimation = '';
  private cellWidth = 100;
  private cellHeight = 100;
  private spinState: SpinState = 'idle';
  private spinSpeed = 0;
  private spinItems: SpinVisualItem[] = [];
  private stopQueue: SlotSymbol[] = [];
  private targetItem: SpinVisualItem | null = null;
  private targetSymbol: SlotSymbol | null = null;

  start() {
    if (this.enableSpaceDebug) {
      input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    if (!this.previewOnStart) {
      return;
    }

    const animation = this.previewAnimation as SymbolAnimationName;
    this.setSymbol(
      this.previewSymbol as SlotSymbol,
      animation,
      animation === 'idle' || animation === 'sticky_idle',
      true,
    );
  }

  onDestroy() {
    input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
  }

  update(deltaTime: number) {
    if (this.spinState === 'idle') {
      return;
    }

    this.updateSpinSpeed(deltaTime);
    this.updateSpinItems(deltaTime);
    this.applySpinMotionLook();
  }

  public resizeToCell(width: number, height: number) {
    this.cellWidth = width;
    this.cellHeight = height;

    const transform = this.node.getComponent(UITransform);
    if (transform) {
      transform.setContentSize(width, height);
    }

    const scale = Math.min(width, height) / this.baseSymbolSize * this.visualScale;

    if (this.skeleton) {
      this.skeleton.node.setPosition(new Vec3(this.visualOffsetX, this.visualOffsetY, 0));
      if (this.skeleton.node !== this.node) {
        this.skeleton.node.setScale(scale, scale, 1);
      }
    }

    if (this.valueLabel) {
      this.valueLabel.node.setPosition(Vec3.ZERO);
    }

    for (const item of this.spinItems) {
      this.resizeSpinItem(item);
    }

    this.drawDebugBorder();
  }

  public setSymbol(symbol: SlotSymbol, animation: SymbolAnimationName = 'idle', loop = true, force = false) {
    this.stopSpinImmediately();

    if (symbol === 'EMPTY') {
      this.clear();
      return;
    }

    const skeletonData = this.getSkeletonData(symbol);
    if (!this.skeleton || !skeletonData) {
      this.showFallbackText(symbol);
      return;
    }

    this.node.active = true;
    this.skeleton.node.active = true;
    this.setValueText(symbol);

    if (this.skeleton.skeletonData !== skeletonData) {
      this.skeleton.skeletonData = skeletonData;
      force = true;
    }

    const animationName = this.resolveAnimation(animation);
    if (!force && this.currentSymbol === symbol && this.currentAnimation === animationName) {
      return;
    }

    this.currentSymbol = symbol;
    this.currentAnimation = animationName;
    this.skeleton.setAnimation(0, animationName, loop);
  }

  public startSpin() {
    if (this.spinState !== 'idle') {
      return;
    }

    const startSymbol = this.currentSymbol && this.currentSymbol !== 'EMPTY'
      ? this.currentSymbol
      : this.previewSymbol as SlotSymbol;

    this.createSpinItems(startSymbol);
    this.setIdleVisible(false);
    this.spinSpeed = this.minSpinSpeed;
    this.spinState = 'accelerating';
    this.stopQueue = [];
    this.targetItem = null;
    this.targetSymbol = null;
  }

  public stopTo(targetSymbol: SlotSymbol) {
    if (this.spinState === 'idle') {
      this.setSymbol(targetSymbol, 'idle', true, true);
      return;
    }

    if (this.targetSymbol) {
      return;
    }

    this.targetSymbol = targetSymbol;
    this.stopQueue = [];
    for (let index = 0; index < this.stopRandomCount; index += 1) {
      this.stopQueue.push(this.pickRandomSymbol());
    }
    this.stopQueue.push(targetSymbol);
    this.spinState = 'stopping';
  }

  public playRandom() {
    const symbol = this.pickRandomSymbol();
    const animation = this.pickRandomAnimation();
    this.setSymbol(symbol, animation, animation === 'idle' || animation === 'sticky_idle', true);
  }

  public clear() {
    this.currentSymbol = 'EMPTY';
    this.currentAnimation = '';

    if (this.skeleton) {
      this.skeleton.node.active = false;
    }
    if (this.valueLabel) {
      this.valueLabel.string = '';
    }
  }

  private getSkeletonData(symbol: SlotSymbol) {
    switch (symbol) {
      case 'COIN_2':
      case 'COIN_5':
      case 'MINI':
        return this.coinData;
      case 'RHINO':
        return this.rhinoData;
      case 'MYSTERY_COIN':
        return this.mysteryCoinData;
      case 'MYSTERY_RHINO':
      case 'MYSTERY':
        return this.mysteryRhinoData;
      case 'RHINO_JACKPOT':
        return this.rhinoJackpotData;
      case 'SUPER_COIN':
        return this.superCoinData;
      case 'SUPER_RHINO':
        return this.superRhinoData;
      case 'BOOST':
        return this.boostData;
      default:
        return null;
    }
  }

  private resolveAnimation(preferred: SymbolAnimationName) {
    return this.resolveAnimationFor(this.skeleton, preferred);
  }

  private resolveAnimationFor(skeleton: sp.Skeleton | null, preferred: SymbolAnimationName) {
    if (skeleton?.findAnimation(preferred)) {
      return preferred;
    }
    if (skeleton?.findAnimation('idle')) {
      return 'idle';
    }
    return preferred;
  }

  private setValueText(symbol: SlotSymbol) {
    if (!this.valueLabel) {
      return;
    }

    switch (symbol) {
      case 'COIN_2':
        this.valueLabel.string = '2.00';
        break;
      case 'COIN_5':
        this.valueLabel.string = '5.00';
        break;
      case 'MINI':
        this.valueLabel.string = 'MINI';
        break;
      default:
        this.valueLabel.string = '';
        break;
    }
  }

  private showFallbackText(symbol: SlotSymbol) {
    this.node.active = true;
    if (this.valueLabel) {
      this.valueLabel.string = symbol;
    }
  }

  private onKeyDown(event: EventKeyboard) {
    if (!this.enableSpaceDebug || event.keyCode !== KeyCode.SPACE) {
      return;
    }

    if (this.spinState === 'idle') {
      this.startSpin();
      return;
    }

    this.stopTo(this.debugStopTarget as SlotSymbol);
  }

  private updateSpinSpeed(deltaTime: number) {
    if (this.spinState === 'accelerating') {
      this.spinSpeed = Math.min(this.maxSpinSpeed, this.spinSpeed + this.spinAcceleration * deltaTime);
      if (this.spinSpeed >= this.maxSpinSpeed) {
        this.spinState = 'spinning';
      }
      return;
    }

    if (this.spinState === 'stopping') {
      this.spinSpeed = Math.max(this.minSpinSpeed, this.spinSpeed - this.stopDeceleration * deltaTime);
    }
  }

  private updateSpinItems(deltaTime: number) {
    const spacing = this.getSpinItemSpacing();
    const recycleY = spacing * 1.5;

    for (const item of this.spinItems) {
      item.node.setPosition(item.node.position.x, item.node.position.y + this.spinSpeed * deltaTime, 0);

      if (item.node.position.y > recycleY) {
        item.node.setPosition(item.node.position.x, item.node.position.y - spacing * this.spinItems.length, 0);
        this.assignNextSpinSymbol(item);
      }
    }

    if (this.targetItem && this.targetItem.node.position.y >= 0) {
      this.finishSpinToTarget();
    }
  }

  private applySpinMotionLook() {
    const speedRate = Math.min(1, Math.max(0, (this.spinSpeed - this.minSpinSpeed) / (this.maxSpinSpeed - this.minSpinSpeed)));
    const scale = this.getVisualScale();
    const scaleY = scale * (1 + this.maxSpinStretch * speedRate);
    const opacity = Math.round(255 - (255 - this.fastSpinOpacity) * speedRate);

    for (const item of this.spinItems) {
      item.visualNode.setScale(scale, scaleY, 1);
      item.skeleton.color = new Color(255, 255, 255, opacity);
    }
  }

  private createSpinItems(startSymbol: SlotSymbol) {
    this.destroySpinItems();

    const spacing = this.getSpinItemSpacing();
    const count = Math.max(3, this.spinItemCount);

    for (let index = 0; index < count; index += 1) {
      const node = new Node(`SpinItem_${index}`);
      node.layer = this.node.layer;
      node.parent = this.node;
      node.setPosition(0, -spacing * index, 0);

      const visualNode = new Node('Visual');
      visualNode.layer = this.node.layer;
      visualNode.parent = node;

      const skeleton = visualNode.addComponent(sp.Skeleton);
      skeleton.premultipliedAlpha = false;

      const item: SpinVisualItem = {
        node,
        visualNode,
        skeleton,
        symbol: index === 0 ? startSymbol : this.pickRandomSymbol(),
      };

      this.resizeSpinItem(item);
      this.setSpinItemSymbol(item, item.symbol);
      this.spinItems.push(item);
    }
  }

  private resizeSpinItem(item: SpinVisualItem) {
    const transform = item.node.getComponent(UITransform) ?? item.node.addComponent(UITransform);
    transform.setContentSize(this.cellWidth, this.cellHeight);
    item.visualNode.setPosition(new Vec3(this.visualOffsetX, this.visualOffsetY, 0));
    item.visualNode.setScale(this.getVisualScale(), this.getVisualScale(), 1);
  }

  private setSpinItemSymbol(item: SpinVisualItem, symbol: SlotSymbol) {
    const skeletonData = this.getSkeletonData(symbol);
    item.symbol = symbol;

    if (!skeletonData) {
      item.node.active = false;
      return;
    }

    item.node.active = true;
    item.skeleton.skeletonData = skeletonData;
    item.skeleton.setAnimation(0, this.resolveAnimationFor(item.skeleton, 'idle'), true);
  }

  private assignNextSpinSymbol(item: SpinVisualItem) {
    if (this.stopQueue.length > 0) {
      const symbol = this.stopQueue.shift() as SlotSymbol;
      this.setSpinItemSymbol(item, symbol);

      if (symbol === this.targetSymbol) {
        this.targetItem = item;
      }
      return;
    }

    this.setSpinItemSymbol(item, this.pickRandomSymbol());
  }

  private finishSpinToTarget() {
    const target = this.targetSymbol;
    this.destroySpinItems();
    this.spinState = 'idle';
    this.spinSpeed = 0;
    this.stopQueue = [];
    this.targetItem = null;
    this.targetSymbol = null;

    if (target) {
      this.setIdleVisible(true);
      this.setSymbol(target, 'idle', true, true);
    }
  }

  private stopSpinImmediately() {
    if (this.spinState === 'idle') {
      return;
    }

    this.destroySpinItems();
    this.spinState = 'idle';
    this.spinSpeed = 0;
    this.stopQueue = [];
    this.targetItem = null;
    this.targetSymbol = null;
    this.setIdleVisible(true);
  }

  private destroySpinItems() {
    for (const item of this.spinItems) {
      item.node.destroy();
    }
    this.spinItems = [];
  }

  private setIdleVisible(visible: boolean) {
    if (this.skeleton) {
      this.skeleton.enabled = visible;
    }
    if (this.valueLabel) {
      this.valueLabel.node.active = visible;
    }
  }

  private getSpinItemSpacing() {
    return Math.max(1, this.cellHeight);
  }

  private getVisualScale() {
    return Math.min(this.cellWidth, this.cellHeight) / this.baseSymbolSize * this.visualScale;
  }

  private drawDebugBorder() {
    let graphics = this.node.getComponent(Graphics);

    if (!this.showDebugBorder) {
      if (graphics) {
        graphics.clear();
      }
      return;
    }

    graphics = graphics ?? this.node.addComponent(Graphics);
    graphics.clear();
    graphics.lineWidth = this.debugBorderLineWidth;
    graphics.strokeColor = new Color(255, 220, 80, 220);
    graphics.rect(-this.cellWidth / 2, -this.cellHeight / 2, this.cellWidth, this.cellHeight);
    graphics.stroke();
  }

  private pickRandomSymbol(): SlotSymbol {
    const symbols: SlotSymbol[] = [
      'COIN_2',
      'COIN_5',
      'MINI',
      'RHINO',
      'MYSTERY_COIN',
      'MYSTERY_RHINO',
      'RHINO_JACKPOT',
      'SUPER_COIN',
      'SUPER_RHINO',
      'BOOST',
    ];

    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  private pickRandomAnimation(): SymbolAnimationName {
    const animations: SymbolAnimationName[] = [
      'appear',
      'fall',
      'idle',
      'trigger',
      'win',
      'reveal_in',
      'reveal_loop',
      'reveal_out',
      'land',
      'transform',
      'sticky_appear',
      'sticky_idle',
      'sticky_disappear',
    ];

    return animations[Math.floor(Math.random() * animations.length)];
  }
}
