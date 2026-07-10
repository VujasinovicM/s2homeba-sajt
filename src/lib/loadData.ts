import fs from 'fs';
import path from 'path';
import { parseCSV } from './csvParser';
import type { Project, Floor, Apartment, ApartmentStatus, ProjectStatus } from '@/data/types';

function readCSV(filename: string): Record<string, string>[] {
  const filePath = path.join(process.cwd(), 'data', filename);
  const content = fs.readFileSync(filePath, 'utf-8');
  return parseCSV(content);
}

// Modul-level cache — čita se jednom pri buildu (u dev režimu uvijek svježe)
let _cache: Project[] | null = null;

export function loadProjects(): Project[] {
  if (_cache && process.env.NODE_ENV === 'production') return _cache;

  const projectRows = readCSV('projects.csv');
  const floorRows = readCSV('floors.csv');
  const apartmentRows = readCSV('apartments.csv');
  const roomRows = readCSV('rooms.csv');
  const galleryRows = readCSV('gallery.csv');

  // Projekti "u toku" prikazuju se prije završenih (unutar grupe redoslijed iz CSV-a)
  const statusOrder: Record<string, number> = { 'u-toku': 0, 'završen': 1 };

  _cache = projectRows.map((p): Project => {
    const floors: Floor[] = floorRows
      .filter((f) => f.project_slug === p.slug)
      .sort((a, b) => Number(a.order) - Number(b.order))
      .map((f): Floor => {
        const apartments: Apartment[] = apartmentRows
          .filter((a) => a.project_slug === p.slug && a.floor_slug === f.slug)
          .map((a): Apartment => ({
            slug: a.slug,
            code: a.code,
            rooms: a.rooms,
            type: a.type,
            status: a.status as ApartmentStatus,
            totalNP: parseFloat(a.totalNP),
            totalNKP: parseFloat(a.totalNKP),
            floorPlanImage: a.floorPlanImage,
            positionImage: a.positionImage ?? '',
            pdfFile: a.pdfFile,
            roomDetails: roomRows
              .filter((r) => r.apartment_slug === a.slug)
              .map((r) => ({ name: r.name, area: parseFloat(r.area) })),
          }));

        return {
          slug: f.slug,
          name: f.name,
          order: Number(f.order),
          floorPlanImage: f.floorPlanImage,
          apartments,
        };
      });

    return {
      slug: p.slug,
      name: p.name,
      year: Number(p.year),
      status: p.status as ProjectStatus,
      shortDescription: p.shortDescription,
      heroImage: p.heroImage,
      galleryImages: galleryRows
        .filter((g) => g.project_slug === p.slug)
        .map((g) => g.imagePath),
      technicalDescription: p.technicalDescription,
      saleInfo: p.saleInfo,
      floors,
    };
  });

  _cache.sort((a, b) => (statusOrder[a.status] ?? 9) - (statusOrder[b.status] ?? 9));

  return _cache;
}
