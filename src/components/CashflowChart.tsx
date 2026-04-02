'use client';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { format, parseISO } from 'date-fns';
import { MonthlySummary } from '@/lib/types';

interface CashflowChartProps {
  data: MonthlySummary[];
}

function formatMonth(monthStr: string): string {
  try {
    // monthStr is "yyyy-MM", parse as first day of that month
    return format(parseISO(`${monthStr}-01`), 'MMM yy');
  } catch {
    return monthStr;
  }
}

function formatYAxis(value: number): string {
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
  return `$${value}`;
}

interface TooltipPayload {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  const formatValue = (v: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(v);

  const income = payload.find((p) => p.name === 'Income')?.value ?? 0;
  const expenses = payload.find((p) => p.name === 'Expenses')?.value ?? 0;
  const net = income - expenses;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
      <p className="mb-2 text-xs font-semibold text-slate-500">
        {label ? formatMonth(label) : ''}
      </p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-xs">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-slate-600">{entry.name}:</span>
          <span className="font-semibold text-slate-800">
            {formatValue(entry.value)}
          </span>
        </div>
      ))}
      <div className="mt-2 border-t border-slate-100 pt-2">
        <div className="flex items-center gap-2 text-xs">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />
          <span className="text-slate-600">Net:</span>
          <span
            className={`font-bold ${net >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}
          >
            {net >= 0 ? '+' : ''}
            {formatValue(net)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CashflowChart({ data }: CashflowChartProps) {
  const chartData = data.map((d) => ({
    month: d.month,
    Income: d.income,
    Expenses: d.expenses,
  }));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-800">
          Income vs Expenses
        </h3>
        <p className="text-xs text-slate-400">Last 6 months overview</p>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
            barCategoryGap="30%"
            barGap={3}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f1f5f9"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tickFormatter={formatMonth}
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={formatYAxis}
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
              width={44}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: '#f8fafc' }}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }}
              iconType="circle"
              iconSize={8}
            />
            <Bar
              dataKey="Income"
              fill="#10b981"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
            <Bar
              dataKey="Expenses"
              fill="#f43f5e"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
