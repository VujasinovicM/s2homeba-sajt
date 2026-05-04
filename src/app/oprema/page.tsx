import type { Metadata } from 'next';
import HeroHeader from '@/components/HeroHeader';

export const metadata: Metadata = { title: 'Oprema' };

const sections = [
  {
    title: 'Sanitarije i kupatilska oprema',
    items: [
      'Sanitarije: Geberit, Villeroy & Boch ili ekvivalent',
      'Baterije: Grohe, Hansgrohe ili ekvivalent',
      'Tuš-kabine: aluminijumski profili s tvrdim staklom (8mm)',
      'Grijani podovi u kupatilima',
      'Ogledala s ugrađenim osvjetljenjem',
    ],
  },
  {
    title: 'Podne obloge',
    items: [
      'Keramičke pločice u kupatilima i kuhinjama: format min. 60×60 cm',
      'Laminat ili parket u dnevnim boravcima i sobama (klasa AC5)',
      'Protivpožarne pločice u predsobljima i hodnicima',
    ],
  },
  {
    title: 'Stolarija i fasada',
    items: [
      'Aluminijumski prozori s trostrukim staklom (Uw ≤ 0,9 W/m²K)',
      'Termoizolovana ulazna vrata s višetočkastim zaključavanjem',
      'Unutrašnje stolarija: HDF ploče, visinska vrata (2,1 m)',
      'Fasada: EPS termoizolacija 15 cm + mineralna žbuka ili fasadni paneli',
    ],
  },
  {
    title: 'Grijanje i hlađenje',
    items: [
      'Sistem podnog grijanja u svim prostorijama',
      'Toplotna pumpa vazduh-voda klase energetske efikasnosti A+++',
      'Individualna regulacija temperature po prostoriji',
      'Priprema za klima-uređaj u spavaćim sobama',
    ],
  },
  {
    title: 'Elektroinstalacije i pametna kuća',
    items: [
      'Instalacija po BAS EN standardima',
      'LED rasvjeta u zajedničkim prostorima',
      'Priprema za pametnu kućnu automatiku',
      'Optički internet (fiber) priključak',
      'Video interfon s ekranom',
    ],
  },
  {
    title: 'Zajednički prostori i lift',
    items: [
      'Lift: OTIS Gen2 ili Schindler, kapacitet min. 8 osoba',
      'Podzemna garaža sa automatskim kapijama',
      'Video nadzor zajedničkih prostora',
      'Stalak za bicikle u suterenu',
    ],
  },
];

export default function OpremaPage() {
  return (
    <>
      <HeroHeader
        title="Oprema prve klase"
        subtitle="Detaljan pregled materijala i opreme koji koristimo u izgradnji"
        imageSrc="/images/oprema/hero.jpg"
        minHeight="300px"
      />

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600 max-w-2xl mb-10 leading-relaxed">
            Koristimo isključivo materijale i opremu renomiranih svjetskih i evropskih
            proizvođača. Svaki element je pažljivo odabran kako bi osigurao dugotrajan
            komfor, energetsku efikasnost i estetski izgled vašeg doma.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((sec) => (
              <div key={sec.title} className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-base flex items-center gap-2">
                  <span className="w-1 h-5 rounded-full bg-[#36A8EF] inline-block" />
                  {sec.title}
                </h3>
                <ul className="space-y-1.5">
                  {sec.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-[#36A8EF] mt-0.5 flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
