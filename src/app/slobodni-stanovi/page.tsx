import type { Metadata } from 'next';
import HeroHeader from '@/components/HeroHeader';
import { projects, getFreeApartmentsCount } from '@/data/projects';
import SlobodniStanoviClient from './SlobodniStanoviClient';

export const metadata: Metadata = {
  title: 'Slobodni stanovi',
  description:
    'Slobodni stanovi na prodaju u Banjoj Luci — S2 HOME d.o.o. Provjerite dostupnost i cijene stanova u našim aktivnim projektima.',
  alternates: { canonical: 'https://s2home.ba/slobodni-stanovi' },
};

export default function SlobodniStanoviPage() {
  const activeProjects = projects
    .filter((p) => p.status === 'u-toku')
    .map((project) => ({
      ...project,
      floors: project.floors
        .sort((a, b) => a.order - b.order)
        .map((floor) => ({
          ...floor,
          freeCount: getFreeApartmentsCount(floor),
        })),
    }));

  return (
    <>
      <HeroHeader
        title="Slobodni stanovi"
        subtitle="Provjerite našu ponudu slobodnih stanova"
        imageSrc="/images/hero/hero-slobodni.jpg"
        minHeight="300px"
      />
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-gray-600 leading-relaxed">
              Provjerite našu ponudu slobodnih stanova. 
            </p>
          </div>
          <SlobodniStanoviClient projects={activeProjects} />
        </div>
      </section>
    </>
  );
}
