import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Trade } from '../../types';

interface InstrumentPieChartProps {
  trades: Trade[];
}

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];

export function InstrumentPieChart({ trades }: InstrumentPieChartProps) {
  const instrumentData = trades.reduce((acc: any[], trade) => {
    const existing = acc.find(item => item.name === trade.type);
    if (existing) {
      existing.value += Math.abs(trade.pnl);
    } else {
      acc.push({ name: trade.type, value: Math.abs(trade.pnl) });
    }
    return acc;
  }, []);

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={instrumentData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {instrumentData.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}