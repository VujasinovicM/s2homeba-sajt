'use client';

const sections = [
  { id: 'stanovi', label: 'Prikaz stanova' },
  { id: 'galerija', label: 'Galerija' },
  { id: 'tehnicki-opis', label: 'Tehnički opis' },
  { id: 'prodaja', label: 'Prodaja' },
];

export default function ProjectStickyNav() {
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
        </nav>
      </div>
    </div>
  );
}
