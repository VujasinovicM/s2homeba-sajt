import Breadcrumb, { BreadcrumbItem } from './Breadcrumb';

interface HeroHeaderProps {
  title: string;
  subtitle?: string;
  imageSrc?: string;
  breadcrumb?: BreadcrumbItem[];
  minHeight?: string;
}

export default function HeroHeader({
  title,
  subtitle,
  imageSrc,
  breadcrumb,
  minHeight = '280px',
}: HeroHeaderProps) {
  return (
    <section
      className="relative flex items-end overflow-hidden -mt-16"
      style={{ minHeight }}
    >
      {/* Pozadina */}
      {imageSrc ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageSrc})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-600" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Sadržaj */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-28">
        {breadcrumb && <Breadcrumb items={breadcrumb} />}
        <h1
          className="text-3xl md:text-4xl font-bold text-white mt-3 leading-tight"
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-lg text-white/80 max-w-2xl">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
