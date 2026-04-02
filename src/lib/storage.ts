import { Transaction } from './types';

const STORAGE_KEY = 'cashflow_transactions';

export function loadTransactions(): Transaction[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveTransactions(transactions: Transaction[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch {
    console.error('Failed to persist transactions to localStorage');
  }
}

export function addTransaction(
  transactions: Transaction[],
  transaction: Transaction,
): Transaction[] {
  const updated = [transaction, ...transactions];
  saveTransactions(updated);
  return updated;
}

export function deleteTransaction(
  transactions: Transaction[],
  id: string,
): Transaction[] {
  const updated = transactions.filter((t) => t.id !== id);
  saveTransactions(updated);
  return updated;
}

export function hasSeedData(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEY) !== null;
}
