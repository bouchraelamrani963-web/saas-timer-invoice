import type { Metadata } from "next";
import Link from "next/link";
import { artikelen } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Blog — Salaris & Carrière tips voor Nederland",
  description:
    "Praktische artikelen over salarissen, onderhandelen en de arbeidsmarkt in Nederland. Geschreven door experts voor Nederlandse professionals.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="rounded-lg bg-indigo-600 px-2 py-1 text-sm font-black text-white">SR</span>
            <span className="text-lg font-bold text-gray-900">
              SalarisRadar<span className="text-indigo-600">.nl</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/checken" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Salaris checken</Link>
            <Link href="/blog" className="text-sm font-semibold text-indigo-600">Blog</Link>
            <Link href="/onderhandelen" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Onderhandelen</Link>
            <Link href="/prijzen" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Prijzen</Link>
          </nav>
          <Link href="/checken" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors">
            Gratis checken
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-16">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-black text-gray-900">
            Salaris & Carrière Blog
          </h1>
          <p className="text-xl text-gray-500">
            Praktische tips en marktinzichten voor Nederlandse professionals
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {artikelen.map((artikel) => (
            <Link
              key={artikel.slug}
              href={`/blog/${artikel.slug}`}
              className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                  {artikel.categorie}
                </span>
                <span className="text-xs text-gray-400">{artikel.leestijd}</span>
              </div>
              <h2 className="mb-3 text-lg font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">
                {artikel.titel}
              </h2>
              <p className="mb-4 flex-1 text-sm text-gray-500 leading-relaxed">
                {artikel.beschrijving}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  {new Date(artikel.datum).toLocaleDateString("nl-NL", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span className="text-sm font-semibold text-indigo-600 group-hover:text-indigo-800">
                  Lees meer →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-indigo-50 p-8 text-center">
          <h2 className="mb-3 text-2xl font-black text-gray-900">
            Wil je weten of jij genoeg verdient?
          </h2>
          <p className="mb-6 text-gray-600">
            Vergelijk jouw salaris gratis en anoniem met duizenden Nederlandse professionals.
          </p>
          <Link
            href="/checken"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 transition-colors"
          >
            Salaris gratis checken →
          </Link>
        </div>
      </main>

      <footer className="border-t border-gray-100 bg-white py-8 mt-16">
        <div className="mx-auto max-w-5xl px-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} SalarisRadar.nl —{" "}
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          {" · "}
          <Link href="/checken" className="hover:text-indigo-600">Salaris checken</Link>
          {" · "}
          <Link href="/prijzen" className="hover:text-indigo-600">Prijzen</Link>
        </div>
      </footer>
    </div>
  );
}
