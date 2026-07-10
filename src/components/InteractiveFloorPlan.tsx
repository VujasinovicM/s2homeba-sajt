'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { ApartmentStatus } from '@/data/types';

export interface FloorPlanUnit {
  slug: string;
  code: string;
  status: ApartmentStatus;
  href: string;
  /** SVG poligon u procentima slike: "x1,y1 x2,y2 ..." */
  points: string;
  labelX: number;
  labelY: number;
  areaLabel: string;
}

const STATUS_COLOR: Record<ApartmentStatus, string> = {
  slobodno: '#16a34a',
  rezervirano: '#ca8a04',
  prodano: '#dc2626',
};

const STATUS_LABEL: Record<ApartmentStatus, string> = {
  slobodno: 'Slobodno',
  rezervirano: 'Rezervirano',
  prodano: 'Prodano',
};

export default function InteractiveFloorPlan({
  imageSrc,
  alt,
  units,
}: {
  imageSrc: string;
  alt: string;
  units: FloorPlanUnit[];
}) {
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative w-full select-none">
      <Image
        src={imageSrc}
        alt={alt}
        width={1200}
        height={460}
        className="w-full h-auto rounded"
      />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {units.map((u) => (
          <polygon
            key={u.slug}
            points={u.points}
            fill={STATUS_COLOR[u.status]}
            fillOpacity={hovered === u.slug ? 0.55 : 0.3}
            stroke={STATUS_COLOR[u.status]}
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
            className="cursor-pointer transition-[fill-opacity] duration-150"
            onMouseEnter={() => setHovered(u.slug)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => router.push(u.href)}
          >
            <title>{`${u.code} · ${u.areaLabel} m² · ${STATUS_LABEL[u.status]}`}</title>
          </polygon>
        ))}
      </svg>

      {/* Oznake stanova — HTML preko slike da se tekst ne deformiše */}
      {units.map((u) => (
        <span
          key={u.slug}
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none font-bold text-gray-900 text-[9px] sm:text-xs md:text-sm whitespace-nowrap"
          style={{
            left: `${u.labelX}%`,
            top: `${u.labelY}%`,
            textShadow: '0 0 3px #fff, 0 0 3px #fff, 0 0 5px #fff',
          }}
        >
          {u.code}
        </span>
      ))}

      {/* Tooltip statusa na hover */}
      {hovered && (
        <div className="absolute top-2 right-2 bg-white/95 rounded-lg shadow px-3 py-1.5 text-sm pointer-events-none">
          {(() => {
            const u = units.find((x) => x.slug === hovered);
            if (!u) return null;
            return (
              <span>
                <strong>{u.code}</strong> · {u.areaLabel} m² ·{' '}
                <span style={{ color: STATUS_COLOR[u.status] }} className="font-semibold">
                  {STATUS_LABEL[u.status]}
                </span>
              </span>
            );
          })()}
        </div>
      )}
    </div>
  );
}
