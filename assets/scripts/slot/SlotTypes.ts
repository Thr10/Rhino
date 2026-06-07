export type SlotSymbol =
  | 'EMPTY'
  | 'RHINO'
  | 'RHINO_JACKPOT'
  | 'MYSTERY'
  | 'MYSTERY_COIN'
  | 'MYSTERY_RHINO'
  | 'COIN_2'
  | 'COIN_5'
  | 'MINI'
  | 'SUPER_COIN'
  | 'SUPER_RHINO'
  | 'BOOST';

export interface SpinResult {
  grid: SlotSymbol[][];
  bet: number;
  multiplier: number;
  win: number;
  balance?: number;
}
