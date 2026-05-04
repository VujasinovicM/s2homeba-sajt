import type { Metadata } from 'next';
import Image from 'next/image';
import HeroHeader from '@/components/HeroHeader';
import { projects } from '@/data/projects';

export const metadata: Metadata = { title: 'Reference' };

export default function ReferencePage() {
  const finished = projects.filter((p) => p.status === 'završen');

  return (
    <>
      <HeroHeader
        title="Naši gotovi projekti"
        subtitle="Pregled uspješno realizovanih investicija"
        imageSrc="/images/hero/hero-reference.jpg"
        minHeight="300px"
      />

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {finished.length === 0 ? (
            <p className="text-gray-500">
              Završeni projekti biće prikazani ovdje.
            </p>
          ) : (
            <div className="space-y-10">
              {finished.map((project) => (
                <article
                  key={project.slug}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-80 h-56 md:h-auto flex-shrink-0">
                      <Image
                        src={project.heroImage}
                        alt={project.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 320px"
                      />
                    </div>
                    <div className="p-6 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-[#36A8EF]">
                          {project.year}
                        </span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                          Završen
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mb-3">
                        {project.name}
                      </h2>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {project.shortDescription}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
