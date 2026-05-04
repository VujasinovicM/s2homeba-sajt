'use client';

import { useState } from 'react';
import { Project, Floor } from '@/data/types';
import ApartmentTable from '@/components/ApartmentTable';

type FloorWithCount = Omit<Floor, 'apartments'> & { freeCount: number; apartments: Floor['apartments'] };
type ProjectWithCounts = Omit<Project, 'floors'> & { floors: FloorWithCount[] };

export default function SlobodniStanoviClient({
  projects,
}: {
  projects: ProjectWithCounts[];
}) {
  if (projects.length === 0) {
    return <p className="text-gray-400">Trenutno nema aktivnih projekata.</p>;
  }

  return (
    <div className="space-y-8">
      {projects.map((project) => (
        <div key={project.slug} className="rounded-xl overflow-hidden shadow-md">
          <div className="bg-gray-900 text-white px-6 py-4">
            <h2 className="text-lg font-bold">{project.name}</h2>
          </div>
          <div className="bg-white divide-y divide-gray-100">
            {project.floors.map((floor) => (
              <FloorAccordion
                key={floor.slug}
                project={project}
                floor={floor}
                freeCount={floor.freeCount}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function FloorAccordion({
  project,
  floor,
  freeCount,
}: {
  project: Project;
  floor: Floor;
  freeCount: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <span className="font-semibold text-gray-900">{floor.name}</span>
          <span className="flex items-center gap-1.5 text-sm text-gray-500">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
            {freeCount} slobodnih stanova
          </span>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-6 pb-6 pt-2">
          <ApartmentTable
            apartments={floor.apartments}
            project={project}
            floor={floor}
            showFilters={false}
          />
        </div>
      )}
    </div>
  );
}
