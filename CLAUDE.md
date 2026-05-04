# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Pokretanje i build komande

```bash
npm run dev      # Razvojni server → http://localhost:3000  (hot-reload, odmah vidi izmjene)
npm run build    # Produkcijski build (čita CSV i generiše statičke stranice)
npm run start    # Pokretanje produkcijskog servera nakon builda
npm run lint     # ESLint provjera koda
```

---

## Tehnički stack

| Tehnologija | Verzija | Napomena |
|---|---|---|
| Next.js | 16.2.4 | App Router, TypeScript |
| React | 19.2.4 | Server Components su default |
| Tailwind CSS | 4.x | Bez `tailwind.config.js` — konfiguracija u CSS |
| Swiper.js | 12.x | Dinamički import (client-side only) |

### Kritična razlika od starijih Next.js verzija

U Next.js 16 `params` i `searchParams` su **Promise** i moraju se `await`-ovati:

```typescript
// ISPRAVNO
export default async function Page(props: PageProps<'/projekti/[projekt-slug]'>) {
  const { 'projekt-slug': slug } = await props.params;
}
```

Koriste se globalni tipski helperi `PageProps<'/ruta/[param]'>` — bez importa.

### Tailwind CSS 4

Nema `tailwind.config.js`. Custom vrijednosti se definišu u `src/app/globals.css` u `@theme {}` bloku.

---

## Sistem podataka — CSV fajlovi

**Sav sadržaj sajta (projekti, etaže, stanovi, statusi) čuva se u CSV fajlovima** u `data/` folderu na korijenu projekta. Nema baze podataka, nema CMS-a.

### Koje CSV fajlove postoje i čemu služe

| Fajl | Opis | Kolone |
|---|---|---|
| `data/projects.csv` | Projekti — naziv, godina, status, opisi | slug, name, year, status, shortDescription, heroImage, technicalDescription, saleInfo |
| `data/floors.csv` | Etaže po projektu | project_slug, slug, name, order, floorPlanImage |
| `data/apartments.csv` | **Stanovi** — ovo se najčešće uređuje | project_slug, floor_slug, slug, code, rooms, type, **status**, totalNP, totalNKP, floorPlanImage, pdfFile |
| `data/rooms.csv` | Prostorije po stanu s površinama | apartment_slug, name, area |
| `data/gallery.csv` | Galerija fotografija po projektu | project_slug, imagePath |

### Kako sistem radi

```
data/*.csv
    ↓ čita se pri npm run build
src/lib/csvParser.ts   ← RFC 4180 parser (handla citate, zareze u tekstu, višelinijski tekst)
src/lib/loadData.ts    ← spaja 5 CSV-a u Project[] strukturu, cache-uje u memoriji
src/data/projects.ts   ← re-exportuje loadProjects() + helper funkcije
    ↓ koriste server komponente
Sve stranice (SSG)     ← statički HTML generisan pri buildu
```

**Važno:** CSV fajlovi se čitaju samo pri `npm run build`. Promjena CSV-a na produkciji zahtijeva novi build (na Vercelu/Netlifyu to se dešava automatski pri push na GitHub).

---

## Gdje se uređuju podaci

### Najčešća operacija: promjena statusa stana

Otvori `data/apartments.csv` i promijeni vrijednost u koloni `status`:

```
# Dozvoljene vrijednosti:
status: slobodno | rezervirano | prodano
```

Primjer — pronađi red sa slug-om stana i izmijeni:
```
stan-p1,P-1,2-sobni,Stan,slobodno,...    ← trenutno slobodan
stan-p1,P-1,2-sobni,Stan,rezervirano,...  ← promijeni ovdje
```

---

## Gdje se stavljaju slike i PDF-ovi

### Kompletna mapa foldera

```
public/
  images/
    hero/
      hero-1.jpg          ← 1. slajd hero slidera na naslovnici
      hero-2.jpg          ← 2. slajd
      hero-3.jpg          ← 3. slajd
      hero-projekti.jpg   ← Hero na /projekti/
      hero-slobodni.jpg   ← Hero na /slobodni-stanovi/
      hero-reference.jpg  ← Hero na /reference/
      hero-kontakt.jpg    ← Hero na /kontakt/
    o-nama/
      hero-noc.jpg        ← Hero na /o-nama/ (noćna fotografija)
      tim.jpg             ← Fotografija s desne strane teksta
    oprema/
      hero.jpg            ← Hero na /oprema/
    projekti/
      {projekt-slug}/
        hero.jpg                      ← Naslovna fotografija projekta
        gallery/
          1.jpg, 2.jpg, 3.jpg...      ← Galerija (putanje se navode u gallery.csv)
        etaze/
          {etaza-slug}/
            tlocrt.jpg                ← Tlocrt cijele etaže
        stanovi/
          {stan-slug}/
            tlocrt.jpg                ← Arhitektonski tlocrt stana
  pdfs/
    {stan-slug}.pdf       ← PDF tlocrt za preuzimanje (putanja u apartments.csv → pdfFile)
```

### Preporučene dimenzije

| Tip | Dimenzije | Veličina |
|---|---|---|
| Hero slider | 1920×1080 px | do 500 KB |
| Hero podstranice | 1920×700 px | do 400 KB |
| Galerija projekta | 1200×800 px | do 300 KB |
| Tlocrt etaže | 1600×1000 px | do 300 KB |
| Tlocrt stana | 1200×900 px | do 200 KB |

> Kompresuj slike na [squoosh.app](https://squoosh.app) prije dodavanja.

---

## Korak-po-korak operacije

### Promjena statusa stana

1. Otvori `data/apartments.csv`
2. Pronađi red po `slug` ili `code` koloni
3. Promijeni `status` kolonu: `slobodno` → `rezervirano` → `prodano`
4. Sačuvaj → `npm run build`

---

### Dodavanje novog projekta

**1. Kreirati folder za slike:**
```
public/images/projekti/{novi-slug}/
public/images/projekti/{novi-slug}/gallery/
public/images/projekti/{novi-slug}/etaze/
public/images/projekti/{novi-slug}/stanovi/
```

**2. Dodati red u `data/projects.csv`:**
```csv
novi-objekat,"Naziv projekta",2025,u-tijeku,"Kratak opis.",/images/projekti/novi-objekat/hero.jpg,"Tehnički opis tekst.","Uvjeti prodaje tekst."
```

> Za višelinijski `technicalDescription` i `saleInfo`, tekst zatvori u dvostruke navodnike i koristi Enter unutar navodnika:
> ```csv
> "Linija 1.
> Linija 2.
> Linija 3."
> ```

**3. Dodati etaže u `data/floors.csv`:**
```csv
novi-objekat,prizemlje,Prizemlje,0,/images/projekti/novi-objekat/etaze/prizemlje/tlocrt.jpg
novi-objekat,etaza-1,Etaža 1,1,/images/projekti/novi-objekat/etaze/etaza-1/tlocrt.jpg
```

**4. Dodati stanove u `data/apartments.csv`:**
```csv
novi-objekat,prizemlje,stan-p1,P-1,2-sobni,Stan,slobodno,62.5,58.3,/images/projekti/novi-objekat/stanovi/stan-p1/tlocrt.jpg,/pdfs/stan-p1.pdf
```

**5. Dodati prostorije u `data/rooms.csv`:**
```csv
stan-p1,Ulaz / Hodnik,4.2
stan-p1,Kupaonica,5.1
stan-p1,Kuhinja,10.8
```

**6. Dodati galeriju u `data/gallery.csv`** (kad budu slike):
```csv
novi-objekat,/images/projekti/novi-objekat/gallery/1.jpg
```

**7.** `npm run build`

---

### Označavanje projekta kao završenog

U `data/projects.csv`, promijeni `status`:
```
u-tijeku → završen
```

Efekti:
- Premješta se s taba "U tijeku" na "Završeni" na naslovnici
- Pojavljuje se na `/reference/`
- **Nestaje** sa `/slobodni-stanovi/`

---

### Dodavanje slike u galeriju

1. Dodaj fajl u `public/images/projekti/{slug}/gallery/`
2. Dodaj red u `data/gallery.csv`:
   ```csv
   stambeni-objekat-surutke,/images/projekti/stambeni-objekat-surutke/gallery/4.jpg
   ```
3. `npm run build`

---

### Ažuriranje hero slidera (naslovnica)

Otvori `src/app/page.tsx` i pronađi niz `heroSlides`:

```typescript
const heroSlides = [
  {
    image: '/images/hero/hero-1.jpg',    // zamijeni sliku
    title: 'Novi naslov slajda',
    subtitle: 'Podnaslov tekst',
    href: '/projekti',                   // kud vodi gumb
  },
];
```

---

### Ažuriranje kontakt podataka

Otvori `src/data/site.ts`. Promijeni telefon, email, adresu ili radno vrijeme.

**Promjena Google Maps embed-a:**
1. Otvori maps.google.com → nađi lokaciju → Share → Embed a map
2. Kopiraj `src="..."` vrijednost iz `<iframe>` taga
3. Zalijepi u `mapEmbedUrl` polje

---

### Ažuriranje tekstova na statičnim stranicama

| Stranica | Fajl | Gdje |
|---|---|---|
| Naslovnica — "O nama" blok | `src/app/page.tsx` | ~red 95–110 |
| O nama — tekst | `src/app/o-nama/page.tsx` | JSX tekst |
| Oprema — sekcije | `src/app/oprema/page.tsx` | niz `sections` |
| Hero naslovi | Svaka `page.tsx` | `<HeroHeader title="..." />` |

---

## Arhitektura koda

### Mapa svih stranica

| URL | Fajl |
|---|---|
| `/` | `src/app/page.tsx` |
| `/projekti/` | `src/app/projekti/page.tsx` |
| `/projekti/{slug}/` | `src/app/projekti/[projekt-slug]/page.tsx` |
| `/projekti/{slug}/{etaza}/` | `src/app/projekti/[projekt-slug]/[etaza-slug]/page.tsx` |
| `/projekti/{slug}/{etaza}/{stan}/` | `src/app/projekti/[projekt-slug]/[etaza-slug]/[stan-slug]/page.tsx` |
| `/slobodni-stanovi/` | `src/app/slobodni-stanovi/page.tsx` |
| `/reference/` | `src/app/reference/page.tsx` |
| `/o-nama/` | `src/app/o-nama/page.tsx` |
| `/oprema/` | `src/app/oprema/page.tsx` |
| `/kontakt/` | `src/app/kontakt/page.tsx` |

### Mapa komponenti

```
src/components/
  Header.tsx           ← Navigacija (client — usePathname za aktivni link)
  Footer.tsx           ← Footer s CTA trakom i linkovima
  HeroHeader.tsx       ← Hero zaglavlje podstranica (slika + overlay + breadcrumb)
  HeroSlider.tsx       ← Swiper.js full-screen slider (client, dinamički import)
  Breadcrumb.tsx       ← Navigacioni krušni trag
  ProjectCard.tsx      ← Kartica projekta (slika + naziv + opis + gumb)
  ApartmentTable.tsx   ← Tablica stanova s dropdown filterima (client)
  StatusBadge.tsx      ← Zeleni/žuti/crveni bedž za status

src/app/
  ProjectsTabFilter.tsx                     ← Tab "U tijeku/Završeni" (client)
  projekti/[projekt-slug]/
    ProjectStickyNav.tsx                    ← Sticky anchor navigacija (client)
  slobodni-stanovi/
    SlobodniStanoviClient.tsx               ← Accordion po etažama (client)
  kontakt/
    ContactForm.tsx                         ← Forma s mailto fallback (client)

src/lib/
  csvParser.ts    ← RFC 4180 CSV parser (handla višelinijski tekst, zareze u tekstu)
  loadData.ts     ← Čita 5 CSV-a, sklapa Project[] strukturu, cache u memoriji

src/data/
  types.ts        ← TypeScript interfejsi (Project, Floor, Apartment, ...)
  projects.ts     ← Re-exportuje loadProjects() + helper funkcije
  site.ts         ← Kontakt podaci kompanije i uredi
```

### Server vs Client komponente

**Server** (mogu koristiti `fs`, čitaju CSV): sve `page.tsx` fajlove
**Client** (`'use client'`): Header, HeroSlider, ApartmentTable, ProjectsTabFilter, SlobodniStanoviClient, ProjectStickyNav, ContactForm

Client komponente **ne smiju** importovati direktno iz `src/data/projects.ts` (jer `loadData.ts` koristi `fs` koji ne postoji na klijentu). Podaci se prosljeđuju kao props od server komponente.

---

## Dizajn sistem

### Boje

| Hex | Upotreba |
|---|---|
| `#36A8EF` | Brand (plava) — akcenti, aktivni linkovi, slider, podbočivanja |
| `#f0eeee` | Pozadina svih stranica |
| `#8B0000` | Gumbi (bordo) |
| `#2c2c2c` | Zaglavlje tablice |
| `#16a34a` | Status Slobodno (zelena) |
| `#ca8a04` | Status Rezervirano (žuta) |
| `#dc2626` | Status Prodano (crvena) |

### CSS klase iz `globals.css`

```css
.btn-primary        /* Bordo gumb s bijelim tekstom */
.btn-outline        /* Bordo obrub → punjen na hover */
.status-slobodno    /* Zeleni bedž */
.status-rezervirano /* Žuti bedž */
.status-prodano     /* Crveni bedž */
.status-badge       /* Bazna klasa za bedževe */
.data-table         /* Tamno zaglavlje + bijele ćelije + hover */
.section-heading    /* Naslov sekcije */
.section-underline  /* Plava linija ispod naslova */
.sticky-nav         /* Sticky navigacija na stranici projekta */
```

---

## Pravila za slug vrijednosti

- Samo **mala slova** i **crtice**: `stambeni-objekat-surutke`
- **Bez dijakritičkih znakova**: `etaza-1` ne `etaža-1`
- **Jedinstven** unutar konteksta (slug stana jedinstven u cijelom sistemu)
- **Stabilan** — jednom postavljen slug ne mijenjati (ruši bookmarkovane i indeksirane URL-ove)

---

## Česte greške i rješenja

| Problem | Rješenje |
|---|---|
| Stranica vraća 404 po dodavanju u CSV | Pokreni `npm run build` — SSG generiše stranice samo pri buildu |
| Slika se ne prikazuje | Provjeri da putanja počinje s `/` i da fajl postoji u `public/` |
| Status stana se ne mijenja na sajtu | Na `npm run dev` osvježi stranicu; na produkciji pokreni novi build |
| CSV greška — tekst s zarezom razbija kolone | Zatvori polje u dvostruke navodnike: `"Tekst, s zarezom"` |
| TypeScript greška u dinamičnoj stranici | Uvijek `await props.params` i koristi `PageProps<'/ruta/[param]'>` |
| `fs` greška u klijentskoj komponenti | Client komponente ne smiju importovati `projects.ts` — podaci idu kao props |
