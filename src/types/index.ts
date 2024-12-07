export interface Trade {
  id: string;
  date: string;
  instrument: string;
  type: 'OPTION' | 'FUTURE';
  position: 'LONG' | 'SHORT';
  index: string;
  pnl: number;
  remarks: string;
}

export interface CapitalTransaction {
  id: string;
  date: string;
  amount: number;
  type: 'DEPOSIT' | 'WITHDRAWAL';
  remarks: string;
}

export interface TradeStats {
  totalPnL: number;
  monthlyAverage: number;
  currentCapital: number;
  highestWin: number;
  highestLoss: number;
  averageWin: number;
  averageLoss: number;
  winRate: number;
}

export type TimeFrame = 'day' | 'week' | 'month' | 'quarter' | 'year';