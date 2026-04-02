'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { format, startOfMonth, endOfMonth, parseISO, subMonths } from 'date-fns';
import { Transaction, MonthlySummary } from '@/lib/types';
import {
  loadTransactions,
  addTransaction,
  deleteTransaction,
  hasSeedData,
} from '@/lib/storage';
import { generateSeedData } from '@/lib/seedData';

export function useCashflow() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Date>(() => startOfMonth(new Date()));
  const [isLoaded, setIsLoaded] = useState(false);

  // Hydrate from localStorage (or seed) once on the client
  useEffect(() => {
    if (hasSeedData()) {
      setTransactions(loadTransactions());
    } else {
      const seed = generateSeedData();
      // persist seed
      import('@/lib/storage').then(({ saveTransactions }) => saveTransactions(seed));
      setTransactions(seed);
    }
    setIsLoaded(true);
  }, []);

  // --- Derived: transactions for the currently viewed month ---
  const monthlyTransactions = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return transactions.filter((t) => {
      const d = parseISO(t.date);
      return d >= start && d <= end;
    });
  }, [transactions, currentMonth]);

  // --- Derived: summary for the current month ---
  const monthlySummary = useMemo(() => {
    const income = monthlyTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = monthlyTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return {
      income,
      expenses,
      net: income - expenses,
      savingsRate: income > 0 ? ((income - expenses) / income) * 100 : 0,
    };
  }, [monthlyTransactions]);

  // --- Derived: last-6-months bar chart data ---
  const last6Months = useMemo((): MonthlySummary[] => {
    return Array.from({ length: 6 }, (_, i) => {
      const monthDate = subMonths(startOfMonth(new Date()), 5 - i);
      const key = format(monthDate, 'yyyy-MM');
      const start = startOfMonth(monthDate);
      const end = endOfMonth(monthDate);
      const slice = transactions.filter((t) => {
        const d = parseISO(t.date);
        return d >= start && d <= end;
      });
      const income = slice
        .filter((t) => t.type === 'income')
        .reduce((s, t) => s + t.amount, 0);
      const expenses = slice
        .filter((t) => t.type === 'expense')
        .reduce((s, t) => s + t.amount, 0);
      return { month: key, income, expenses, net: income - expenses };
    });
  }, [transactions]);

  // --- Derived: expense breakdown by category for current month ---
  const categoryBreakdown = useMemo(() => {
    const map = new Map<string, number>();
    monthlyTransactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        map.set(t.category, (map.get(t.category) ?? 0) + t.amount);
      });
    return Array.from(map.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [monthlyTransactions]);

  // --- Actions ---
  const handleAddTransaction = useCallback((transaction: Transaction) => {
    setTransactions((prev) => addTransaction(prev, transaction));
  }, []);

  const handleDeleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => deleteTransaction(prev, id));
  }, []);

  const goToPreviousMonth = useCallback(() => {
    setCurrentMonth((prev) => subMonths(prev, 1));
  }, []);

  const goToNextMonth = useCallback(() => {
    setCurrentMonth((prev) => {
      const next = new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
      // Don't navigate past the current month
      if (next > startOfMonth(new Date())) return prev;
      return next;
    });
  }, []);

  const isCurrentMonth = useMemo(
    () => format(currentMonth, 'yyyy-MM') === format(new Date(), 'yyyy-MM'),
    [currentMonth],
  );

  const currentMonthLabel = useMemo(
    () => format(currentMonth, 'MMMM yyyy'),
    [currentMonth],
  );

  return {
    transactions,
    monthlyTransactions,
    monthlySummary,
    last6Months,
    categoryBreakdown,
    currentMonth,
    currentMonthLabel,
    isCurrentMonth,
    isLoaded,
    addTransaction: handleAddTransaction,
    deleteTransaction: handleDeleteTransaction,
    goToPreviousMonth,
    goToNextMonth,
  };
}
