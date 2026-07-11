import Link from 'next/link';
import { SiteInfo } from '@/data/types';

export default function Footer({ siteInfo }: { siteInfo: SiteInfo }) {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Footer CTA traka */}
      <div style={{ backgroundColor: '#36A8EF' }} className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/kontakt"
              className="flex flex-col items-center gap-2 text-white hover:opacity-80 transition-opacity"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-sm font-semibold text-center">Kontaktirajte nas</span>
            </Link>
            <Link
              href="/slobodni-stanovi"
              className="flex flex-col items-center gap-2 text-white hover:opacity-80 transition-opacity"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-sm font-semibold text-center">Odaberite stan</span>
            </Link>
            <a
              href={`mailto:${siteInfo.email}`}
              className="flex flex-col items-center gap-2 text-white hover:opacity-80 transition-opacity"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-semibold text-center">Pošaljite e-mail</span>
            </a>
            <a
              href={`tel:${siteInfo.phone.replace(/\s/g, '')}`}
              className="flex flex-col items-center gap-2 text-white hover:opacity-80 transition-opacity"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-sm font-semibold text-center">Nazovite nas</span>
            </a>
          </div>
        </div>
      </div>

      {/* Glavni footer */}
      <div className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Kompanija */}
            <div>
              <h3 className="text-white text-xl font-black mb-3">
                S2 <span style={{ color: '#36A8EF' }}>HOME</span>
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {siteInfo.companyFullName}
                <br />
                {siteInfo.address}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                JIB: {siteInfo.jib} | MBS: {siteInfo.mbs}
              </p>
            </div>

            {/* Navigacija */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                Stranice
              </h4>
              <ul className="space-y-1.5">
                {[
                  { href: '/projekti', label: 'Projekti' },
                  { href: '/slobodni-stanovi', label: 'Slobodni stanovi' },
                  { href: '/reference', label: 'Reference' },
                  { href: '/o-nama', label: 'O nama' },
                  { href: '/kontakt', label: 'Kontakt' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kontakt */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                Kontakt
              </h4>
              <div className="space-y-2">
                <a
                  href={`tel:${siteInfo.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {siteInfo.phone}
                </a>
                <a
                  href={`mailto:${siteInfo.email}`}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {siteInfo.email}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-800 text-center text-xs text-gray-600">
            © {new Date().getFullYear()} {siteInfo.companyFullName}. Sva prava zadržana.
          </div>
        </div>
      </div>
    </footer>
  );
}
