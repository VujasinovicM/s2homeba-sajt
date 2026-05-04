import { loadProjects } from '@/lib/loadData';
import type { Project, Floor, Apartment } from './types';

// =====================================================================
// Podaci se čitaju iz CSV fajlova u /data/ folderu:
//   data/projects.csv     – projekti
//   data/floors.csv       – etaže
//   data/apartments.csv   – stanovi (ovdje mijenjate status, dodajete stanove)
//   data/rooms.csv        – prostorije po stanu
//   data/gallery.csv      – galerija fotografija po projektu
// =====================================================================

export const projects: Project[] = loadProjects();

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFloorBySlug(project: Project, floorSlug: string): Floor | undefined {
  return project.floors.find((f) => f.slug === floorSlug);
}

export function getApartmentBySlug(floor: Floor, apartmentSlug: string): Apartment | undefined {
  return floor.apartments.find((a) => a.slug === apartmentSlug);
}

export function getFreeApartmentsCount(floor: Floor): number {
  return floor.apartments.filter((a) => a.status === 'slobodno').length;
}

export function getAllFreeApartments(): Array<{
  project: Project;
  floor: Floor;
  apartment: Apartment;
}> {
  const result = [];
  for (const project of projects) {
    for (const floor of project.floors) {
      for (const apartment of floor.apartments) {
        if (apartment.status === 'slobodno') {
          result.push({ project, floor, apartment });
        }
      }
    }
  }
  return result;
}
