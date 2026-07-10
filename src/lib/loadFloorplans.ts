import fs from 'fs';
import path from 'path';
import { parseCSV } from './csvParser';
import type { FloorplanShape } from '@/data/types';

// Modul-level cache — čita se jednom pri buildu (u dev režimu uvijek svježe)
let _cache: Map<string, FloorplanShape[]> | null = null;

function loadShapes(): Map<string, FloorplanShape[]> {
  if (_cache && process.env.NODE_ENV === 'production') return _cache;

  _cache = new Map();
  const filePath = path.join(process.cwd(), 'data', 'floorplan_shapes.csv');
  if (!fs.existsSync(filePath)) return _cache;

  const rows = parseCSV(fs.readFileSync(filePath, 'utf-8'));
  for (const row of rows) {
    const key = `${row.project_slug}/${row.floor_slug}`;
    const list = _cache.get(key) ?? [];
    list.push({
      apartmentSlug: row.apartment_slug,
      points: row.points,
      labelX: parseFloat(row.labelX),
      labelY: parseFloat(row.labelY),
    });
    _cache.set(key, list);
  }
  return _cache;
}

/** Poligoni stanova na tlocrtu etaže (prazan niz ako etaža nema interaktivni tlocrt). */
export function getFloorShapes(projectSlug: string, floorSlug: string): FloorplanShape[] {
  return loadShapes().get(`${projectSlug}/${floorSlug}`) ?? [];
}

export interface BuildingFloorBand {
  floorSlug: string;
  /** SVG poligon u procentima slike fasade: "x1,y1 x2,y2 ..." */
  points: string;
  labelX: number;
  labelY: number;
}

let _buildingCache: Map<string, BuildingFloorBand[]> | null = null;

function loadBuildingBands(): Map<string, BuildingFloorBand[]> {
  if (_buildingCache && process.env.NODE_ENV === 'production') return _buildingCache;

  _buildingCache = new Map();
  const filePath = path.join(process.cwd(), 'data', 'building_floors.csv');
  if (!fs.existsSync(filePath)) return _buildingCache;

  const rows = parseCSV(fs.readFileSync(filePath, 'utf-8'));
  for (const row of rows) {
    const list = _buildingCache.get(row.project_slug) ?? [];
    list.push({
      floorSlug: row.floor_slug,
      points: row.points,
      labelX: parseFloat(row.labelX),
      labelY: parseFloat(row.labelY),
    });
    _buildingCache.set(row.project_slug, list);
  }
  return _buildingCache;
}

/** Trake spratova na renderu fasade (prazan niz ako projekat nema interaktivnu fasadu). */
export function getBuildingFloors(projectSlug: string): BuildingFloorBand[] {
  return loadBuildingBands().get(projectSlug) ?? [];
}
