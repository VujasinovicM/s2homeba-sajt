import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HeroHeader from '@/components/HeroHeader';
import { projects } from '@/data/projects';

export const metadata: Metadata = { title: 'Projekti' };

export default function ProjektiPage() {
  return (
    <>
      <HeroHeader
        title="Naši projekti"
        subtitle="Upoznajte se s našim stambenim i poslovnim projektima"
        imageSrc="/images/hero/hero-projekti.jpg"
        minHeight="320px"
      />

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {projects.map((project) => (
              <article
                key={project.slug}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Slika */}
                  <div className="relative w-full md:w-80 flex-shrink-0 h-56 md:h-auto">
                    <Image
                      src={project.heroImage}
                      alt={project.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 320px"
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          project.status === 'u-toku'
                            ? 'bg-[#36A8EF] text-white'
                            : 'bg-gray-700 text-white'
                        }`}
                      >
                        {project.status === 'u-toku' ? 'U toku' : 'Završen'}
                      </span>
                    </div>
                  </div>

                  {/* Sadržaj */}
                  <div className="flex flex-col justify-between p-6 flex-1">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-semibold text-[#36A8EF]">
                          {project.year}
                        </span>
                        <span className="text-gray-300">|</span>
                        <span className="text-sm text-gray-500">
                          {project.floors.length} eta{project.floors.length === 1 ? 'ža' : 'že/a'}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mb-3">
                        {project.name}
                      </h2>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {project.shortDescription}
                      </p>
                    </div>
                    <div className="mt-5">
                      <Link
                        href={`/projekti/${project.slug}`}
                        className="btn-primary"
                      >
                        Saznajte više
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
