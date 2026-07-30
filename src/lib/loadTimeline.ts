import fs from 'fs';
import path from 'path';
import { parseCSV } from './csvParser';
import type { TimelineMonth } from '@/data/types';

const TIMELINE_DIR = path.join(process.cwd(), 'public', 'images', 'timeline');
const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;

/**
 * Redni broj mjeseca — koristi se SAMO za sortiranje.
 * Prikazni naziv se izvodi iz samog imena foldera (jun_2026 → "Jun 2026"),
 * pa su prihvaćeni i srpski/bosanski i hrvatski nazivi te skraćenice.
 */
const MONTH_INDEX: Record<string, number> = {
  januar: 1, jan: 1, sijecanj: 1,
  februar: 2, feb: 2, veljaca: 2,
  mart: 3, mar: 3, ozujak: 3,
  april: 4, apr: 4, travanj: 4,
  maj: 5, svibanj: 5,
  jun: 6, juni: 6, lipanj: 6,
  jul: 7, juli: 7, srpanj: 7,
  avgust: 8, august: 8, avg: 8, kolovoz: 8,
  septembar: 9, sep: 9, sept: 9, rujan: 9,
  oktobar: 10, okt: 10, listopad: 10,
  novembar: 11, nov: 11, studeni: 11,
  decembar: 12, dec: 12, prosinac: 12,
};

/** Nazivi za brojčane formate foldera (2026-06 → "Jun 2026"). */
const MONTH_NAMES = [
  'Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun',
  'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar',
];

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[čć]/g, 'c')
    .replace(/ž/g, 'z')
    .replace(/š/g, 's')
    .replace(/đ/g, 'd');
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

/**
 * Iz imena foldera izvodi prikaznu oznaku i ključ za sortiranje (godina * 100 + mjesec).
 * Prihvata: jun_2026, jun-2026, 06_2026, 2026-06. Nepoznat format se prikazuje
 * kako jest i sortira na kraj — slike se nikad ne skrivaju zbog imena foldera.
 */
function parseFolderName(folder: string): { label: string; sortKey: number } {
  const parts = folder.split(/[_\-.\s]+/).filter(Boolean);

  if (parts.length >= 2) {
    const [first, second] = parts;
    const isYear = (v: string) => /^\d{4}$/.test(v);
    const isMonthNumber = (v: string) => /^\d{1,2}$/.test(v) && +v >= 1 && +v <= 12;

    // {mjesec}_{godina} — npr. jun_2026
    const monthByName = MONTH_INDEX[normalize(first)];
    if (monthByName && isYear(second)) {
      return {
        label: `${capitalize(first)} ${second}`,
        sortKey: Number(second) * 100 + monthByName,
      };
    }

    // {godina}-{mm} — npr. 2026-06
    if (isYear(first) && isMonthNumber(second)) {
      return {
        label: `${MONTH_NAMES[Number(second) - 1]} ${first}`,
        sortKey: Number(first) * 100 + Number(second),
      };
    }

    // {mm}_{godina} — npr. 06_2026
    if (isMonthNumber(first) && isYear(second)) {
      return {
        label: `${MONTH_NAMES[Number(first) - 1]} ${second}`,
        sortKey: Number(second) * 100 + Number(first),
      };
    }
  }

  return { label: folder.replace(/[_\-.]+/g, ' '), sortKey: 0 };
}

/** Opcioni naslovi i opisi iz data/timeline.csv (fajl ne mora postojati). */
function loadMeta(): Map<string, { title: string; description: string }> {
  const meta = new Map<string, { title: string; description: string }>();
  const filePath = path.join(process.cwd(), 'data', 'timeline.csv');
  if (!fs.existsSync(filePath)) return meta;

  for (const row of parseCSV(fs.readFileSync(filePath, 'utf-8'))) {
    const folder = (row.folder ?? '').trim();
    if (!folder) continue;
    meta.set(folder, {
      title: (row.title ?? '').trim(),
      description: (row.description ?? '').trim(),
    });
  }
  return meta;
}

// Modul-level cache — čita se jednom pri buildu (u dev režimu uvijek svježe)
let _cache: TimelineMonth[] | null = null;

/**
 * Svi mjeseci toka gradnje, najnoviji prvi.
 * Novi mjesec se dodaje isključivo kreiranjem foldera u public/images/timeline/ —
 * nema izmjena u kodu.
 */
export function getTimelineMonths(): TimelineMonth[] {
  if (_cache && process.env.NODE_ENV === 'production') return _cache;
  if (!fs.existsSync(TIMELINE_DIR)) {
    _cache = [];
    return _cache;
  }

  const meta = loadMeta();

  const months = fs
    .readdirSync(TIMELINE_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const folder = entry.name;
      const { label, sortKey } = parseFolderName(folder);
      const custom = meta.get(folder);

      const images = fs
        .readdirSync(path.join(TIMELINE_DIR, folder))
        .filter((file) => IMAGE_EXT.test(file))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
        .map((file) => `/images/timeline/${folder}/${file}`);

      return {
        folder,
        id: normalize(folder).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        label,
        title: custom?.title || label,
        description: custom?.description ?? '',
        images,
        sortKey,
      };
    })
    // Prazan folder (bez slika) ne pravi praznu sekciju na stranici
    .filter((month) => month.images.length > 0)
    .sort((a, b) => b.sortKey - a.sortKey || a.folder.localeCompare(b.folder));

  // sortKey je interni pomoćni podatak — ne izlazi iz modula
  _cache = months.map((month) => ({
    folder: month.folder,
    id: month.id,
    label: month.label,
    title: month.title,
    description: month.description,
    images: month.images,
  }));
  return _cache;
}

/**
 * Hero slika za stranicu Tok gradnje: hero-tok-gradnje.jpg ako postoji,
 * inače prva fotografija najnovijeg mjeseca.
 */
export function getTimelineHeroImage(): string | undefined {
  const custom = '/images/hero/hero-tok-gradnje.jpg';
  if (fs.existsSync(path.join(process.cwd(), 'public', custom))) return custom;
  return getTimelineMonths()[0]?.images[0];
}
