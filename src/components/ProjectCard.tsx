import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/data/types';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      {/* Slika */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={project.heroImage}
          alt={project.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              project.status === 'u-toku'
                ? 'bg-[#36A8EF] text-white'
                : 'bg-gray-700 text-white'
            }`}
          >
            {project.status === 'u-toku' ? 'U toku' : 'Završen'}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="text-xs font-semibold bg-black/60 text-white px-2.5 py-1 rounded-full">
            {project.year}
          </span>
        </div>
      </div>

      {/* Tekst */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug">
          {project.name}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">
          {project.shortDescription}
        </p>
        <Link href={`/projekti/${project.slug}`} className="btn-primary text-sm">
          Saznajte više
        </Link>
      </div>
    </div>
  );
}
