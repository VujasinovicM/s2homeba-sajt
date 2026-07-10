import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import HeroHeader from '@/components/HeroHeader';
import StatusBadge from '@/components/StatusBadge';
import { siteInfo } from '@/data/site';
import {
  projects,
  getProjectBySlug,
  getFloorBySlug,
  getApartmentBySlug,
} from '@/data/projects';

export async function generateStaticParams() {
  const params = [];
  for (const project of projects) {
    for (const floor of project.floors) {
      for (const apt of floor.apartments) {
        params.push({
          'projekt-slug': project.slug,
          'etaza-slug': floor.slug,
          'stan-slug': apt.slug,
        });
      }
    }
  }
  return params;
}

export async function generateMetadata(
  props: PageProps<'/projekti/[projekt-slug]/[etaza-slug]/[stan-slug]'>
): Promise<Metadata> {
  const { 'projekt-slug': pSlug, 'etaza-slug': fSlug, 'stan-slug': aSlug } = await props.params;
  const project = getProjectBySlug(pSlug);
  const floor = project ? getFloorBySlug(project, fSlug) : undefined;
  const apt = floor ? getApartmentBySlug(floor, aSlug) : undefined;
  if (!apt) return {};
  return { title: `Stan ${apt.code}` };
}

export default async function StanPage(
  props: PageProps<'/projekti/[projekt-slug]/[etaza-slug]/[stan-slug]'>
) {
  const { 'projekt-slug': pSlug, 'etaza-slug': fSlug, 'stan-slug': aSlug } = await props.params;
  const project = getProjectBySlug(pSlug);
  if (!project) notFound();
  const floor = getFloorBySlug(project, fSlug);
  if (!floor) notFound();
  const apt = getApartmentBySlug(floor, aSlug);
  if (!apt) notFound();

  return (
    <>
      <HeroHeader
        title={`Stan ${apt.code}`}
        subtitle={`${project.name} · ${floor.name}`}
        imageSrc={project.heroImage}
        breadcrumb={[
          { label: 'Projekti', href: '/projekti' },
          { label: project.name, href: `/projekti/${project.slug}` },
          { label: floor.name, href: `/projekti/${project.slug}/${floor.slug}` },
          { label: apt.code },
        ]}
        minHeight="260px"
      />

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Lijeva kolona – info */}
            <div>
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Stan {apt.code}</h2>
                  <StatusBadge status={apt.status} />
                </div>
                <dl className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <dt className="text-gray-500 w-36 flex-shrink-0">Sobnost:</dt>
                    <dd className="font-medium text-gray-900">{apt.rooms}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-gray-500 w-36 flex-shrink-0">Tip nekretnine:</dt>
                    <dd className="font-medium text-gray-900">{apt.type}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-gray-500 w-36 flex-shrink-0">Projekt:</dt>
                    <dd className="font-medium text-gray-900">{project.name}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-gray-500 w-36 flex-shrink-0">Etaža:</dt>
                    <dd className="font-medium text-gray-900">{floor.name}</dd>
                  </div>
                </dl>
              </div>

              {/* Netto površine */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Netto površine (m²)</h3>
                <ol className="space-y-2">
                  {apt.roomDetails.map((room, i) => (
                    <li key={i} className="flex items-center justify-between text-sm py-1.5 border-b border-gray-100 last:border-0">
                      <span className="flex items-center gap-2 text-gray-700">
                        <span className="w-5 h-5 flex-shrink-0 rounded-full bg-[#36A8EF] text-white text-xs flex items-center justify-center font-bold">
                          {i + 1}
                        </span>
                        {room.name}
                      </span>
                      <span className="font-semibold text-gray-900">{room.area.toFixed(2)} m²</span>
                    </li>
                  ))}
                </ol>

                <div className="mt-4 pt-4 border-t-2 border-gray-200 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Ukupno NP stana:</span>
                    <span className="font-bold text-gray-900">{apt.totalNP.toFixed(2)} m²</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Ukupno NKP stana:</span>
                    <span className="font-bold text-[#36A8EF] text-base">{apt.totalNKP.toFixed(2)} m²</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-6 flex flex-wrap gap-3">
                  {apt.pdfFile && (
                    <a
                      href={apt.pdfFile}
                      download
                      className="btn-primary flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Preuzmite PDF
                    </a>
                  )}
                  {apt.status === 'slobodno' && (
                    <a
                      href={`mailto:${siteInfo.email}?subject=${encodeURIComponent(
                        `Upit za stan ${apt.code} – ${project.name}`
                      )}&body=${encodeURIComponent(
                        `Poštovani,\n\nzainteresovan/a sam za stan ${apt.code} – ${project.name} (${floor.name}). Molim vas za više informacija.\n\n`
                      )}`}
                      className="btn-outline"
                    >
                      Pošaljite upit
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Desna kolona – tlocrt */}
            <div>
              <div className="bg-white rounded-xl shadow-sm p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4 px-2">
                  Arhitektonski tlocrt
                </h3>
                <div className="relative w-full" style={{ minHeight: '300px' }}>
                  <Image
                    src={apt.floorPlanImage}
                    alt={`Tlocrt stana ${apt.code}`}
                    width={700}
                    height={500}
                    className="w-full h-auto rounded"
                  />
                </div>
              </div>

              {apt.positionImage && (
                <div className="bg-white rounded-xl shadow-sm p-4 mt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 px-2">
                    Pozicija u zgradi
                  </h3>
                  <div className="relative w-full">
                    <Image
                      src={apt.positionImage}
                      alt={`Pozicija stana ${apt.code} u zgradi`}
                      width={1200}
                      height={460}
                      className="w-full h-auto rounded"
                    />
                  </div>
                </div>
              )}

              <div className="mt-4 text-center">
                <Link
                  href={`/projekti/${project.slug}/${floor.slug}`}
                  className="text-sm text-[#36A8EF] hover:underline"
                >
                  ← Nazad na {floor.name}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
