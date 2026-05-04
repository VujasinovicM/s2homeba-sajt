import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { siteInfo } from '@/data/site';

export const metadata: Metadata = {
  title: {
    default: 'S2 HOME – Investitor u izgradnju nekretnina',
    template: '%s | S2 HOME',
  },
  description:
    'S2 HOME d.o.o. – investitor u izgradnju stambenih i poslovnih nekretnina u Banjoj Luci, BiH.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sr-Latn" className="h-full">
      <body className="min-h-full flex flex-col">
        <Header siteInfo={siteInfo} />
        <main className="flex-1 pt-16">{children}</main>
        <Footer siteInfo={siteInfo} />
      </body>
    </html>
  );
}
