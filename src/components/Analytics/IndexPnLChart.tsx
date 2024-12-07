import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Trade, TimeFrame } from '../../types';
import { format } from 'date-fns';
import { indices, nifty50Stocks } from '../../data/indices';

interface IndexPnLChartProps {
  trades: Trade[];
}

export function IndexPnLChart({ trades }: IndexPnLChartProps) {
  const [selectedIndex, setSelectedIndex] = useState<string>('all');
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('month');

  const filteredTrades = selectedIndex === 'all' 
    ? trades 
    : trades.filter(trade => trade.index === selectedIndex);

  const indexData = filteredTrades.reduce((acc: any[], trade) => {
    const existing = acc.find(item => item.index === trade.index);
    if (existing) {
      existing.pnl += trade.pnl;
    } else {
      acc.push({ index: trade.index, pnl: trade.pnl });
    }
    return acc;
  }, []);

  return (
    <div>
      <div className="mb-4 flex gap-4">
        <select
          value={selectedIndex}
          onChange={(e) => setSelectedIndex(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="all">All Indices/Stocks</option>
          <optgroup label="Indices">
            {indices.map(index => (
              <option key={index} value={index}>{index}</option>
            ))}
          </optgroup>
          <optgroup label="Stocks">
            {nifty50Stocks.map(stock => (
              <option key={stock} value={stock}>{stock}</option>
            ))}
          </optgroup>
        </select>

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
          <BarChart data={indexData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="index" />
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