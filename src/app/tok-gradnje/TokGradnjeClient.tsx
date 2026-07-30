'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import type { TimelineMonth } from '@/data/types';

const Lightbox = dynamic(() => import('@/components/Lightbox'), { ssr: false });

/** "1 fotografija", "3 fotografije", "12 fotografija" */
function photoCount(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} fotografija`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${n} fotografije`;
  return `${n} fotografija`;
}

/** Visina fiksiranog headera (h-16) */
const HEADER_HEIGHT = 64;

export default function TokGradnjeClient({ months }: { months: TimelineMonth[] }) {
  const [activeId, setActiveId] = useState(months[0]?.id ?? '');
  const [lightbox, setLightbox] = useState<{ monthIndex: number; imageIndex: number } | null>(null);
  const chipBarRef = useRef<HTMLDivElement>(null);

  /** Header + (na mobilnom) horizontalna traka mjeseci ne smiju prekriti naslov sekcije */
  const getScrollOffset = useCallback(() => {
    const bar = chipBarRef.current;
    const barVisible = bar !== null && bar.offsetParent !== null;
    return HEADER_HEIGHT + (barVisible ? bar.offsetHeight : 0) + 12;
  }, []);

  const scrollToMonth = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - getScrollOffset();
      window.scrollTo({ top, behavior: 'smooth' });
    },
    [getScrollOffset]
  );

  // Scroll-spy — aktivan je posljednji mjesec čiji je naslov prošao gornju ivicu
  useEffect(() => {
    if (months.length === 0) return;

    const onScroll = () => {
      const offset = getScrollOffset();
      let current = months[0].id;
      for (const month of months) {
        const el = document.getElementById(month.id);
        if (el && el.getBoundingClientRect().top - offset <= 0) current = month.id;
      }
      setActiveId(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [months, getScrollOffset]);

  const activeMonth = lightbox ? months[lightbox.monthIndex] : null;

  return (
    <>
      {/* Mobilni tajmlajn — horizontalna traka */}
      <div
        ref={chipBarRef}
        className="lg:hidden sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm"
      >
        <div className="flex gap-2 overflow-x-auto px-4 py-3">
          {months.map((month) => (
            <button
              key={month.id}
              onClick={() => scrollToMonth(month.id)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                activeId === month.id
                  ? 'bg-[#36A8EF] border-[#36A8EF] text-white'
                  : 'bg-white border-gray-300 text-gray-600 hover:border-[#36A8EF] hover:text-[#36A8EF]'
              }`}
            >
              {month.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-10">
          {/* Tajmlajn sa strane (desktop) */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                Tok radova
              </h2>
              <nav className="relative pl-7">
                <span
                  className="absolute left-[7px] top-3 bottom-3 w-px bg-gray-300"
                  aria-hidden="true"
                />
                {months.map((month) => {
                  const isActive = activeId === month.id;
                  return (
                    <button
                      key={month.id}
                      onClick={() => scrollToMonth(month.id)}
                      aria-current={isActive ? 'true' : undefined}
                      className="relative block w-full text-left py-2.5 group"
                    >
                      <span
                        className={`absolute -left-7 top-1/2 -translate-y-1/2 w-[15px] h-[15px] rounded-full border-2 transition-colors ${
                          isActive
                            ? 'bg-[#36A8EF] border-[#36A8EF]'
                            : 'bg-white border-gray-300 group-hover:border-[#36A8EF]'
                        }`}
                        aria-hidden="true"
                      />
                      <span
                        className={`block text-sm font-semibold transition-colors ${
                          isActive ? 'text-[#36A8EF]' : 'text-gray-600 group-hover:text-gray-900'
                        }`}
                      >
                        {month.label}
                      </span>
                      <span className="block text-xs text-gray-400">
                        {photoCount(month.images.length)}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Sekcije po mjesecu */}
          <div className="flex-1 min-w-0">
            {months.map((month, monthIndex) => (
              <section key={month.id} id={month.id} className="scroll-mt-32 mb-14 last:mb-0">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h2 className="text-2xl font-bold text-gray-900">{month.title}</h2>
                  <span className="text-sm text-gray-500">{photoCount(month.images.length)}</span>
                </div>
                <div className="section-underline mt-1.5" />

                {month.description && (
                  <p className="text-gray-600 leading-relaxed max-w-2xl mb-6">
                    {month.description}
                  </p>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
                  {month.images.map((img, imageIndex) => (
                    <button
                      key={img}
                      onClick={() => setLightbox({ monthIndex, imageIndex })}
                      className="relative aspect-[4/3] rounded-lg overflow-hidden shadow group cursor-zoom-in"
                      aria-label={`Otvori fotografiju ${imageIndex + 1} – ${month.label}`}
                    >
                      <Image
                        src={img}
                        alt={`${month.label} – tok gradnje, fotografija ${imageIndex + 1}`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        loading={monthIndex === 0 ? 'eager' : 'lazy'}
                      />
                      <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      {activeMonth && lightbox && (
        <Lightbox
          key={activeMonth.id}
          images={activeMonth.images}
          startIndex={lightbox.imageIndex}
          caption={activeMonth.title}
          altBase={activeMonth.label}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}
