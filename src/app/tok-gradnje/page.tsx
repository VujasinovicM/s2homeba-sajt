import type { Metadata } from 'next';
import HeroHeader from '@/components/HeroHeader';
import { getTimelineMonths, getTimelineHeroImage } from '@/lib/loadTimeline';
import TokGradnjeClient from './TokGradnjeClient';

export const metadata: Metadata = {
  title: 'Tok gradnje',
  description:
    'Fotografije napretka gradnje po mjesecima — prati kako naši objekti u Banjoj Luci rastu iz mjeseca u mjesec.',
  alternates: { canonical: 'https://s2home.ba/tok-gradnje' },
};

export default function TokGradnjePage() {
  const months = getTimelineMonths();

  return (
    <>
      <HeroHeader
        title="Tok gradnje"
        subtitle="Fotografije napretka na gradilištu."
        imageSrc={getTimelineHeroImage()}
        minHeight="300px"
      />

      {months.length === 0 ? (
        <section className="py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-gray-500">
              Fotografije toka gradnje biće objavljene uskoro.
            </p>
          </div>
        </section>
      ) : (
        <TokGradnjeClient months={months} />
      )}
    </>
  );
}
