'use client';

import { format, parseISO } from 'date-fns';
import { Trash2, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { Transaction } from '@/lib/types';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

const CATEGORY_COLORS: Record<string, string> = {
  // Income
  Salary: 'bg-emerald-100 text-emerald-700',
  Freelance: 'bg-teal-100 text-teal-700',
  Investment: 'bg-cyan-100 text-cyan-700',
  Rental: 'bg-sky-100 text-sky-700',
  // Expense
  Housing: 'bg-violet-100 text-violet-700',
  Food: 'bg-orange-100 text-orange-700',
  Transport: 'bg-amber-100 text-amber-700',
  Utilities: 'bg-blue-100 text-blue-700',
  Entertainment: 'bg-pink-100 text-pink-700',
  Health: 'bg-red-100 text-red-700',
  Education: 'bg-indigo-100 text-indigo-700',
  Other: 'bg-slate-100 text-slate-600',
};

function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] ?? 'bg-slate-100 text-slate-600';
}

export default function TransactionList({
  transactions,
  onDelete,
}: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
          <ArrowUpCircle className="h-6 w-6 text-slate-400" />
        </div>
        <p className="text-sm font-medium text-slate-600">No transactions yet</p>
        <p className="mt-1 text-xs text-slate-400">
          Add your first income or expense for this month.
        </p>
      </div>
    );
  }

  // Sort by date descending
  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="divide-y divide-slate-50">
      {sorted.map((tx) => {
        const isIncome = tx.type === 'income';
        return (
          <div
            key={tx.id}
            className="group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-slate-50"
          >
            {/* Icon */}
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                isIncome ? 'bg-emerald-50' : 'bg-rose-50'
              }`}
            >
              {isIncome ? (
                <ArrowUpCircle className="h-4 w-4 text-emerald-500" />
              ) : (
                <ArrowDownCircle className="h-4 w-4 text-rose-500" />
              )}
            </div>

            {/* Description + category */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-800">
                {tx.description}
              </p>
              <div className="mt-0.5 flex items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getCategoryColor(tx.category)}`}
                >
                  {tx.category}
                </span>
                <span className="text-xs text-slate-400">
                  {format(parseISO(tx.date), 'MMM d, yyyy')}
                </span>
              </div>
            </div>

            {/* Amount */}
            <div className="flex items-center gap-3">
              <span
                className={`text-sm font-semibold tabular-nums ${
                  isIncome ? 'text-emerald-600' : 'text-rose-500'
                }`}
              >
                {isIncome ? '+' : '-'}
                {formatCurrency(tx.amount)}
              </span>

              {/* Delete button — visible on hover */}
              <button
                onClick={() => onDelete(tx.id)}
                className="rounded-lg p-1.5 text-slate-300 opacity-0 transition-all hover:bg-rose-50 hover:text-rose-500 group-hover:opacity-100"
                aria-label={`Delete ${tx.description}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
