'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { SiteInfo } from '@/data/types';

const navLinks = [
  { href: '/projekti', label: 'PROJEKTI' },
  { href: '/slobodni-stanovi', label: 'SLOBODNI STANOVI' },
  { href: '/tok-gradnje', label: 'TOK GRADNJE' },
  { href: '/reference', label: 'REFERENCE' },
  { href: '/o-nama', label: 'O NAMA' },
  { href: '/kontakt', label: 'KONTAKT' },
];

export default function Header({ siteInfo }: { siteInfo: SiteInfo }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/logo.png"
              alt="S2 Home"
              width={56}
              height={56}
              className={`transition-all duration-300 ${scrolled ? 'brightness-100' : 'brightness-0 invert'}`}
              priority
            />
          </Link>

          {/* Desktop navigacija */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold tracking-wide transition-colors duration-300 pb-0.5 border-b-2 ${
                  isActive(link.href)
                    ? scrolled
                      ? 'text-gray-900 border-[#36A8EF]'
                      : 'text-white border-white'
                    : scrolled
                    ? 'text-gray-600 hover:text-gray-900 border-transparent'
                    : 'text-white/80 hover:text-white border-transparent'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Hamburger za mobile */}
          <button
            className={`md:hidden p-2 transition-colors duration-300 ${
              scrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white'
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Otvori meni"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Tanka linija ispod — vidljiva samo kad je transparentan */}
        <div
          className={`h-px transition-all duration-300 ${
            scrolled ? 'bg-transparent' : 'bg-white/30'
          }`}
        />
      </div>

      {/* Mobile meni */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="flex flex-col px-4 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`py-3 text-sm font-semibold tracking-wide border-b border-gray-100 last:border-0 ${
                  isActive(link.href) ? 'text-[#36A8EF]' : 'text-gray-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
