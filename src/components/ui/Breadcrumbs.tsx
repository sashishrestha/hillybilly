import { Link } from 'react-router-dom';

export function Breadcrumbs({ items }: { items: { name: string; path?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm">
      <ol className="flex flex-wrap items-center gap-2 text-mist">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-2">
            {it.path ? (
              <Link to={it.path} className="hover:text-cream hover:underline">{it.name}</Link>
            ) : (
              <span aria-current="page" className="text-cream">{it.name}</span>
            )}
            {i < items.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
