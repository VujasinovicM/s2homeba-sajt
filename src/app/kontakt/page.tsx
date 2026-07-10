import type { Metadata } from 'next';
import HeroHeader from '@/components/HeroHeader';
import { siteInfo } from '@/data/site';

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Kontaktirajte S2 HOME d.o.o. — Ul. Akademika Jovana Surutke 9, Banja Luka. Tel: 066 992 999. Pon–Pet 08:00–16:00.',
  alternates: { canonical: 'https://s2home.ba/kontakt' },
};

export default function KontaktPage() {
  return (
    <>
      <HeroHeader
        title="Kontaktirajte nas"
        subtitle="Tu smo da odgovorimo na sva vaša pitanja"
        imageSrc="/images/hero/hero-kontakt.jpg"
        minHeight="300px"
      />

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Lijevo: uredi */}
            <div className="flex-1 space-y-10">
              {siteInfo.offices.map((office) => (
                <div key={office.name} className="space-y-5">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">{office.name}</h2>

                    <dl className="space-y-3">
                      <div className="flex items-start gap-3 text-sm">
                        <svg className="w-5 h-5 text-[#36A8EF] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div>
                          <dt className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">Adresa</dt>
                          <dd className="text-gray-800">{office.address}</dd>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 text-sm">
                        <svg className="w-5 h-5 text-[#36A8EF] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <dt className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">E-mail</dt>
                          <dd>
                            <a href={`mailto:${office.email}`} className="text-[#36A8EF] hover:underline">
                              {office.email}
                            </a>
                          </dd>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 text-sm">
                        <svg className="w-5 h-5 text-[#36A8EF] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <div>
                          <dt className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">Telefon</dt>
                          <dd>
                            <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="text-gray-800 hover:text-[#36A8EF]">
                              {office.phone}
                            </a>
                          </dd>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 text-sm">
                        <svg className="w-5 h-5 text-[#36A8EF] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <dt className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">Radno vrijeme</dt>
                          <dd className="text-gray-800">{office.workingHours}</dd>
                        </div>
                      </div>
                    </dl>
                  </div>

                  {/* Google Maps embed */}
                  <div className="rounded-xl overflow-hidden shadow-sm">
                    <iframe
                      src={office.mapEmbedUrl}
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Mapa – ${office.name}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Desno: direktan kontakt */}
            <div className="lg:w-[480px] shrink-0">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Pošaljite nam poruku</h2>

                <div className="space-y-3">
                  <a
                    href={`mailto:${siteInfo.email}?subject=${encodeURIComponent('Upit sa sajta s2home.ba')}`}
                    className="btn-primary w-full text-center"
                  >
                    ✉ &nbsp;Pošaljite e-mail
                  </a>

                  <a
                    href={`tel:${siteInfo.phone.replace(/\s/g, '')}`}
                    className="btn-outline w-full text-center"
                  >
                    ✆ &nbsp;Pozovite {siteInfo.phone}
                  </a>
                </div>

                <p className="text-xs text-gray-400 mt-4 text-center">
                  {siteInfo.email} · {siteInfo.offices[0].workingHours}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
