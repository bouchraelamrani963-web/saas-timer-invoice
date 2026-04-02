'use client';

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';

interface CategoryData {
  name: string;
  value: number;
}

interface CategoryChartProps {
  data: CategoryData[];
}

const PALETTE = [
  '#6366f1', // indigo
  '#f43f5e', // rose
  '#f97316', // orange
  '#eab308', // yellow
  '#10b981', // emerald
  '#06b6d4', // cyan
  '#8b5cf6', // violet
  '#ec4899', // pink
];

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: { percent: number } }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  const entry = payload[0];
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
      <p className="text-xs font-semibold text-slate-700">{entry.name}</p>
      <p className="text-sm font-bold text-slate-900">{formatCurrency(entry.value)}</p>
      <p className="text-xs text-slate-400">
        {(entry.payload.percent * 100).toFixed(1)}% of expenses
      </p>
    </div>
  );
}

interface LegendPayload {
  value: string;
  color: string;
}

interface CustomLegendProps {
  payload?: LegendPayload[];
  data: CategoryData[];
}

function CustomLegend({ payload, data }: CustomLegendProps) {
  if (!payload) return null;
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <ul className="mt-3 space-y-1.5">
      {payload.map((entry, index) => {
        const item = data.find((d) => d.name === entry.value);
        const pct = total > 0 && item ? ((item.value / total) * 100).toFixed(0) : '0';
        return (
          <li key={index} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-slate-600 truncate max-w-[100px]">{entry.value}</span>
            </div>
            <span className="ml-2 font-medium text-slate-500">{pct}%</span>
          </li>
        );
      })}
    </ul>
  );
}

export default function CategoryChart({ data }: CategoryChartProps) {
  const hasData = data.length > 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-800">
          Expense Breakdown
        </h3>
        <p className="text-xs text-slate-400">By category this month</p>
      </div>

      {!hasData ? (
        <div className="flex h-64 flex-col items-center justify-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
            <PieChartIcon className="h-5 w-5 text-slate-400" />
          </div>
          <p className="text-sm text-slate-500">No expense data</p>
          <p className="text-xs text-slate-400">
            Add some expenses to see the breakdown.
          </p>
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="45%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PALETTE[index % PALETTE.length]}
                    stroke="transparent"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                content={(props) => (
                  <CustomLegend
                    payload={props.payload as LegendPayload[]}
                    data={data}
                  />
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
