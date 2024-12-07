import React from 'react';
import { PnLDistributionChart } from '../components/Analytics/PnLDistributionChart';
import { InstrumentPieChart } from '../components/Analytics/InstrumentPieChart';
import { IndexPnLChart } from '../components/Analytics/IndexPnLChart';
import { Trade, TradeStats } from '../types';

interface AnalyticsDashboardProps {
  trades: Trade[];
  stats: TradeStats;
}

export function AnalyticsDashboard({ trades, stats }: AnalyticsDashboardProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">P&L Distribution</h2>
        <PnLDistributionChart trades={trades} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Instrument Distribution</h2>
          <InstrumentPieChart trades={trades} />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Win Rate</h3>
              <p className="text-2xl font-bold">
                {((trades.filter(t => t.pnl > 0).length / trades.length) * 100).toFixed(1)}%
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Highest Win</h3>
              <p className="text-2xl font-bold text-green-600">
                ₹{Math.max(...trades.map(t => t.pnl), 0).toLocaleString()}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Highest Loss</h3>
              <p className="text-2xl font-bold text-red-600">
                ₹{Math.min(...trades.map(t => t.pnl), 0).toLocaleString()}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Average Win</h3>
              <p className="text-2xl font-bold text-green-600">
                ₹{(trades.filter(t => t.pnl > 0).reduce((sum, t) => sum + t.pnl, 0) / trades.filter(t => t.pnl > 0).length || 0).toLocaleString()}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Average Loss</h3>
              <p className="text-2xl font-bold text-red-600">
                ₹{(trades.filter(t => t.pnl < 0).reduce((sum, t) => sum + t.pnl, 0) / trades.filter(t => t.pnl < 0).length || 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Index/Stock Performance</h2>
        <IndexPnLChart trades={trades} />
      </div>
    </div>
  );
}