import React, { useState } from 'react';
import { 
  Shield, Settings, Coins, Users, Building2, Clock, CheckCircle, XCircle, FileText, Eye
} from 'lucide-react';

const INITIAL_STOCK_PRICE_USD = 12.5;
const INITIAL_USD_TO_SYP_RATE = 15000;
const INITIAL_SHAM_CASH_ACCOUNT = 'SC-88942-SY';

const INITIAL_TRANSACTIONS = [
  {
    id: 'tx-101',
    user_name: 'أحمد محمود',
    type: 'buy',
    shares: 50,
    amount_usd: 625,
    sham_cash_ref: 'SC-TXN-998124',
    status: 'approved',
    date: '2026-11-08 14:30'
  },
  {
    id: 'tx-102',
    user_name: 'سامر العلي',
    type: 'buy',
    shares: 20,
    amount_usd: 250,
    sham_cash_ref: 'SC-TXN-773419',
    status: 'pending',
    date: '2026-11-09 10:15'
  }
];

export default function AdminDashboard() {
  const [stockPriceUSD, setStockPriceUSD] = useState(INITIAL_STOCK_PRICE_USD);
  const [exchangeRate, setExchangeRate] = useState(INITIAL_USD_TO_SYP_RATE);
  const [shamAccount, setShamAccount] = useState(INITIAL_SHAM_CASH_ACCOUNT);

  const [priceInput, setPriceInput] = useState(INITIAL_STOCK_PRICE_USD);
  const [rateInput, setRateInput] = useState(INITIAL_USD_TO_SYP_RATE);
  const [shamInput, setShamInput] = useState(INITIAL_SHAM_CASH_ACCOUNT);

  const [dividendProfitUSD, setDividendProfitUSD] = useState(5000);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [msg, setMsg] = useState('');

  const handleMarketUpdate = (e) => {
    e.preventDefault();
    setStockPriceUSD(parseFloat(priceInput) || stockPriceUSD);
    setExchangeRate(parseFloat(rateInput) || exchangeRate);
    setShamAccount(shamInput);
    setMsg('تم حفظ الإعدادات وسعر الصرف بنجاح!');
    setTimeout(() => setMsg(''), 4000);
  };

  const handleApproveReject = (id, newStatus) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans dir-rtl" dir="rtl">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center text-slate-950 font-black text-xl">
              <Shield className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <span className="text-xl font-black text-amber-400">لوحة الإدارة العليا (Admin)</span>
              <span className="block text-[10px] text-slate-400">إدارة الأسهم، سعر الصرف، وإشعارات شام كاش</span>
            </div>
          </div>
          <a href="/" className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 text-emerald-400">
            العودة لموقع المستثمر 🏠
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Top Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <span className="text-xs text-slate-400 block mb-1">سعر السهم الحالي</span>
            <div className="text-2xl font-black text-amber-400">${stockPriceUSD}</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <span className="text-xs text-slate-400 block mb-1">سعر صرف الليرة (USD/SYP)</span>
            <div className="text-2xl font-black text-emerald-400">{exchangeRate.toLocaleString('ar-SY')} ل.س</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <span className="text-xs text-slate-400 block mb-1">طلبات شام كاش المعلقة</span>
            <div className="text-2xl font-black text-rose-400">
              {transactions.filter(t => t.status === 'pending').length} طلبات
            </div>
          </div>
        </div>

        {/* Admin Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Price Settings */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-amber-400" /> تعديل أسعار المنصة وحساب شام كاش
            </h3>
            <form onSubmit={handleMarketUpdate} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-300 mb-1">سعر السهم ($)</label>
                <input
                  type="number"
                  step="0.1"
                  value={priceInput}
                  onChange={(e) => setPriceInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-300 mb-1">سعر الصرف (SYP)</label>
                <input
                  type="number"
                  value={rateInput}
                  onChange={(e) => setRateInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-300 mb-1">رقم حساب شام كاش</label>
                <input
                  type="text"
                  value={shamInput}
                  onChange={(e) => setShamInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs font-mono"
                />
              </div>
              <button type="submit" className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 font-bold text-xs rounded-xl">
                حفظ التعديلات
              </button>
              {msg && <div className="p-3 bg-emerald-500/10 text-emerald-400 text-xs rounded-xl">{msg}</div>}
            </form>
          </div>

          {/* Dividends */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
              <Coins className="w-5 h-5 text-emerald-400" /> توزيع الأرباح
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-slate-300 mb-1">صافي الربح للتوزيع ($)</label>
                <input
                  type="number"
                  value={dividendProfitUSD}
                  onChange={(e) => setDividendProfitUSD(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs"
                />
              </div>
              <button className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 font-bold text-xs rounded-xl">
                اعتماد وتوزيع الأرباح فورياً
              </button>
            </div>
          </div>
        </div>

        {/* Transactions Verification Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-base font-bold text-slate-100 mb-4">التحقق من طلبات شام كاش</h3>
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="p-2">المستثمر</th>
                <th className="p-2">الأسهم</th>
                <th className="p-2">المبلغ ($)</th>
                <th className="p-2">إشعار شام كاش</th>
                <th className="p-2">القرار</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td className="p-2 font-bold">{tx.user_name}</td>
                  <td className="p-2 font-mono">{tx.shares} سهم</td>
                  <td className="p-2 font-mono text-amber-400">${tx.amount_usd}</td>
                  <td className="p-2 font-mono text-emerald-400">{tx.sham_cash_ref}</td>
                  <td className="p-2">
                    {tx.status === 'pending' ? (
                      <div className="flex gap-2">
                        <button onClick={() => handleApproveReject(tx.id, 'approved')} className="px-2 py-1 bg-emerald-600 rounded">
                          موافقة
                        </button>
                        <button onClick={() => handleApproveReject(tx.id, 'rejected')} className="px-2 py-1 bg-rose-600 rounded">
                          رفض
                        </button>
                      </div>
                    ) : (
                      <span className="text-emerald-400">{tx.status}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
