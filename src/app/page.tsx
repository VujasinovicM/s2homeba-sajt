import Link from 'next/link';
import HeroSlider from '@/components/HeroSlider';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';

const heroSlides = [
  {
    image: '/images/hero/hero-1.jpg',
    title: 'Gradimo vaš dom budućnosti',
    subtitle: 'Stambeni i poslovni objekti najvišeg standarda u Banjoj Luci',
    href: '/projekti',
  },
  {
    image: '/images/hero/hero-2.jpg',
    title: 'Kvalitet koji traje generacijama',
    subtitle: 'Svaki projekat je posvećenost izvrsnosti u gradnji',
    href: '/o-nama',
  },
  {
    image: '/images/hero/hero-3.jpg',
    title: 'Pronađite savršen stan',
    subtitle: 'Pogledajte naše slobodne stanove i odaberite pravi za vas',
    href: '/slobodni-stanovi',
  },
];

const categories = [
  {
    title: 'Najam poslovnih prostora',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    href: '/kontakt',
  },
  {
    title: 'Poslovni objekti',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
    href: '/projekti',
  },
  {
    title: 'Prodaja stanova',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    href: '/slobodni-stanovi',
  },
  {
    title: 'Stambene zgrade',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11" />
      </svg>
    ),
    href: '/projekti',
  },
];

export default function Home() {
  const activeProjects = projects.filter((p) => p.status === 'u-toku');
  const finishedProjects = projects.filter((p) => p.status === 'završen');

  return (
    <>
      {/* Hero Slider — -mt-16 poništava pt-16 iz layouta da slider ide ispod transparentnog headera */}
      <div className="-mt-16">
        <HeroSlider slides={heroSlides} />
      </div>

      {/* Sekcija projekata */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading">Naši projekti</h2>
          <div className="section-underline" />

          {/* Tab filter – client komponenta */}
          <ProjectsTabFilter
            activeProjects={activeProjects}
            finishedProjects={finishedProjects}
          />
        </div>
      </section>

      {/* O nama blok */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-heading">Ko smo mi?</h2>
              <div className="section-underline" />
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>"S2 HOME" d.o.o.</strong> je kompanija sa sjedištem u Banjoj Luci koja se
                bavi investicijama i izgradnjom stambenih i poslovnih nekretnina. Naša misija je
                pružiti kupcima visok standard stanovanja uz korištenje materijala i opreme prve klase.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Svaki naš projekat je osmišljen s pažnjom prema detaljima, energetskoj efikasnosti
                i dugoročnoj vrijednosti nekretnine.
              </p>
              <Link href="/o-nama" className="btn-primary">
                Saznajte više o nama
              </Link>
            </div>
            <div className="relative h-72 md:h-96 rounded-lg overflow-hidden shadow-lg">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: 'url(/images/o-nama/hero.jpg)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Tipovi nekretnina */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading text-center">Šta nudimo</h2>
          <div className="section-underline mx-auto" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="bg-white rounded-lg p-6 text-center shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group"
              >
                <div className="flex justify-center mb-3 text-[#36A8EF] group-hover:text-[#1a8fd4] transition-colors">
                  {cat.icon}
                </div>
                <h3 className="text-sm font-semibold text-gray-800 leading-tight">
                  {cat.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// Inline client komponenta za tab filter
import ProjectsTabFilter from './ProjectsTabFilter';
