import { _decorator, Component, Label, sp, UITransform, Vec3 } from 'cc';
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

  private currentSymbol: SlotSymbol | null = null;
  private currentAnimation = '';

  public resizeToCell(width: number, height: number) {
    const transform = this.node.getComponent(UITransform);
    if (transform) {
      transform.setContentSize(width, height);
    }

    const scale = Math.min(width, height) / this.baseSymbolSize * this.visualScale;

    if (this.skeleton) {
      this.skeleton.node.setPosition(Vec3.ZERO);
      this.skeleton.node.setScale(scale, scale, 1);
    }

    if (this.valueLabel) {
      this.valueLabel.node.setPosition(Vec3.ZERO);
    }
  }

  public setSymbol(symbol: SlotSymbol, animation: SymbolAnimationName = 'idle', loop = true, force = false) {
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
    if (this.skeleton?.findAnimation(preferred)) {
      return preferred;
    }
    if (this.skeleton?.findAnimation('idle')) {
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
