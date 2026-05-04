'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Slide {
  image: string;
  title: string;
  subtitle?: string;
  href?: string;
}

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initSwiper = async () => {
      const { Swiper } = await import('swiper');
      const { Autoplay, Pagination, Navigation } = await import('swiper/modules');

      if (swiperRef.current) {
        new Swiper(swiperRef.current, {
          modules: [Autoplay, Pagination, Navigation],
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });
      }
    };
    initSwiper();
  }, []);

  return (
    <div
      ref={swiperRef}
      className="swiper relative"
      style={{ height: '90vh', minHeight: '500px', maxHeight: '800px' }}
    >
      <div className="swiper-wrapper">
        {slides.map((slide, i) => (
          <div key={i} className="swiper-slide relative overflow-hidden">
            {/* Pozadinska slika */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/70" />
            {/* Tekst */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 px-4 text-center">
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3 max-w-3xl"
                style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
              >
                {slide.title}
              </h2>
              {slide.subtitle && (
                <p className="text-xl text-white/80 mb-6 max-w-xl">
                  {slide.subtitle}
                </p>
              )}
              {slide.href && (
                <Link href={slide.href} className="btn-primary text-base px-6 py-3">
                  Saznajte više
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="swiper-pagination" />
      <div className="swiper-button-prev" />
      <div className="swiper-button-next" />
    </div>
  );
}
