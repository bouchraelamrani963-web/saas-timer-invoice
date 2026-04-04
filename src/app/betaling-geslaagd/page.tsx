import Link from "next/link";

export default function BetalingGeslaagdPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <span className="text-4xl">✓</span>
          </div>
        </div>
        <h1 className="mb-3 text-3xl font-black text-gray-900">Betaling geslaagd!</h1>
        <p className="mb-8 text-lg text-gray-600">
          Welkom bij SalarisRadar Pro. Je abonnement is actief — je hebt nu toegang tot alle functies.
        </p>
        <div className="space-y-3">
          <Link
            href="/dashboard"
            className="block w-full rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white hover:bg-indigo-700 transition-colors"
          >
            Naar mijn dashboard →
          </Link>
          <Link
            href="/"
            className="block w-full rounded-xl bg-gray-100 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Terug naar home
          </Link>
        </div>
      </div>
    </div>
  );
}
