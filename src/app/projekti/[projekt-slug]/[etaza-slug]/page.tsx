import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import HeroHeader from '@/components/HeroHeader';
import ApartmentTable from '@/components/ApartmentTable';
import { projects, getProjectBySlug, getFloorBySlug } from '@/data/projects';

export async function generateStaticParams() {
  const params = [];
  for (const project of projects) {
    for (const floor of project.floors) {
      params.push({ 'projekt-slug': project.slug, 'etaza-slug': floor.slug });
    }
  }
  return params;
}

export async function generateMetadata(
  props: PageProps<'/projekti/[projekt-slug]/[etaza-slug]'>
): Promise<Metadata> {
  const { 'projekt-slug': pSlug, 'etaza-slug': fSlug } = await props.params;
  const project = getProjectBySlug(pSlug);
  const floor = project ? getFloorBySlug(project, fSlug) : undefined;
  if (!project || !floor) return {};
  return {
    title: `${floor.name} – ${project.name}`,
    description: `Stanovi na etaži ${floor.name}, projekat ${project.name} — S2 HOME d.o.o. Banja Luka. Dostupnost i tlocrti stanova.`,
    alternates: { canonical: `https://s2home.ba/projekti/${pSlug}/${fSlug}` },
  };
}

const statusColors: Record<string, string> = {
  slobodno: '#16a34a',
  rezervirano: '#ca8a04',
  prodano: '#dc2626',
};

export default async function EtazaPage(
  props: PageProps<'/projekti/[projekt-slug]/[etaza-slug]'>
) {
  const { 'projekt-slug': pSlug, 'etaza-slug': fSlug } = await props.params;
  const project = getProjectBySlug(pSlug);
  if (!project) notFound();
  const floor = getFloorBySlug(project, fSlug);
  if (!floor) notFound();

  return (
    <>
      <HeroHeader
        title={floor.name}
        subtitle={project.name}
        imageSrc={project.heroImage}
        breadcrumb={[
          { label: 'Projekti', href: '/projekti' },
          { label: project.name, href: `/projekti/${project.slug}` },
          { label: floor.name },
        ]}
        minHeight="280px"
      />

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tlocrt etaže */}
          <h2 className="section-heading">Tlocrt etaže</h2>
          <div className="section-underline" />

          <div className="mb-4 bg-white rounded-xl shadow-sm p-4 inline-block max-w-full">
            <div className="relative w-full max-w-2xl mx-auto" style={{ minHeight: '200px' }}>
              <Image
                src={floor.floorPlanImage}
                alt={`Tlocrt – ${floor.name}`}
                width={800}
                height={500}
                className="w-full h-auto rounded"
              />
            </div>
          </div>

          {/* Legenda */}
          <div className="flex flex-wrap gap-4 mb-8 mt-4">
            {Object.entries(statusColors).map(([status, color]) => (
              <div key={status} className="flex items-center gap-2 text-sm">
                <span
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: color }}
                />
                <span className="text-gray-700 capitalize">
                  {status === 'slobodno' ? 'Slobodno' : status === 'rezervirano' ? 'Rezervirano' : 'Prodano'}
                </span>
              </div>
            ))}
          </div>

          {/* Tablica stanova */}
          <h2 className="section-heading">Popis stanova na etaži</h2>
          <div className="section-underline" />
          <ApartmentTable
            apartments={floor.apartments}
            project={project}
            floor={floor}
            showFilters={true}
          />
        </div>
      </section>
    </>
  );
}
