'use client';

import Link from 'next/link';

const sections = [
  { id: 'stanovi', label: 'Prikaz stanova' },
  { id: 'galerija', label: 'Galerija' },
  { id: 'tehnicki-opis', label: 'Tehnički opis' },
  { id: 'prodaja', label: 'Prodaja' },
];

export default function ProjectStickyNav({
  showTokGradnje = false,
}: {
  showTokGradnje?: boolean;
}) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 70;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex overflow-x-auto">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              className="px-5 py-3.5 text-sm font-semibold text-gray-600 hover:text-[#36A8EF] hover:bg-gray-50 whitespace-nowrap transition-colors border-b-2 border-transparent hover:border-[#36A8EF]"
            >
              {sec.label}
            </button>
          ))}

          {showTokGradnje && (
            <Link
              href="/tok-gradnje"
              className="flex items-center gap-1.5 px-5 py-3.5 text-sm font-semibold text-[#36A8EF] hover:bg-gray-50 whitespace-nowrap transition-colors border-b-2 border-transparent hover:border-[#36A8EF]"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Tok gradnje
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
