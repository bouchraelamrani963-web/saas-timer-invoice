import { Transaction } from './types';

/**
 * Generates realistic seed transactions for the past 6 months
 * so the app looks great on first load.
 */
export function generateSeedData(): Transaction[] {
  const now = new Date();
  const transactions: Transaction[] = [];
  let idCounter = 1;

  const makeId = () => `seed-${idCounter++}`;
  const isoDate = (y: number, m: number, d: number) =>
    new Date(y, m, d).toISOString().split('T')[0];

  // We'll generate data for the current month and the 5 preceding months
  for (let offset = 5; offset >= 0; offset--) {
    const date = new Date(now.getFullYear(), now.getMonth() - offset, 1);
    const year = date.getFullYear();
    const month = date.getMonth(); // 0-indexed

    // --- Income ---
    // Salary on 1st
    transactions.push({
      id: makeId(),
      type: 'income',
      amount: 6500,
      category: 'Salary',
      description: 'Monthly salary',
      date: isoDate(year, month, 1),
      createdAt: new Date(year, month, 1).toISOString(),
    });

    // Freelance mid-month (not every month)
    if (offset % 2 === 0) {
      transactions.push({
        id: makeId(),
        type: 'income',
        amount: Math.round((800 + Math.random() * 700) / 50) * 50,
        category: 'Freelance',
        description: 'Web design project',
        date: isoDate(year, month, 15),
        createdAt: new Date(year, month, 15).toISOString(),
      });
    }

    // Investment income (dividends, quarterly)
    if (offset % 3 === 0) {
      transactions.push({
        id: makeId(),
        type: 'income',
        amount: Math.round((200 + Math.random() * 300) / 10) * 10,
        category: 'Investment',
        description: 'Dividend income',
        date: isoDate(year, month, 20),
        createdAt: new Date(year, month, 20).toISOString(),
      });
    }

    // --- Expenses ---
    // Housing (rent)
    transactions.push({
      id: makeId(),
      type: 'expense',
      amount: 1800,
      category: 'Housing',
      description: 'Monthly rent',
      date: isoDate(year, month, 1),
      createdAt: new Date(year, month, 1).toISOString(),
    });

    // Utilities
    transactions.push({
      id: makeId(),
      type: 'expense',
      amount: Math.round((100 + Math.random() * 60) / 5) * 5,
      category: 'Utilities',
      description: 'Electricity & internet',
      date: isoDate(year, month, 5),
      createdAt: new Date(year, month, 5).toISOString(),
    });

    // Food – groceries
    transactions.push({
      id: makeId(),
      type: 'expense',
      amount: Math.round((300 + Math.random() * 150) / 10) * 10,
      category: 'Food',
      description: 'Groceries',
      date: isoDate(year, month, 8),
      createdAt: new Date(year, month, 8).toISOString(),
    });

    // Food – dining out
    transactions.push({
      id: makeId(),
      type: 'expense',
      amount: Math.round((80 + Math.random() * 80) / 5) * 5,
      category: 'Food',
      description: 'Restaurants & takeout',
      date: isoDate(year, month, 18),
      createdAt: new Date(year, month, 18).toISOString(),
    });

    // Transport
    transactions.push({
      id: makeId(),
      type: 'expense',
      amount: Math.round((60 + Math.random() * 80) / 5) * 5,
      category: 'Transport',
      description: 'Fuel & public transit',
      date: isoDate(year, month, 10),
      createdAt: new Date(year, month, 10).toISOString(),
    });

    // Entertainment
    transactions.push({
      id: makeId(),
      type: 'expense',
      amount: Math.round((40 + Math.random() * 80) / 5) * 5,
      category: 'Entertainment',
      description: 'Streaming & activities',
      date: isoDate(year, month, 12),
      createdAt: new Date(year, month, 12).toISOString(),
    });

    // Health – not every month
    if (offset % 2 !== 0) {
      transactions.push({
        id: makeId(),
        type: 'expense',
        amount: Math.round((50 + Math.random() * 150) / 10) * 10,
        category: 'Health',
        description: 'Pharmacy & gym',
        date: isoDate(year, month, 14),
        createdAt: new Date(year, month, 14).toISOString(),
      });
    }

    // Education – occasional
    if (offset === 2 || offset === 5) {
      transactions.push({
        id: makeId(),
        type: 'expense',
        amount: 149,
        category: 'Education',
        description: 'Online course subscription',
        date: isoDate(year, month, 22),
        createdAt: new Date(year, month, 22).toISOString(),
      });
    }
  }

  return transactions;
}
