'use client';

import { ChevronLeft, ChevronRight, BarChart2, Wallet } from 'lucide-react';
import { useCashflow } from '@/hooks/useCashflow';
import Dashboard from '@/components/Dashboard';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import CashflowChart from '@/components/CashflowChart';
import CategoryChart from '@/components/CategoryChart';

export default function HomePage() {
  const {
    monthlyTransactions,
    monthlySummary,
    last6Months,
    categoryBreakdown,
    currentMonthLabel,
    isCurrentMonth,
    isLoaded,
    addTransaction,
    deleteTransaction,
    goToPreviousMonth,
    goToNextMonth,
  } = useCashflow();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Header ── */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <Wallet className="h-4 w-4 text-white" />
            </div>
            <span className="text-base font-bold text-slate-900 sm:text-lg">
              CashFlow
            </span>
            <span className="hidden rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600 sm:inline">
              Budget Tracker
            </span>
          </div>

          {/* Month Navigation */}
          <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-1 py-1 shadow-sm">
            <button
              onClick={goToPreviousMonth}
              className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="min-w-[130px] text-center text-sm font-semibold text-slate-800">
              {currentMonthLabel}
            </span>
            <button
              onClick={goToNextMonth}
              disabled={isCurrentMonth}
              className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {!isLoaded ? (
          <div className="flex h-64 items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
              <p className="text-sm text-slate-500">Loading your data…</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Summary Cards */}
            <Dashboard
              income={monthlySummary.income}
              expenses={monthlySummary.expenses}
              net={monthlySummary.net}
              savingsRate={monthlySummary.savingsRate}
            />

            {/* Charts Row */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
              {/* Cashflow bar chart — wider */}
              <div className="lg:col-span-3">
                <CashflowChart data={last6Months} />
              </div>
              {/* Category pie chart */}
              <div className="lg:col-span-2">
                <CategoryChart data={categoryBreakdown} />
              </div>
            </div>

            {/* Transactions Section */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-blue-600" />
                  <h2 className="text-base font-semibold text-slate-800">
                    Transactions
                    <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
                      {monthlyTransactions.length}
                    </span>
                  </h2>
                </div>
                <TransactionForm onAdd={addTransaction} />
              </div>
              <TransactionList
                transactions={monthlyTransactions}
                onDelete={deleteTransaction}
              />
            </div>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="mt-12 border-t border-slate-200 py-6">
        <p className="text-center text-xs text-slate-400">
          CashFlow &mdash; Your data is stored locally in your browser.
        </p>
      </footer>
    </div>
  );
}
