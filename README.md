# Ergo solutions - Zadanie 1

Aplikacja React + TypeScript (Vite).

## Wymagania

- Node.js **20+**
- npm **10+**

## Uruchomienie

```bash
npm install
npm run dev
```

Aplikacja domyślnie: [http://localhost:5173](http://localhost:5173)

## Skrypty

| Skrypt                 | Opis                                        |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Serwer deweloperski Vite                    |
| `npm run build`        | Kompilacja produkcyjna                      |
| `npm run preview`      | Podgląd builda                              |
| `npm run typecheck`    | Sprawdzenie typów (`tsc --noEmit`)          |
| `npm run test`         | Testy jednostkowe (Vitest, jednorazowy run) |
| `npm run test:watch`   | Testy w trybie watch                        |
| `npm run lint`         | ESLint                                      |
| `npm run format`       | Prettier - formatowanie plików              |
| `npm run format:check` | Prettier - tylko weryfikacja                |

## Decyzje techniczne

- **Vite + React + TypeScript** - szybki start, zgodność z wymaganiami zadania (`npm install` / `npm run dev`).
- **Tailwind CSS v4** (`@tailwindcss/vite`) - utility-first, bez osobnego pliku `tailwind.config`; style w `src/index.css` przez `@import 'tailwindcss'`.
- **Vitest + Testing Library** - testy zachowania.
- **ESLint + Prettier + lint-staged + Husky** - minimalna higiena kodu przy commitach (lint + format na staged plikach).

## Struktura `src/`

```
src/
  data/         # columns.json - konfiguracja tabeli
  app/          # shell aplikacji
  components/   # komponenty UI
  features/     # logika funkcjonalna
  lib/          # funkcje pomocnicze
  types/        # typy współdzielone
  test/         # konfiguracja testów (setup Vitest)
```
