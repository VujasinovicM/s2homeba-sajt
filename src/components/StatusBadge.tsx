import { ApartmentStatus } from '@/data/types';

const labels: Record<ApartmentStatus, string> = {
  slobodno: 'Slobodno',
  rezervirano: 'Rezervirano',
  prodano: 'Prodano',
};

export default function StatusBadge({ status }: { status: ApartmentStatus }) {
  return (
    <span className={`status-badge status-${status}`}>
      {labels[status]}
    </span>
  );
}
