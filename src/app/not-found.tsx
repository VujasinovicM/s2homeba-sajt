import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-7xl font-black text-[#36A8EF] mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-900 mb-3">Stranica nije pronađena</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        Stranica koju tražite ne postoji ili je premještena.
      </p>
      <Link href="/" className="btn-primary">
        Povratak na početnu
      </Link>
    </div>
  );
}
