# Uputstvo: Dodavanje novog projekta

Ovaj dokument objašnjava korak po korak šta sve treba uraditi kada se dodaje novi projekat na sajt.

---

## Prije nego počneš

**Slug** je kratki identifikator projekta koji se koristi u URL-u i kao veza između CSV fajlova.

Pravila za slug:
- samo mala slova i crtice: `objekat-centar`
- bez dijakritičkih znakova: `etaza-1` ne `etaža-1`
- bez razmaka i specijalnih karaktera
- **jednom postavljen slug se nikad ne mijenja** — kvari URL-ove i bookmarke

---

## Korak 1 — Slike i PDF-ovi

Kreiraj sljedeću strukturu foldera u `public/images/projekti/`:

```
public/
  images/
    projekti/
      objekat-centar/               ← tvoj slug
        hero.jpg                    ← naslovna slika (1920×1080px, do 500KB)
        gallery/
          1.jpg                     ← galerija (1200×800px, do 300KB)
          2.jpg
          3.jpg
        etaze/
          prizemlje/
            tlocrt.jpg              ← tlocrt etaže (1600×1000px, do 300KB)
          sprat-1/
            tlocrt.jpg
          sprat-2/
            tlocrt.jpg
        stanovi/
          oc-stan-01/
            tlocrt.jpg              ← tlocrt stana (1200×900px, do 200KB)
          oc-stan-02/
            tlocrt.jpg
  pdfs/
    oc-stan-01.pdf                  ← PDF za preuzimanje (opcionalno)
    oc-stan-02.pdf
```

> Kompresuj slike na [squoosh.app](https://squoosh.app) prije dodavanja.

---

## Korak 2 — `data/projects.csv`

Dodaj novi red na kraj fajla.

**Format:**
```
slug,name,year,status,shortDescription,heroImage,technicalDescription,saleInfo
```

**Primjer:**
```
objekat-centar,Objekat Centar,2025,u-tijeku,Kratak opis projekta.,/images/projekti/objekat-centar/hero.jpg,"Tehnički opis — materijali, spratnost, grijanje.","Uvjeti prodaje i kontakt informacije."
```

**Objašnjenje kolona:**

| Kolona | Opis | Primjer |
|---|---|---|
| `slug` | Jedinstven ID projekta | `objekat-centar` |
| `name` | Naziv koji se prikazuje | `Objekat Centar` |
| `year` | Godina izgradnje | `2025` |
| `status` | Status projekta | `u-tijeku` ili `završen` |
| `shortDescription` | Kratak opis (kartica) | `Moderni stambeni objekat...` |
| `heroImage` | Putanja do naslove slike | `/images/projekti/objekat-centar/hero.jpg` |
| `technicalDescription` | Tehnički detalji | Zatvori u `"navodnike"` ako ima zareze ili više redova |
| `saleInfo` | Tekst o prodaji | Isto, zatvori u navodnike |

**Efekti statusa:**
- `u-tijeku` → projekat se prikazuje na naslovnici i na stranici `/slobodni-stanovi/`
- `završen` → projekat se premješta na `/reference/` i nestaje sa `/slobodni-stanovi/`

**Višelinijski tekst** (za technicalDescription i saleInfo):
```
"Linija 1.
Linija 2.
Linija 3."
```

---

## Korak 3 — `data/floors.csv`

Dodaj etaže projekta. Svaka etaža je poseban red.

**Format:**
```
project_slug,slug,name,order,floorPlanImage
```

**Primjer:**
```
objekat-centar,prizemlje,Prizemlje,0,/images/projekti/objekat-centar/etaze/prizemlje/tlocrt.jpg
objekat-centar,sprat-1,Sprat 1,1,/images/projekti/objekat-centar/etaze/sprat-1/tlocrt.jpg
objekat-centar,sprat-2,Sprat 2,2,/images/projekti/objekat-centar/etaze/sprat-2/tlocrt.jpg
```

**Objašnjenje kolona:**

| Kolona | Opis |
|---|---|
| `project_slug` | Mora odgovarati slug-u iz `projects.csv` |
| `slug` | Slug etaže (npr. `prizemlje`, `sprat-1`, `podrum`, `povucena-etaza`) |
| `name` | Naziv koji se prikazuje (npr. `Sprat 1`, `Povučena etaža`) |
| `order` | Redosljed prikaza — `0` je prvo, pa `1`, `2`... |
| `floorPlanImage` | Putanja do tlocrta etaže |

---

## Korak 4 — `data/apartments.csv`

Dodaj svaki stan, poslovni prostor ili parking mjesto kao poseban red.

**Format:**
```
project_slug,floor_slug,slug,code,rooms,type,status,totalNP,totalNKP,floorPlanImage,pdfFile
```

**Primjer:**
```
objekat-centar,prizemlje,oc-pp-01,PP-1,Poslovni prostor,Poslovni prostor,slobodno,85.50,80.20,/images/projekti/objekat-centar/stanovi/oc-pp-01/tlocrt.jpg,
objekat-centar,sprat-1,oc-stan-01,1,2-sobni,Stan,slobodno,62.30,58.10,/images/projekti/objekat-centar/stanovi/oc-stan-01/tlocrt.jpg,/pdfs/oc-stan-01.pdf
objekat-centar,sprat-1,oc-stan-02,2,3-sobni,Stan,rezervirano,85.40,80.00,/images/projekti/objekat-centar/stanovi/oc-stan-02/tlocrt.jpg,/pdfs/oc-stan-02.pdf
objekat-centar,sprat-2,oc-stan-03,3,1-sobni,Stan,prodano,45.00,42.50,/images/projekti/objekat-centar/stanovi/oc-stan-03/tlocrt.jpg,
```

**Objašnjenje kolona:**

| Kolona | Opis | Napomena |
|---|---|---|
| `project_slug` | Slug projekta | Mora odgovarati `projects.csv` |
| `floor_slug` | Slug etaže | Mora odgovarati `floors.csv` |
| `slug` | Jedinstven ID stana | Jedinstven u **cijelom sistemu**, ne samo u projektu |
| `code` | Oznaka stana | Prikazuje se u tabeli (npr. `1`, `PP-1`, `GM-3`) |
| `rooms` | Tip stana | `1-sobni`, `2-sobni`, `3-sobni`, `4-sobni`, `Poslovni prostor`... |
| `type` | Kategorija | `Stan`, `Poslovni prostor`, `Garažno mjesto`, `Parking mjesto` |
| `status` | Trenutni status | `slobodno`, `rezervirano`, `prodano` |
| `totalNP` | Ukupna neto površina (m²) | Decimalni broj s tačkom: `62.30` |
| `totalNKP` | Korisna kvadratura (m²) | Decimalni broj s tačkom: `58.10` |
| `floorPlanImage` | Tlocrt stana | Putanja do slike |
| `pdfFile` | PDF za preuzimanje | Putanja do PDF-a, ili prazno ako nema |

**Preporučeni format slug-a za stanove:** `oc-stan-01`, `oc-stan-02` (prefiks projekta + redni broj)

**Dozvoljene vrijednosti za status:**

| Status | Boja | Prikazuje se na /slobodni-stanovi/ |
|---|---|---|
| `slobodno` | Zelena | Da |
| `rezervirano` | Žuta | Da |
| `prodano` | Crvena | Ne |

---

## Korak 5 — `data/rooms.csv`

Za svaki stan navedi prostorije i njihove površine. Svaka prostorija je poseban red.

**Format:**
```
apartment_slug,name,area
```

**Primjer:**
```
oc-stan-01,Dnevni boravak + kuhinja,28.50
oc-stan-01,Spavaća soba,12.30
oc-stan-01,Spavaća soba,11.80
oc-stan-01,Kupatilo,5.20
oc-stan-01,Hodnik,4.50
oc-stan-01,Lođa,3.70
oc-stan-02,Dnevni boravak,22.00
oc-stan-02,Kuhinja,8.00
oc-stan-02,Spavaća soba,14.00
oc-stan-02,Spavaća soba,12.00
oc-stan-02,Spavaća soba,10.00
oc-stan-02,Hodnik,6.50
oc-stan-02,Kupatilo,6.00
oc-stan-02,WC,2.50
oc-stan-02,Lođa,4.40
```

> Prostorije se prikazuju u tabeli na stranici stana. Redosljed u CSV-u = redosljed prikaza.

---

## Korak 6 — `data/gallery.csv`

Dodaj slike galerije za projekat.

**Format:**
```
project_slug,imagePath
```

**Primjer:**
```
objekat-centar,/images/projekti/objekat-centar/gallery/1.jpg
objekat-centar,/images/projekti/objekat-centar/gallery/2.jpg
objekat-centar,/images/projekti/objekat-centar/gallery/3.jpg
```

---

## Korak 7 — Objavi na sajt

Otvori terminal u folderu projekta i pokreni:

```bash
git add .
git commit -m "Dodaj projekat Objekat Centar"
git push
```

Vercel automatski detektuje push, pokreće build i sajt je ažuriran za oko 1 minutu.

---

## Česte greške

| Problem | Rješenje |
|---|---|
| Projekat se ne pojavljuje na sajtu | Provjeri da je `slug` isti u svim CSV fajlovima |
| Slika se ne prikazuje | Provjeri da putanja počinje sa `/` i da fajl postoji u `public/` |
| Tekst s zarezom razbija kolone | Zatvori cijelo polje u `"dvostruke navodnike"` |
| Stan se ne pojavljuje u tabeli | Provjeri da `floor_slug` u `apartments.csv` odgovara `slug` u `floors.csv` |
| PDF se ne preuzima | Provjeri da fajl postoji u `public/pdfs/` i da putanja počinje sa `/pdfs/` |

---

## Brzi primjer — Promjena statusa stana

Otvori `data/apartments.csv`, pronađi red po slug-u stana i promijeni kolonu `status`:

```
objekat-centar,sprat-1,oc-stan-01,1,2-sobni,Stan,slobodno,...
                                                    ↑
                                          slobodno → rezervirano
```

Zatim:
```bash
git add data/apartments.csv
git commit -m "Rezerviraj stan oc-stan-01"
git push
```
