import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { TradeForm } from './components/TradeForm';
import { CapitalForm } from './components/CapitalForm';
import { AnalyticsDashboard } from './pages/AnalyticsDashboard';
import { Trade, TradeStats, CapitalTransaction } from './types';
import { TrendingUp, BarChart2 } from 'lucide-react';

function App() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [capitalTransactions, setCapitalTransactions] = useState<CapitalTransaction[]>([]);
  const [stats, setStats] = useState<TradeStats>({
    totalPnL: 0,
    monthlyAverage: 0,
    currentCapital: 1000000,
    highestWin: 0,
    highestLoss: 0,
    averageWin: 0,
    averageLoss: 0,
    winRate: 0
  });

  useEffect(() => {
    const totalPnL = trades.reduce((sum, trade) => sum + trade.pnl, 0);
    const totalCapital = capitalTransactions.reduce((sum, transaction) => {
      return sum + (transaction.type === 'DEPOSIT' ? transaction.amount : -transaction.amount);
    }, 1000000);
    
    const winningTrades = trades.filter(t => t.pnl > 0);
    const losingTrades = trades.filter(t => t.pnl < 0);
    
    setStats({
      totalPnL,
      monthlyAverage: trades.length > 0 ? totalPnL / 12 : 0,
      currentCapital: totalCapital + totalPnL,
      highestWin: Math.max(...trades.map(t => t.pnl), 0),
      highestLoss: Math.min(...trades.map(t => t.pnl), 0),
      averageWin: winningTrades.length > 0 ? winningTrades.reduce((sum, t) => sum + t.pnl, 0) / winningTrades.length : 0,
      averageLoss: losingTrades.length > 0 ? losingTrades.reduce((sum, t) => sum + t.pnl, 0) / losingTrades.length : 0,
      winRate: trades.length > 0 ? (winningTrades.length / trades.length) * 100 : 0
    });
  }, [trades, capitalTransactions]);

  const handleTradeSubmit = (trade: Trade) => {
    setTrades([...trades, trade]);
  };

  const handleCapitalTransaction = (transaction: CapitalTransaction) => {
    setCapitalTransactions([...capitalTransactions, transaction]);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data? This cannot be undone.')) {
      setTrades([]);
      setCapitalTransactions([]);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-blue-600" />
                <h1 className="ml-2 text-2xl font-bold text-gray-900">Trading Journal</h1>
              </div>
              <nav className="flex space-x-4">
                <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
                <Link to="/analytics" className="text-gray-700 hover:text-blue-600">Analytics</Link>
              </nav>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={
              <>
                <Dashboard stats={stats} />
                
                <div className="mt-8 grid grid-cols-1 gap-8">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Capital Management</h2>
                    <CapitalForm onSubmit={handleCapitalTransaction} />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Trade</h2>
                    <TradeForm onSubmit={handleTradeSubmit} onReset={handleReset} />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Trades</h2>
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Index/Stock</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">P&L</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {trades.map((trade) => (
                            <tr key={trade.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trade.date}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trade.type}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trade.position}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trade.index}</td>
                              <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${trade.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                ₹{trade.pnl.toLocaleString()}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-900">{trade.remarks}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            } />
            <Route path="/analytics" element={<AnalyticsDashboard trades={trades} stats={stats} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;