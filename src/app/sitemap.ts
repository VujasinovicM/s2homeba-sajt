import type { MetadataRoute } from 'next';
import { loadProjects } from '@/lib/loadData';

const BASE = 'https://s2home.ba';

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = loadProjects();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                       lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/projekti`,         lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/slobodni-stanovi`, lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/reference`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/o-nama`,           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/kontakt`,          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];

  const dynamic: MetadataRoute.Sitemap = [];
  for (const p of projects) {
    dynamic.push({
      url: `${BASE}/projekti/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
    for (const f of p.floors) {
      dynamic.push({
        url: `${BASE}/projekti/${p.slug}/${f.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  }

  return [...staticRoutes, ...dynamic];
}
