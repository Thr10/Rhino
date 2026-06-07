import { SpinResult, SlotSymbol } from './SlotTypes';

interface SymbolConfig {
  symbol: SlotSymbol;
  weight: number;
}

export const REEL_COUNT = 5;
export const ROW_COUNT = 3;

export const SLOT_SYMBOLS: SymbolConfig[] = [
  { symbol: 'EMPTY', weight: 55 },
  { symbol: 'RHINO', weight: 12 },
  { symbol: 'MYSTERY_COIN', weight: 8 },
  { symbol: 'MYSTERY_RHINO', weight: 8 },
  { symbol: 'COIN_2', weight: 12 },
  { symbol: 'COIN_5', weight: 6 },
  { symbol: 'MINI', weight: 3 },
  { symbol: 'SUPER_COIN', weight: 2 },
  { symbol: 'SUPER_RHINO', weight: 2 },
  { symbol: 'BOOST', weight: 2 },
];

const PAY_TABLE: Record<SlotSymbol, number> = {
  EMPTY: 0,
  RHINO: 2,
  RHINO_JACKPOT: 10,
  MYSTERY: 3,
  MYSTERY_COIN: 3,
  MYSTERY_RHINO: 3,
  COIN_2: 2,
  COIN_5: 5,
  MINI: 10,
  SUPER_COIN: 20,
  SUPER_RHINO: 20,
  BOOST: 0,
};

export function spinReels(bet: number): SpinResult {
  const grid = createRandomGrid();
  const multiplier = getMultiplier(grid);

  return {
    grid,
    bet,
    multiplier,
    win: bet * multiplier,
  };
}

export function createRandomGrid() {
  return Array.from({ length: ROW_COUNT }, () => (
    Array.from({ length: REEL_COUNT }, pickSymbol)
  ));
}

function pickSymbol(): SlotSymbol {
  const totalWeight = SLOT_SYMBOLS.reduce((total, item) => total + item.weight, 0);
  let roll = Math.random() * totalWeight;

  for (const item of SLOT_SYMBOLS) {
    roll -= item.weight;
    if (roll <= 0) {
      return item.symbol;
    }
  }

  return SLOT_SYMBOLS[0].symbol;
}

function getMultiplier(grid: SlotSymbol[][]) {
  const moneySymbols = grid.flat().filter((symbol) => (
    symbol === 'COIN_2' || symbol === 'COIN_5' || symbol === 'MINI'
    || symbol === 'SUPER_COIN'
  ));

  return moneySymbols.reduce((total, symbol) => total + PAY_TABLE[symbol], 0);
}
