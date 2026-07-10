import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import HeroHeader from '@/components/HeroHeader';
import ApartmentTable from '@/components/ApartmentTable';
import InteractiveFloorPlan, { type FloorPlanUnit } from '@/components/InteractiveFloorPlan';
import { projects, getProjectBySlug, getFloorBySlug } from '@/data/projects';
import { getFloorShapes } from '@/lib/loadFloorplans';

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

  // Interaktivni tlocrt — poligoni stanova (ako postoje za ovu etažu)
  const units: FloorPlanUnit[] = getFloorShapes(project.slug, floor.slug)
    .map((shape) => {
      const apartment = floor.apartments.find((a) => a.slug === shape.apartmentSlug);
      if (!apartment) return null;
      return {
        slug: apartment.slug,
        code: apartment.code,
        status: apartment.status,
        href: `/projekti/${project.slug}/${floor.slug}/${apartment.slug}`,
        points: shape.points,
        labelX: shape.labelX,
        labelY: shape.labelY,
        areaLabel: apartment.totalNKP.toFixed(2),
      };
    })
    .filter((u): u is FloorPlanUnit => u !== null);

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
            <div
              className={`relative w-full mx-auto ${units.length > 0 ? 'max-w-5xl' : 'max-w-2xl'}`}
              style={{ minHeight: '200px' }}
            >
              {units.length > 0 ? (
                <InteractiveFloorPlan
                  imageSrc={floor.floorPlanImage}
                  alt={`Tlocrt – ${floor.name}`}
                  units={units}
                />
              ) : (
                <Image
                  src={floor.floorPlanImage}
                  alt={`Tlocrt – ${floor.name}`}
                  width={800}
                  height={500}
                  className="w-full h-auto rounded"
                />
              )}
            </div>
          </div>
          {units.length > 0 && (
            <p className="text-sm text-gray-600 mb-2">
              Kliknite na stan na tlocrtu za detalje.
            </p>
          )}

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
