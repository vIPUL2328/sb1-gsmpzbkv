import React from 'react';
import { BarChart, LineChart, PieChart, Activity, Wallet } from 'lucide-react';
import { TradeStats } from '../types';

interface DashboardProps {
  stats: TradeStats;
}

export function Dashboard({ stats }: DashboardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700">Total P&L</h3>
          <Activity className="text-blue-500" />
        </div>
        <p className={`text-2xl font-bold ${stats.totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          ₹{stats.totalPnL.toLocaleString()}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700">Monthly Average</h3>
          <BarChart className="text-purple-500" />
        </div>
        <p className={`text-2xl font-bold ${stats.monthlyAverage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          ₹{stats.monthlyAverage.toLocaleString()}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700">Current Capital</h3>
          <Wallet className="text-green-500" />
        </div>
        <p className="text-2xl font-bold text-gray-800">
          ₹{stats.currentCapital.toLocaleString()}
        </p>
      </div>
    </div>
  );
}