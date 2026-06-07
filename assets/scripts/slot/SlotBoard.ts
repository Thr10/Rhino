import { _decorator, Component, Label, UITransform, Vec3 } from 'cc';
import { REEL_COUNT, ROW_COUNT } from './SlotMath';
import { SymbolAnimationName, SymbolCell } from './SymbolCell';
import { SlotSymbol } from './SlotTypes';

const { ccclass, property, requireComponent } = _decorator;

@ccclass('SlotBoard')
@requireComponent(UITransform)
export class SlotBoard extends Component {
  @property([SymbolCell])
  public symbolCells: SymbolCell[] = [];

  @property([Label])
  public symbolLabels: Label[] = [];

  @property
  public columnGap = 8;

  @property
  public rowGap = 8;

  @property
  public cellAspectRatio = 1;

  @property
  public deriveHeightFromWidth = true;

  start() {
    this.normalizeSymbolCells();
    this.layoutCells();
  }

  public setGrid(grid: SlotSymbol[][], animation: SymbolAnimationName = 'idle', force = false) {
    this.assertGrid(grid);
    this.normalizeSymbolCells();
    this.layoutCells();

    for (let row = 0; row < ROW_COUNT; row += 1) {
      for (let reel = 0; reel < REEL_COUNT; reel += 1) {
        const symbol = grid[row][reel];
        const cell = this.getCell(row, reel);
        if (cell) {
          cell.setSymbol(symbol, animation, animation === 'idle' || animation === 'sticky_idle', force);
          continue;
        }

        const label = this.getLegacyLabel(row, reel);
        if (label) {
          label.string = this.formatSymbol(symbol);
        }
      }
    }
  }

  public playRandomCells() {
    for (const cell of this.symbolCells) {
      cell.playRandom();
    }
  }

  public clear() {
    this.layoutCells();

    for (const cell of this.symbolCells) {
      cell.clear();
    }

    for (const label of this.symbolLabels) {
      label.string = '';
    }
  }

  public layoutCells() {
    this.normalizeSymbolCells();

    const boardTransform = this.node.getComponent(UITransform);
    if (!boardTransform) {
      return;
    }

    const boardWidth = boardTransform.width;
    const cellWidth = (boardWidth - this.columnGap * (REEL_COUNT - 1)) / REEL_COUNT;
    const cellHeight = cellWidth / this.cellAspectRatio;
    const boardHeight = this.deriveHeightFromWidth
      ? cellHeight * ROW_COUNT + this.rowGap * (ROW_COUNT - 1)
      : boardTransform.height;

    if (this.deriveHeightFromWidth) {
      boardTransform.setContentSize(boardWidth, boardHeight);
    }

    const finalCellHeight = this.deriveHeightFromWidth
      ? cellHeight
      : (boardHeight - this.rowGap * (ROW_COUNT - 1)) / ROW_COUNT;
    const startX = -boardWidth / 2 + cellWidth / 2;
    const startY = boardHeight / 2 - finalCellHeight / 2;

    for (let row = 0; row < ROW_COUNT; row += 1) {
      for (let reel = 0; reel < REEL_COUNT; reel += 1) {
        const cellNode = this.getCell(row, reel)?.node ?? this.getLegacyLabel(row, reel)?.node;
        if (!cellNode) {
          continue;
        }

        const cell = this.getCell(row, reel);
        if (cell) {
          cell.resizeToCell(cellWidth, finalCellHeight);
        }

        const cellTransform = cellNode.getComponent(UITransform);
        if (cellTransform) {
          cellTransform.setContentSize(cellWidth, finalCellHeight);
        }

        cellNode.setPosition(new Vec3(
          startX + reel * (cellWidth + this.columnGap),
          startY - row * (finalCellHeight + this.rowGap),
          0,
        ));
      }
    }
  }

  private getCell(row: number, reel: number) {
    return this.symbolCells[row * REEL_COUNT + reel] ?? null;
  }

  private normalizeSymbolCells() {
    const uniqueCells: SymbolCell[] = [];
    const seenCells = new Set<SymbolCell>();

    for (const cell of this.symbolCells) {
      if (!cell || seenCells.has(cell)) {
        continue;
      }

      seenCells.add(cell);
      uniqueCells.push(cell);
    }

    if (uniqueCells.length === 0) {
      uniqueCells.push(...this.getComponentsInChildren(SymbolCell));
    }

    if (uniqueCells.length !== this.symbolCells.length) {
      this.symbolCells = uniqueCells;
    }
  }

  private getLegacyLabel(row: number, reel: number) {
    return this.symbolLabels[row * REEL_COUNT + reel] ?? null;
  }

  private assertGrid(grid: SlotSymbol[][]) {
    if (grid.length !== ROW_COUNT || grid.some((row) => row.length !== REEL_COUNT)) {
      throw new Error(`[SlotBoard] Expected ${ROW_COUNT}x${REEL_COUNT} grid.`);
    }
  }

  private formatSymbol(symbol: SlotSymbol) {
    switch (symbol) {
      case 'EMPTY':
        return '';
      case 'RHINO':
        return 'RH';
      case 'MYSTERY':
        return 'MY';
      case 'COIN_2':
        return '2.00';
      case 'COIN_5':
        return '5.00';
      case 'MINI':
        return 'MINI';
      default:
        return symbol;
    }
  }
}
