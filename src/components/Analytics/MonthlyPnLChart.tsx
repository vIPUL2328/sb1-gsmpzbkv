import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Trade } from '../../types';
import { format } from 'date-fns';

interface MonthlyPnLChartProps {
  trades: Trade[];
}

export function MonthlyPnLChart({ trades }: MonthlyPnLChartProps) {
  const monthlyData = trades.reduce((acc: any[], trade) => {
    const month = format(new Date(trade.date), 'MMM yyyy');
    const existingMonth = acc.find(item => item.month === month);
    
    if (existingMonth) {
      existingMonth.pnl += trade.pnl;
    } else {
      acc.push({ month, pnl: trade.pnl });
    }
    
    return acc;
  }, []);

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
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
  );
}