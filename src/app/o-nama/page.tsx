import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import HeroHeader from '@/components/HeroHeader';

export const metadata: Metadata = {
  title: 'O nama',
  description:
    'S2 HOME d.o.o. — investitor i graditelj nekretnina sa sjedištem u Banjoj Luci, BiH. Upoznajte našu kompaniju, tim i vrijednosti.',
  alternates: { canonical: 'https://s2home.ba/o-nama' },
};

export default function ONamaPage() {
  return (
    <>
      <HeroHeader
        title="Ko smo mi?"
        subtitle="Kompanija s vizijom i iskustvom u izgradnji budućnosti"
        imageSrc="/images/o-nama/hero-noc.jpg"
        minHeight="360px"
      />

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Tekst */}
            <div>
              <h2 className="section-heading">O kompaniji S2 HOME</h2>
              <div className="section-underline" />
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
                <p>
                  <strong>"S2 HOME" d.o.o.</strong> je kompanija sa sjedištem u Banjoj Luci,
                  Bosna i Hercegovina, koja se bavi investicijama i izgradnjom stambenih i
                  poslovnih nekretnina.
                </p>
                <p>
                  Naša misija je pružiti kupcima visok standard stanovanja uz korištenje
                  materijala i opreme prve klase. Svaki naš projekat je osmišljen s pažnjom
                  prema detaljima, energetskoj efikasnosti i dugoročnoj vrijednosti nekretnine.
                </p>
                <p>
                  Vjerujemo da dom nije samo fizički prostor — on je temelj vaše porodice,
                  vaše sigurnosti i vaše budućnosti. Zato svakom projektu pristupamo s
                  maksimalnom posvećenošću i odgovornošću prema kupcima.
                </p>
                <p>
                  Naš tim čine iskusni stručnjaci iz oblasti arhitekture, gradjevinarstva i
                  investicionog menadžmenta, koji zajedno realizuju projekte na najvišem nivou.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/projekti" className="btn-primary">
                  Pogledajte projekte
                </Link>
                <Link href="/kontakt" className="btn-outline">
                  Kontaktirajte nas
                </Link>
              </div>
            </div>

            {/* Fotografija */}
            <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/o-nama/tim.jpg"
                alt="S2 HOME tim"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Vrijednosti */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Kvalitet',
                desc: 'Koristimo isključivo materijale i opremu prvoklasnih svjetskih proizvođača.',
                icon: '★',
              },
              {
                title: 'Pouzdanost',
                desc: 'Poštujemo dogovorene rokove i transparentno komuniciramo sa kupcima.',
                icon: '✓',
              },
              {
                title: 'Inovacija',
                desc: 'Pratimo najnovije trendove u energetskoj efikasnosti i modernom stanovanju.',
                icon: '◈',
              },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="text-3xl text-[#36A8EF] mb-3">{v.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
