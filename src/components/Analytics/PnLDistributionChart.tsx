import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Trade, TimeFrame } from '../../types';
import { format, startOfWeek, startOfMonth, startOfQuarter, startOfYear } from 'date-fns';

interface PnLDistributionChartProps {
  trades: Trade[];
}

export function PnLDistributionChart({ trades }: PnLDistributionChartProps) {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('month');

  const getGroupKey = (date: Date) => {
    switch (timeFrame) {
      case 'day':
        return format(date, 'yyyy-MM-dd');
      case 'week':
        return format(startOfWeek(date), 'yyyy-MM-dd');
      case 'month':
        return format(startOfMonth(date), 'MMM yyyy');
      case 'quarter':
        return format(startOfQuarter(date), "'Q'Q yyyy");
      case 'year':
        return format(startOfYear(date), 'yyyy');
      default:
        return format(date, 'MMM yyyy');
    }
  };

  const groupedData = trades.reduce((acc: any[], trade) => {
    const key = getGroupKey(new Date(trade.date));
    const existing = acc.find(item => item.period === key);
    
    if (existing) {
      existing.pnl += trade.pnl;
    } else {
      acc.push({ period: key, pnl: trade.pnl });
    }
    
    return acc;
  }, []);

  return (
    <div>
      <div className="mb-4">
        <select
          value={timeFrame}
          onChange={(e) => setTimeFrame(e.target.value as TimeFrame)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="day">Daily</option>
          <option value="week">Weekly</option>
          <option value="month">Monthly</option>
          <option value="quarter">Quarterly</option>
          <option value="year">Yearly</option>
        </select>
      </div>
      
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={groupedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => [`₹${value.toLocaleString()}`, 'P&L']}
            />
            <Bar 
              dataKey="pnl" 
              fill="#4F46E5"
              name="P&L"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}