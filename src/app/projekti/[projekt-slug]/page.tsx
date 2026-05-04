import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import HeroHeader from '@/components/HeroHeader';
import { projects, getProjectBySlug, getFreeApartmentsCount } from '@/data/projects';
import ProjectStickyNav from './ProjectStickyNav';

export async function generateStaticParams() {
  return projects.map((p) => ({ 'projekt-slug': p.slug }));
}

export async function generateMetadata(props: PageProps<'/projekti/[projekt-slug]'>): Promise<Metadata> {
  const { 'projekt-slug': slug } = await props.params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return { title: project.name };
}

export default async function ProjektPage(props: PageProps<'/projekti/[projekt-slug]'>) {
  const { 'projekt-slug': slug } = await props.params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <HeroHeader
        title={project.name}
        subtitle={`${project.year} · ${project.status === 'u-toku' ? 'U toku' : 'Završen'}`}
        imageSrc={project.heroImage}
        breadcrumb={[
          { label: 'Projekti', href: '/projekti' },
          { label: project.name },
        ]}
        minHeight="340px"
      />

      {/* Sticky navigacija */}
      <ProjectStickyNav />

      {/* 1. Prikaz stanova */}
      <section id="stanovi" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading">Prikaz stanova</h2>
          <div className="section-underline" />
          <div className="flex flex-wrap gap-4">
            {project.floors
              .sort((a, b) => a.order - b.order)
              .map((floor) => {
                const freeCount = getFreeApartmentsCount(floor);
                return (
                  <Link
                    key={floor.slug}
                    href={`/projekti/${project.slug}/${floor.slug}`}
                    className="flex items-center gap-2.5 bg-white border border-gray-200 rounded-lg px-5 py-3.5 shadow-sm hover:shadow-md hover:border-[#36A8EF] transition-all group"
                  >
                    <span className="font-semibold text-gray-900 group-hover:text-[#36A8EF] transition-colors">
                      {floor.name}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm text-gray-500">
                      <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                      ({freeCount} slobodnih)
                    </span>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      {/* 2. Galerija */}
      <section id="galerija" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading">Galerija</h2>
          <div className="section-underline" />
          {project.galleryImages.length === 0 ? (
            <p className="text-gray-400 text-sm">Galerija će biti dostupna uskoro.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {project.galleryImages.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-lg overflow-hidden shadow group">
                  <Image
                    src={img}
                    alt={`${project.name} – galerija ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. Tehnički opis */}
      <section id="tehnicki-opis" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading">Tehnički opis</h2>
          <div className="section-underline" />
          <div className="bg-white rounded-xl shadow-sm p-6 max-w-3xl">
            <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed font-sans">
              {project.technicalDescription}
            </pre>
          </div>
        </div>
      </section>

      {/* 4. Prodaja */}
      <section id="prodaja" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading">Prodaja</h2>
          <div className="section-underline" />
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 max-w-3xl">
            <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed font-sans">
              {project.saleInfo}
            </pre>
            <div className="mt-6 flex gap-3">
              <Link href="/kontakt" className="btn-primary">
                Kontaktirajte nas
              </Link>
              <a
                href={`mailto:info@s2home.ba?subject=Upit za projekt: ${project.name}`}
                className="btn-outline"
              >
                Pošaljite upit
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
