import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { artikelen, getArtikel } from "@/lib/blog-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return artikelen.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artikel = getArtikel(slug);
  if (!artikel) return {};
  return {
    title: artikel.titel,
    description: artikel.beschrijving,
    openGraph: {
      title: artikel.titel,
      description: artikel.beschrijving,
      type: "article",
      publishedTime: artikel.datum,
      authors: ["SalarisRadar.nl"],
    },
  };
}

export default async function BlogArtikelPage({ params }: Props) {
  const { slug } = await params;
  const artikel = getArtikel(slug);
  if (!artikel) notFound();

  const andereArtikelen = artikelen.filter((a) => a.slug !== slug).slice(0, 3);

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: artikel.titel,
    description: artikel.beschrijving,
    datePublished: artikel.datum,
    author: { "@type": "Organization", name: "SalarisRadar.nl" },
    publisher: { "@type": "Organization", name: "SalarisRadar.nl" },
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }}
      />

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
            <Link href="/blog" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Blog</Link>
            <Link href="/onderhandelen" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Onderhandelen</Link>
            <Link href="/prijzen" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Prijzen</Link>
          </nav>
          <Link href="/checken" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors">
            Gratis checken
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-indigo-600">Blog</Link>
          <span>/</span>
          <span className="text-gray-600">{artikel.categorie}</span>
        </nav>

        {/* Article header */}
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
              {artikel.categorie}
            </span>
            <span className="text-xs text-gray-400">{artikel.leestijd} leestijd</span>
            <span className="text-xs text-gray-400">
              {new Date(artikel.datum).toLocaleDateString("nl-NL", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <h1 className="mb-4 text-4xl font-black leading-tight text-gray-900">
            {artikel.titel}
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">{artikel.beschrijving}</p>
        </div>

        {/* Article content */}
        <div
          className="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-gray-900 prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900 prose-ul:space-y-2 prose-ol:space-y-2"
          dangerouslySetInnerHTML={{ __html: artikel.inhoud }}
        />

        {/* CTA box */}
        <div className="mt-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 text-white">
          <h2 className="mb-3 text-2xl font-black">Weet jij wat je waard bent?</h2>
          <p className="mb-6 text-indigo-200">
            Vergelijk jouw salaris gratis en anoniem met duizenden Nederlandse professionals in jouw sector.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/checken"
              className="rounded-xl bg-orange-500 px-6 py-3 text-center font-bold text-white hover:bg-orange-400 transition-colors"
            >
              Salaris gratis checken →
            </Link>
            <Link
              href="/onderhandelen"
              className="rounded-xl bg-white/10 px-6 py-3 text-center font-semibold text-white hover:bg-white/20 transition-colors"
            >
              Onderhandelcoach gebruiken
            </Link>
          </div>
        </div>

        {/* More articles */}
        {andereArtikelen.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-black text-gray-900">Meer artikelen</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {andereArtikelen.map((a) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="group rounded-xl border border-gray-100 p-4 hover:border-indigo-200 hover:shadow-sm transition-all"
                >
                  <span className="mb-2 block text-xs font-semibold text-indigo-600">{a.categorie}</span>
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">
                    {a.titel}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-gray-100 bg-white py-8 mt-16">
        <div className="mx-auto max-w-5xl px-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} SalarisRadar.nl —{" "}
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          {" · "}
          <Link href="/blog" className="hover:text-indigo-600">Blog</Link>
          {" · "}
          <Link href="/checken" className="hover:text-indigo-600">Salaris checken</Link>
        </div>
      </footer>
    </div>
  );
}
