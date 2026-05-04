import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-white/80">
      <Link href="/" className="hover:text-white transition-colors">
        Početna
      </Link>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          <span className="text-white/50">›</span>
          {item.href ? (
            <Link href={item.href} className="hover:text-white transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-white font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
