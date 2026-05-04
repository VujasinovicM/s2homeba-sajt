'use client';

import { useState } from 'react';
import { Project } from '@/data/types';
import ProjectCard from '@/components/ProjectCard';

interface Props {
  activeProjects: Project[];
  finishedProjects: Project[];
}

export default function ProjectsTabFilter({ activeProjects, finishedProjects }: Props) {
  const [tab, setTab] = useState<'u-toku' | 'završeni'>('u-toku');

  const displayed = tab === 'u-toku' ? activeProjects : finishedProjects;

  return (
    <div>
      {/* Tab gumbi */}
      <div className="flex gap-2 mb-8 border-b border-gray-200">
        {(['u-toku', 'završeni'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2.5 text-sm font-semibold transition-colors -mb-px border-b-2 ${
              tab === t
                ? 'border-[#36A8EF] text-[#36A8EF]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            {t === 'u-toku' ? 'U toku' : 'Završeni'}
          </button>
        ))}
      </div>

      {displayed.length === 0 ? (
        <p className="text-gray-500 text-sm">Nema projekata u ovoj kategoriji.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
