import Link from "next/link";

export default function Home() {
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-1">Timer & Facturen</h1>
      <p className="text-gray-500 mb-8">Bijhouden hoeveel tijd je werkt, en facturen aanmaken.</p>

      <div className="grid grid-cols-2 gap-4">
        <Link
          href="/timer"
          className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-blue-600 text-white p-6 shadow-sm hover:bg-blue-700 transition-colors"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-semibold text-lg">Timer</span>
        </Link>

        <Link
          href="/invoices"
          className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-white text-gray-800 p-6 shadow-sm border border-gray-200 hover:border-blue-300 transition-colors"
        >
          <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="font-semibold text-lg">Facturen</span>
        </Link>
      </div>
    </div>
  );
}
