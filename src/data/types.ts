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
