'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Apartment, Floor, Project } from '@/data/types';
import { siteInfo } from '@/data/site';
import StatusBadge from './StatusBadge';

interface ApartmentTableProps {
  apartments: Apartment[];
  project: Project;
  floor: Floor;
  showFilters?: boolean;
}

export default function ApartmentTable({
  apartments,
  project,
  floor,
  showFilters = true,
}: ApartmentTableProps) {
  const [filterRooms, setFilterRooms] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const uniqueRooms = [...new Set(apartments.map((a) => a.rooms))];

  const filtered = apartments.filter((a) => {
    if (filterRooms && a.rooms !== filterRooms) return false;
    if (filterStatus && a.status !== filterStatus) return false;
    return true;
  });

  return (
    <div>
      {showFilters && (
        <div className="flex flex-wrap gap-3 mb-4">
          <select
            value={filterRooms}
            onChange={(e) => setFilterRooms(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#36A8EF]"
          >
            <option value="">Odaberite sobnost</option>
            {uniqueRooms.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#36A8EF]"
          >
            <option value="">Odaberite status</option>
            <option value="slobodno">Slobodno</option>
            <option value="rezervirano">Rezervirano</option>
            <option value="prodano">Prodano</option>
          </select>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="data-table">
          <thead>
            <tr>
              <th>STAN</th>
              <th>SOBNOST</th>
              <th>TIP NEKRETNINE</th>
              <th>STATUS</th>
              <th>OBR. POVRŠINA M²</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-gray-500 py-6">
                  Nema stanova koji odgovaraju filteru.
                </td>
              </tr>
            ) : (
              filtered.map((apt) => (
                <tr key={apt.slug}>
                  <td className="font-semibold text-gray-900">{apt.code}</td>
                  <td>{apt.rooms}</td>
                  <td>{apt.type}</td>
                  <td>
                    <StatusBadge status={apt.status} />
                  </td>
                  <td className="text-right font-medium">{apt.totalNKP.toFixed(2)}</td>
                  <td>
                    <Link
                      href={`/projekti/${project.slug}/${floor.slug}/${apt.slug}`}
                      className="btn-primary text-xs py-1.5 px-3 whitespace-nowrap"
                    >
                      Detalji
                    </Link>
                  </td>
                  <td>
                    {apt.status === 'slobodno' && (
                      <a
                        href={`mailto:${siteInfo.email}?subject=${encodeURIComponent(
                          `Upit za stan ${apt.code} – ${project.name}`
                        )}&body=${encodeURIComponent(
                          `Poštovani,\n\nzainteresovan/a sam za stan ${apt.code} – ${project.name}. Molim vas za više informacija.\n\n`
                        )}`}
                        className="btn-outline text-xs py-1.5 px-3 whitespace-nowrap"
                      >
                        Upit
                      </a>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
