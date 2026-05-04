import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { siteInfo } from '@/data/site';

export const metadata: Metadata = {
  metadataBase: new URL('https://s2home.ba'),
  title: {
    default: 'S2 HOME – Investitor u izgradnju nekretnina | Banja Luka',
    template: '%s | S2 HOME',
  },
  description:
    'S2 HOME d.o.o. — investitor i graditelj stambenih i poslovnih nekretnina u Banjoj Luci, BiH. Pogledajte naše projekte i slobodne stanove.',
  keywords: [
    'nekretnine Banja Luka',
    'stanovi Banja Luka',
    'S2 HOME',
    'S2 HOME d.o.o.',
    'kupovina stana Banja Luka',
    'novi stanovi Banja Luka',
  ],
  openGraph: {
    type: 'website',
    locale: 'bs_BA',
    siteName: 'S2 HOME d.o.o.',
    title: 'S2 HOME – Nekretnine Banja Luka',
    description:
      'S2 HOME d.o.o. — investitor i graditelj stambenih i poslovnih nekretnina u Banjoj Luci.',
    url: 'https://s2home.ba',
  },
  alternates: { canonical: 'https://s2home.ba' },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'LocalBusiness'],
        '@id': 'https://s2home.ba/#organization',
        name: '"S2 HOME" d.o.o.',
        alternateName: 'S2 HOME',
        url: 'https://s2home.ba',
        logo: { '@type': 'ImageObject', url: 'https://s2home.ba/logo.png' },
        email: siteInfo.email,
        telephone: siteInfo.offices[0].phone,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Ulica Akademika Jovana Surutke broj 9',
          addressLocality: 'Banja Luka',
          postalCode: '78000',
          addressCountry: 'BA',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 44.775583,
          longitude: 17.204778,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:00',
            closes: '16:00',
          },
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          telephone: siteInfo.offices[0].phone,
          email: siteInfo.email,
        },
        sameAs: [
          'https://www.instagram.com/INSTAGRAM_HANDLE_OVDJE',
        ],
      },
    ],
  };

  return (
    <html lang="sr-Latn" className="h-full">
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header siteInfo={siteInfo} />
        <main className="flex-1 pt-16">{children}</main>
        <Footer siteInfo={siteInfo} />
      </body>
    </html>
  );
}
