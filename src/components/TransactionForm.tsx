'use client';

import { useState, FormEvent } from 'react';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { Plus, X } from 'lucide-react';
import {
  Transaction,
  TransactionType,
  INCOME_CATEGORIES,
  EXPENSE_CATEGORIES,
} from '@/lib/types';

interface TransactionFormProps {
  onAdd: (transaction: Transaction) => void;
}

const defaultDate = () => format(new Date(), 'yyyy-MM-dd');

export default function TransactionForm({ onAdd }: TransactionFormProps) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(defaultDate);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  function validate(): boolean {
    const errs: Record<string, string> = {};
    const parsed = parseFloat(amount);
    if (!amount || isNaN(parsed) || parsed <= 0) {
      errs.amount = 'Enter a valid positive amount';
    }
    if (!category) errs.category = 'Select a category';
    if (!description.trim()) errs.description = 'Add a description';
    if (!date) errs.date = 'Select a date';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const transaction: Transaction = {
      id: uuidv4(),
      type,
      amount: parseFloat(parseFloat(amount).toFixed(2)),
      category,
      description: description.trim(),
      date,
      createdAt: new Date().toISOString(),
    };
    onAdd(transaction);
    // reset form
    setAmount('');
    setCategory('');
    setDescription('');
    setDate(defaultDate());
    setErrors({});
    setOpen(false);
  }

  function handleTypeChange(newType: TransactionType) {
    setType(newType);
    setCategory('');
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-95"
      >
        <Plus className="h-4 w-4" />
        Add Transaction
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">New Transaction</h2>
        <button
          onClick={() => setOpen(false)}
          className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Type toggle */}
        <div className="mb-4 flex rounded-xl bg-slate-100 p-1">
          {(['income', 'expense'] as TransactionType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => handleTypeChange(t)}
              className={`flex-1 rounded-lg py-2 text-sm font-semibold capitalize transition-all ${
                type === t
                  ? t === 'income'
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'bg-rose-500 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Amount */}
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Amount (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                $
              </span>
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className={`w-full rounded-lg border pl-8 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                  errors.amount
                    ? 'border-rose-400 focus:ring-rose-200'
                    : 'border-slate-200 focus:ring-blue-200'
                }`}
              />
            </div>
            {errors.amount && (
              <p className="mt-1 text-xs text-rose-500">{errors.amount}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                errors.category
                  ? 'border-rose-400 focus:ring-rose-200'
                  : 'border-slate-200 focus:ring-blue-200'
              }`}
            >
              <option value="">Select category…</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-xs text-rose-500">{errors.category}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                errors.date
                  ? 'border-rose-400 focus:ring-rose-200'
                  : 'border-slate-200 focus:ring-blue-200'
              }`}
            />
            {errors.date && (
              <p className="mt-1 text-xs text-rose-500">{errors.date}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What was this for?"
              maxLength={80}
              className={`w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                errors.description
                  ? 'border-rose-400 focus:ring-rose-200'
                  : 'border-slate-200 focus:ring-blue-200'
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-rose-500">{errors.description}</p>
            )}
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`rounded-lg px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md active:scale-95 ${
              type === 'income'
                ? 'bg-emerald-500 hover:bg-emerald-600'
                : 'bg-rose-500 hover:bg-rose-600'
            }`}
          >
            Save Transaction
          </button>
        </div>
      </form>
    </div>
  );
}
