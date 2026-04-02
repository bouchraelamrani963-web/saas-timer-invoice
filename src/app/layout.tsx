import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CashFlow — Monthly Budget Tracker',
  description:
    'Track your monthly income, expenses, and savings with beautiful charts and a clean dashboard.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50">{children}</body>
    </html>
  );
}
