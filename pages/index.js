import React, { useState } from 'react';
import { 
  TrendingUp, Wallet, Coins, Clock, CheckCircle, XCircle, 
  ArrowUpRight, BarChart3, Plus, Minus, QrCode, Copy, Check, Upload, AlertCircle, CreditCard, Bell
} from 'lucide-react';

const INITIAL_STOCK_PRICE_USD = 12.5;
const INITIAL_USD_TO_SYP_RATE = 15000;

const INITIAL_SHAM_CASH_INFO = {
  account_number: 'SC-88942-SY',
  merchant_name: 'شركة تاجر للاستثمار الشامل',
  qr_code_url: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ShamCash:SC-88942-SY'
};

const INITIAL_TRANSACTIONS = [
  {
    id: 'tx-101',
    type: 'buy',
    shares: 50,
    amount_usd: 625,
    sham_cash_ref: 'SC-TXN-998124',
    status: 'approved',
    date: '2026-11-08 14:30'
  },
  {
    id: 'tx-102',
    type: 'buy',
    shares: 20,
    amount_usd: 250,
    sham_cash_ref: 'SC-TXN-773419',
    status: 'pending',
    date: '2026-11-09 10:15'
  }
];

export default function UserDashboard() {
  const [activeCurrency, setActiveCurrency] = useState('SYP');
  const [stockPriceUSD] = useState(INITIAL_STOCK_PRICE_USD);
  const [exchangeRate] = useState(INITIAL_USD_TO_SYP_RATE);
  const [shamCashInfo] = useState(INITIAL_SHAM_CASH_INFO);

  const [userPortfolio] = useState({ shares: 150, balance_usd: 1250 });
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);

  const [tradeType, setTradeType] = useState('buy');
  const [sharesInput, setSharesInput] = useState(10);
  const [shamCashRefInput, setShamCashRefInput] = useState('');
  const [receiptFile, setReceiptFile] = useState(null);
  const [tradeMessage, setTradeMessage] = useState('');
  const [copiedAccount, setCopiedAccount] = useState(false);

  const formatMoney = (valInUSD, currencyOverride = activeCurrency) => {
    const num = currencyOverride === 'USD' ? Number(valInUSD) : Number(valInUSD) * exchangeRate;
    if (currencyOverride === 'USD') {
      return `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `${Math.round(num).toLocaleString('ar-SY')} ل.س`;
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(shamCashInfo.account_number);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 3000);
  };

  const handleTradeSubmit = (e) => {
    e.preventDefault();
    if (sharesInput <= 0) return;

    const totalCostUSD = sharesInput * stockPriceUSD;

    if (tradeType === 'sell' && sharesInput > userPortfolio.shares) {
      setTradeMessage('خطأ: عدد الأسهم المطلوبة للبيع أكبر من رصيدك الحالي!');
      return;
    }

    if (tradeType === 'buy' && !shamCashRefInput.trim()) {
      setTradeMessage('يرجى إدخال رقم العملية (إشعار التحويل) الخاص بحساب شام كاش.');
      return;
    }

    const newTx = {
      id: `tx-${Date.now()}`,
      type: tradeType,
      shares: parseInt(sharesInput),
      amount_usd: totalCostUSD,
      sham_cash_ref: tradeType === 'buy' ? shamCashRefInput : null,
      status: 'pending',
      date: new Date().toLocaleString('ar-EG')
    };

    setTransactions([newTx, ...transactions]);
    setTradeMessage(`تم إرسال طلب ${tradeType === 'buy' ? 'الشراء عبر شام كاش' : 'البيع'} بنجاح! الطلب قيد التدقيق لدى الإدارة.`);
    setShamCashRefInput('');
    setReceiptFile(null);
    setTimeout(() => setTradeMessage(''), 6000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans dir-rtl" dir="rtl">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-emerald-500 flex items-center justify-center text-slate-950 font-black text-xl">
              ت
            </div>
            <div>
              <span className="text-xl font-black bg-gradient-to-r from-amber-400 to-emerald-400 bg-clip-text text-transparent">
                تاجر | بوابة المستثمر
              </span>
              <span className="block text-[10px] text-slate-400">منصة الاستثمار التشاركي الذكي</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a href="/admin" className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 text-amber-400">
              الانتقال للوحة الإدارة ⚙️
            </a>
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setActiveCurrency('USD')}
                className={`px-3 py-1 rounded-lg font-bold ${activeCurrency === 'USD' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setActiveCurrency('SYP')}
                className={`px-3 py-1 rounded-lg font-bold ${activeCurrency === 'SYP' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'}`}
              >
                ل.س (SYP)
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <span className="text-xs text-slate-400 block mb-1">إجمالي قيمة المحفظة</span>
            <div className="text-2xl font-black text-slate-100">
              {formatMoney(userPortfolio.shares * stockPriceUSD + userPortfolio.balance_usd)}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <span className="text-xs text-slate-400 block mb-1">سعر السهم الحالي</span>
            <div className="text-2xl font-black text-amber-400">{formatMoney(stockPriceUSD)}</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <span className="text-xs text-slate-400 block mb-1">عدد الأسهم المملوكة</span>
            <div className="text-2xl font-black text-slate-100">{userPortfolio.shares} سهم</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <span className="text-xs text-slate-400 block mb-1">الرصيد النقدي</span>
            <div className="text-2xl font-black text-slate-100">{formatMoney(userPortfolio.balance_usd)}</div>
          </div>
        </div>

        {/* Trade & Sham Cash */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center justify-between">
              <span>طلب تداول جديد</span>
              <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">شام كاش مفعّل</span>
            </h3>

            <form onSubmit={handleTradeSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-300 mb-1">عدد الأسهم</label>
                <input
                  type="number"
                  min="1"
                  value={sharesInput}
                  onChange={(e) => setSharesInput(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-center font-bold"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>المبلغ بالليرة:</span>
                  <span className="font-bold text-emerald-400">{formatMoney(sharesInput * stockPriceUSD, 'SYP')}</span>
                </div>
                <div className="flex justify-between font-bold text-sm border-t border-slate-800 pt-2">
                  <span>المبلغ الإجمالي:</span>
                  <span className="text-amber-400">{formatMoney(sharesInput * stockPriceUSD)}</span>
                </div>
              </div>

              {tradeType === 'buy' && (
                <div className="p-4 bg-slate-950 border border-emerald-500/30 rounded-xl space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={shamCashInfo.qr_code_url} alt="QR" className="w-20 h-20 bg-white p-1 rounded-lg" />
                    <div className="text-xs space-y-1">
                      <span className="text-slate-400 block">حساب شام كاش للتحويل:</span>
                      <span className="font-mono font-bold text-amber-400 block">{shamCashInfo.account_number}</span>
                      <button type="button" onClick={handleCopyAccount} className="text-[10px] text-emerald-400">
                        {copiedAccount ? 'تم النسخ ✓' : 'نسخ رقم الحساب'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1">رقم إشعار تحويل شام كاش *</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: SC-TXN-984210"
                      value={shamCashRefInput}
                      onChange={(e) => setShamCashRefInput(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs font-mono"
                    />
                  </div>
                </div>
              )}

              <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 font-bold rounded-xl text-sm">
                تأكيد الشراء عبر شام كاش
              </button>

              {tradeMessage && <div className="p-3 bg-emerald-500/10 text-emerald-400 text-xs rounded-xl">{tradeMessage}</div>}
            </form>
          </div>

          {/* Transactions Log */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-base font-bold text-slate-100 mb-4">سجل العمليات</h3>
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="p-2">النوع</th>
                  <th className="p-2">الأسهم</th>
                  <th className="p-2">المبلغ</th>
                  <th className="p-2">رقم الإشعار</th>
                  <th className="p-2">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td className="p-2 font-bold text-emerald-400">شراء</td>
                    <td className="p-2 font-mono">{tx.shares} سهم</td>
                    <td className="p-2 font-mono text-amber-400">{formatMoney(tx.amount_usd)}</td>
                    <td className="p-2 font-mono">{tx.sham_cash_ref || '-'}</td>
                    <td className="p-2">
                      <span className="text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded text-[10px]">{tx.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
