import { _decorator, Button, Component, Label } from 'cc';
import { createRandomGrid, spinReels } from './SlotMath';
import { SlotBoard } from './SlotBoard';
import { SlotSymbol, SpinResult } from './SlotTypes';

const { ccclass, property } = _decorator;

@ccclass('SlotMachine')
export class SlotMachine extends Component {
  @property(Label)
  public reelsLabel: Label | null = null;

  @property(SlotBoard)
  public slotBoard: SlotBoard | null = null;

  @property(Label)
  public balanceLabel: Label | null = null;

  @property(Label)
  public statusLabel: Label | null = null;

  @property(Button)
  public spinButton: Button | null = null;

  @property
  public balance = 1000;

  @property
  public bet = 10;

  @property
  public spinAnimationSeconds = 1.2;

  private isSpinning = false;
  private spinTimer = 0;
  private spinResult: SpinResult | null = null;

  start() {
    this.assertSceneBindings();
    this.spinButton.node.on(Button.EventType.CLICK, this.spin, this);
    this.refreshLabels();
  }

  onDestroy() {
    this.spinButton?.node.off(Button.EventType.CLICK, this.spin, this);
  }

  public spin() {
    if (this.isSpinning) {
      return;
    }

    if (this.balance < this.bet) {
      this.setStatus('Not enough balance');
      return;
    }

    this.balance -= this.bet;
    this.setBalance();
    this.setStatus('Spinning...');

    this.spinResult = spinReels(this.bet);
    this.isSpinning = true;
    this.spinTimer = 0;
    this.spinButton.interactable = false;
  }

  update(deltaTime: number) {
    if (!this.isSpinning || !this.spinResult) {
      return;
    }

    this.spinTimer += deltaTime;
    const progress = Math.min(this.spinTimer / this.spinAnimationSeconds, 1);

    this.setGrid(this.mixSpinGrid(this.spinResult.grid, progress), 'fall');

    if (progress >= 1) {
      this.finishSpin(this.spinResult);
    }
  }

  private finishSpin(result: SpinResult) {
    this.isSpinning = false;
    this.spinResult = null;
    this.balance += result.win;
    this.spinButton.interactable = true;

    this.showResult(result);
  }

  private showResult(result: SpinResult) {
    this.setGrid(result.grid, 'idle', true);
    this.setBalance();

    if (result.win > 0) {
      this.setStatus(`Win ${result.win} (${result.multiplier}x)`);
    } else {
      this.setStatus('No win');
    }
  }

  private refreshLabels() {
    this.setGrid([
      ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
      ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
      ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
    ] as SlotSymbol[][]);
    this.setBalance();
    this.setStatus(`Bet ${this.bet}. Press Spin.`);
  }

  private setGrid(grid: SlotSymbol[][], animation: 'fall' | 'idle' = 'idle', force = false) {
    if (this.slotBoard) {
      this.slotBoard.setGrid(grid, animation, force);
      return;
    }

    if (this.reelsLabel) {
      this.reelsLabel.string = grid.map((row) => row.join('  ')).join('\n');
    }
  }

  private setBalance() {
    if (this.balanceLabel) {
      this.balanceLabel.string = `Balance ${this.balance}`;
    }
  }

  private setStatus(text: string) {
    if (this.statusLabel) {
      this.statusLabel.string = text;
    }
  }

  private mixSpinGrid(finalGrid: SlotSymbol[][], progress: number) {
    const randomGrid = createRandomGrid();
    const stopThresholds = [0.45, 0.55, 0.65, 0.78, 0.9];

    return randomGrid.map((row, rowIndex) => row.map((symbol, reelIndex) => (
      progress >= stopThresholds[reelIndex] ? finalGrid[rowIndex][reelIndex] : symbol
    )));
  }

  private assertSceneBindings() {
    const missingFields: string[] = [];

    if (!this.slotBoard && !this.reelsLabel) {
      missingFields.push('slotBoard or reelsLabel');
    }
    if (!this.balanceLabel) {
      missingFields.push('balanceLabel');
    }
    if (!this.statusLabel) {
      missingFields.push('statusLabel');
    }
    if (!this.spinButton) {
      missingFields.push('spinButton');
    }

    if (missingFields.length > 0) {
      throw new Error(`[SlotMachine] Missing scene bindings: ${missingFields.join(', ')}`);
    }
  }
}
