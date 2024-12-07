import React, { useState } from 'react';
import { indices, nifty50Stocks } from '../data/indices';
import { Trade } from '../types';

interface TradeFormProps {
  onSubmit: (trade: Trade) => void;
  onReset: () => void;
}

export function TradeForm({ onSubmit, onReset }: TradeFormProps) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    instrument: '',
    type: 'OPTION',
    position: 'LONG',
    index: '',
    pnl: '',
    remarks: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: Date.now().toString(),
      pnl: parseFloat(formData.pnl)
    } as Trade);
    setFormData({
      ...formData,
      pnl: '',
      remarks: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as 'OPTION' | 'FUTURE' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="OPTION">Option</option>
            <option value="FUTURE">Future</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Position</label>
          <select
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value as 'LONG' | 'SHORT' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="LONG">Long</option>
            <option value="SHORT">Short</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Index/Stock</label>
          <select
            value={formData.index}
            onChange={(e) => setFormData({ ...formData, index: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select Index/Stock</option>
            {indices.map((index) => (
              <option key={index} value={index}>{index}</option>
            ))}
            {nifty50Stocks.map((stock) => (
              <option key={stock} value={stock}>{stock}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">P&L</label>
          <input
            type="number"
            value={formData.pnl}
            onChange={(e) => setFormData({ ...formData, pnl: e.target.value })}
            placeholder="Enter P&L amount"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Remarks</label>
          <textarea
            value={formData.remarks}
            onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
          />
        </div>
      </div>

      <div className="mt-4 flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Trade
        </button>
        <button
          type="button"
          onClick={onReset}
          className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Reset All Data
        </button>
      </div>
    </form>
  );
}