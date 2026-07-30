'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';

interface LightboxProps {
  images: string[];
  /** Slika koja se prikazuje pri otvaranju */
  startIndex?: number;
  /** Tekst iznad brojača, npr. "Jun 2026" */
  caption?: string;
  /** Osnova za alt atribut — dobija " – fotografija N" */
  altBase?: string;
  onClose: () => void;
}

export default function Lightbox({
  images,
  startIndex = 0,
  caption,
  altBase = 'Fotografija',
  onClose,
}: LightboxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(startIndex);

  // Esc zatvara, blokiraj skrol pozadine dok je lightbox otvoren
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  // Swiper se učitava dinamički (client-only), isto kao u HeroSlider
  useEffect(() => {
    let instance: { destroy: (deleteInstance?: boolean, cleanStyles?: boolean) => void } | null = null;
    let cancelled = false;

    const initSwiper = async () => {
      const { Swiper } = await import('swiper');
      const { Navigation, Keyboard } = await import('swiper/modules');

      if (cancelled || !containerRef.current) return;

      instance = new Swiper(containerRef.current, {
        modules: [Navigation, Keyboard],
        initialSlide: startIndex,
        // rewind umjesto loop — vrti se u krug bez kloniranja slajdova u DOM-u
        rewind: true,
        keyboard: { enabled: true },
        navigation: {
          nextEl: '.lightbox-next',
          prevEl: '.lightbox-prev',
        },
        on: {
          slideChange: (swiper: { activeIndex: number }) => setIndex(swiper.activeIndex),
        },
      });
    };
    initSwiper();

    return () => {
      cancelled = true;
      instance?.destroy(true, false);
    };
  }, [startIndex]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/92 flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={caption ? `Fotografije – ${caption}` : 'Fotografije'}
    >
      {/* Gornja traka: opis, brojač, zatvaranje */}
      <div className="relative z-10 flex items-center justify-between gap-4 px-4 py-3 text-white">
        <div className="min-w-0">
          {caption && <p className="text-sm font-semibold truncate">{caption}</p>}
          <p className="text-xs text-white/60">
            {index + 1} / {images.length}
          </p>
        </div>
        <button
          onClick={onClose}
          aria-label="Zatvori"
          className="flex-shrink-0 p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Slajder */}
      <div ref={containerRef} className="swiper flex-1 min-h-0 w-full">
        <div className="swiper-wrapper">
          {images.map((img, i) => (
            <div
              key={img}
              className="swiper-slide flex items-center justify-center p-4 sm:p-8"
              // Klik na praznu površinu oko slike zatvara; klik na samu sliku ne
              onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={img}
                  alt={`${altBase} – fotografija ${i + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority={i === startIndex}
                />
              </div>
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              className="lightbox-prev absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/40 text-white hover:bg-black/70 transition-colors"
              aria-label="Prethodna fotografija"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="lightbox-next absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/40 text-white hover:bg-black/70 transition-colors"
              aria-label="Sljedeća fotografija"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
