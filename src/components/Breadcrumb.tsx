import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

const BASE = 'https://s2home.ba';

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const allItems = [
    { label: 'Početna', href: BASE },
    ...items.map((item) => ({
      label: item.label,
      href: item.href ? `${BASE}${item.href}` : undefined,
    })),
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: item.href } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
    </>
  );
}
