'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export interface BuildingBand {
  slug: string;
  name: string;
  href: string;
  /** SVG poligon u procentima slike fasade: "x1,y1 x2,y2 ..." */
  points: string;
  labelX: number;
  labelY: number;
  freeCount: number;
}

const BRAND = '#36A8EF';

export default function InteractiveBuildingView({
  imageSrc,
  alt,
  bands,
}: {
  imageSrc: string;
  alt: string;
  bands: BuildingBand[];
}) {
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div>
      <div className="relative w-full select-none">
      <Image
        src={imageSrc}
        alt={alt}
        width={1200}
        height={850}
        className="w-full h-auto rounded-lg"
      />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {bands.map((b) => (
          <polygon
            key={b.slug}
            points={b.points}
            fill={BRAND}
            fillOpacity={hovered === b.slug ? 0.4 : 0}
            stroke="#ffffff"
            strokeOpacity={hovered === b.slug ? 0.9 : 0.3}
            strokeWidth={hovered === b.slug ? 2 : 1}
            vectorEffect="non-scaling-stroke"
            className="cursor-pointer transition-[fill-opacity,stroke-opacity] duration-150"
            onMouseEnter={() => setHovered(b.slug)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => router.push(b.href)}
          >
            <title>{`${b.name} · ${b.freeCount} slobodnih`}</title>
          </polygon>
        ))}
      </svg>

      {/* Oznaka sprata na hover */}
      {bands.map(
        (b) =>
          hovered === b.slug && (
            <span
              key={b.slug}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none bg-white/95 rounded-lg shadow px-3 py-1.5 text-sm font-semibold text-gray-900 whitespace-nowrap"
              style={{ left: `${b.labelX}%`, top: `${b.labelY}%` }}
            >
              {b.name}
              <span className="font-normal text-gray-500"> · {b.freeCount} slobodnih</span>
            </span>
          )
      )}

      </div>

      {/* Van relativnog kontejnera — ne smije uticati na visinu SVG overlay-a */}
      <p className="mt-2 text-sm text-gray-600">
        Pređite mišem preko zgrade i kliknite na sprat za pregled stanova.
      </p>
    </div>
  );
}
