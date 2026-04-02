'use client';

import { TrendingUp, TrendingDown, DollarSign, PiggyBank } from 'lucide-react';

interface DashboardProps {
  income: number;
  expenses: number;
  net: number;
  savingsRate: number;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.abs(value));
}

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  colorClass: string;
  bgClass: string;
  borderClass: string;
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  colorClass,
  bgClass,
  borderClass,
}: StatCardProps) {
  return (
    <div
      className={`rounded-2xl border ${borderClass} bg-white p-6 shadow-sm transition-shadow hover:shadow-md`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className={`mt-1 text-3xl font-bold tracking-tight ${colorClass}`}>
            {value}
          </p>
          <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
        </div>
        <div className={`rounded-xl ${bgClass} p-3`}>{icon}</div>
      </div>
    </div>
  );
}

export default function Dashboard({
  income,
  expenses,
  net,
  savingsRate,
}: DashboardProps) {
  const isPositive = net >= 0;
  const savingsDisplay =
    savingsRate >= 0 ? `${savingsRate.toFixed(1)}%` : '0%';

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Income"
        value={formatCurrency(income)}
        subtitle="This month"
        icon={<TrendingUp className="h-5 w-5 text-emerald-600" />}
        colorClass="text-emerald-600"
        bgClass="bg-emerald-50"
        borderClass="border-emerald-100"
      />
      <StatCard
        title="Total Expenses"
        value={formatCurrency(expenses)}
        subtitle="This month"
        icon={<TrendingDown className="h-5 w-5 text-rose-500" />}
        colorClass="text-rose-500"
        bgClass="bg-rose-50"
        borderClass="border-rose-100"
      />
      <StatCard
        title="Net Cashflow"
        value={(isPositive ? '+' : '-') + formatCurrency(net)}
        subtitle={isPositive ? 'Positive balance' : 'Negative balance'}
        icon={
          <DollarSign
            className={`h-5 w-5 ${isPositive ? 'text-blue-600' : 'text-amber-500'}`}
          />
        }
        colorClass={isPositive ? 'text-blue-600' : 'text-amber-500'}
        bgClass={isPositive ? 'bg-blue-50' : 'bg-amber-50'}
        borderClass={isPositive ? 'border-blue-100' : 'border-amber-100'}
      />
      <StatCard
        title="Savings Rate"
        value={savingsDisplay}
        subtitle="Of income saved"
        icon={<PiggyBank className="h-5 w-5 text-violet-600" />}
        colorClass="text-violet-600"
        bgClass="bg-violet-50"
        borderClass="border-violet-100"
      />
    </div>
  );
}
