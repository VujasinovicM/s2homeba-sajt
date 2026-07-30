export type ApartmentStatus = 'slobodno' | 'rezervirano' | 'prodano';
export type ProjectStatus = 'u-toku' | 'završen';

export interface RoomDetail {
  name: string;
  area: number;
}

export interface Apartment {
  slug: string;
  code: string;
  rooms: string;
  type: string;
  status: ApartmentStatus;
  totalNP: number;
  totalNKP: number;
  floorPlanImage: string;
  /** Pozicija stana u zgradi (tlocrt etaže sa osenčenim stanom); prazno ako ne postoji */
  positionImage: string;
  pdfFile: string;
  roomDetails: RoomDetail[];
}

export interface FloorplanShape {
  apartmentSlug: string;
  /** SVG poligon u procentima slike tlocrta: "x1,y1 x2,y2 ..." */
  points: string;
  labelX: number;
  labelY: number;
}

export interface Floor {
  slug: string;
  name: string;
  order: number;
  floorPlanImage: string;
  apartments: Apartment[];
}

export interface Project {
  slug: string;
  name: string;
  year: number;
  status: ProjectStatus;
  shortDescription: string;
  heroImage: string;
  galleryImages: string[];
  technicalDescription: string;
  saleInfo: string;
  floors: Floor[];
}

/** Jedan mjesec toka gradnje — jedan folder u public/images/timeline/ */
export interface TimelineMonth {
  /** Ime foldera, npr. "jun_2026" */
  folder: string;
  /** Anchor id za tajmlajn navigaciju, npr. "jun-2026" */
  id: string;
  /** Prikazna oznaka izvedena iz imena foldera, npr. "Jun 2026" */
  label: string;
  /** Naslov iz data/timeline.csv; pada na `label` ako nije zadan */
  title: string;
  /** Opis iz data/timeline.csv; prazno ako nije zadan */
  description: string;
  /** Putanje slika, sortirane numerički (1, 2, 10 — ne 1, 10, 2) */
  images: string[];
}

export interface Office {
  name: string;
  address: string;
  email: string;
  phone: string;
  workingHours: string;
  mapEmbedUrl: string;
}

export interface SiteInfo {
  companyName: string;
  companyFullName: string;
  address: string;
  jib: string;
  mbs: string;
  phone: string;
  email: string;
  offices: Office[];
}
