# Ergo solutions - Zadanie 1

Panel listy wniosków - React + TypeScript (Vite). Kolumny, formatowanie, sortowanie, filtry i akcje wynikają z metadanych i danych wierszy.

## Wymagania

- Node.js **20+**
- npm **10+**

## Uruchomienie

```bash
npm install
npm run dev
```

Aplikacja domyślnie: [http://localhost:5173](http://localhost:5173)

Dane:

- metadane kolumn: `src/data/columns.json`
- wiersze: `public/data/rows.json` (fetch w runtime)

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

## Model metadanych

### Kolumny (`columns.json` -> `ColumnDefinition`)

| Pole         | Znaczenie                                                                                                              |
| ------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `key`        | Identyfikator pola w wierszu (np. `customerName`) lub klucz uprawnienia dla akcji (`canEdit` -> `permissions.canEdit`) |
| `label`      | Nagłówek kolumny w UI                                                                                                  |
| `type`       | Sposób renderowania i sortowania: `text`, `badge`, `currency`, `date`, `action`                                        |
| `sortable`   | Czy nagłówek włącza sortowanie                                                                                         |
| `filterable` | Czy kolumna wchodzi w wyszukiwanie tekstowe (tylko `type: text`)                                                       |
| `options`    | Lista wartości dla filtra statusu (kolumna `status`)                                                                   |
| `action`     | Rodzaj akcji wiersza (np. `edit`) - używane z `type: action`                                                           |

Tabela w UI nie ma wpisanej listy kolumn - bierze wyłącznie tablicę z JSON.

### Wiersze (`rows.json` -> `ApplicationRow`)

Każdy wiersz to m.in. pola biznesowe (`loanId`, `customerName`, `status`, `market`, `monthlyRate`, `updatedAt`) oraz `permissions` (np. `canEdit: boolean`). Dostępność przycisku akcji wynika z `permissions[column.key]`, nie z samego metadanymi kolumny.

### Przepływ w aplikacji

1. **Fetch** wierszy -> stany `loading` / `success` / `empty` / `error`
2. **Filter** (`filterApplications`) - status (dokładne dopasowanie) + search po kolumnach `filterable` + `text`
3. **Sort** (`sortApplications`) - według `column.type`; brakujące wartości zawsze na końcu listy
4. **Render** - `TableDataCell` mapuje `type` na format (tekst, data `pl-PL`, kwota, badge, przycisk akcji)

Wyszukiwanie ma debounce (300 ms) w toolbarze; filtrowanie w `startTransition`, żeby nie blokować wpisywania przy dużej liście.

## Decyzje techniczne

- **Vite + React + TypeScript** - prosty setup.
- **Tailwind CSS v4** (`@tailwindcss/vite`) - style utility bez osobnego `tailwind.config`.
- **Warstwy** - `components/` (UI, atomic design), `features/` (hooki: fetch, widok tabeli), `lib/` (czysta logika: filter, sort, format), `types/` (kontrakty współdzielone).
- **Vitest + Testing Library** - logika w `lib/*.test.ts`, zachowanie UI w `*.test.tsx` (np. akcje, sort w nagłówku); setup w `vitest.setup.ts`.
- **Optymalizacja renderów** - stan search w `TableToolbar`, `memo` na wierszach/tabeli, `useCallback` dla handlerów;

### ESLint, Prettier, lint-staged, Husky

| Narzędzie       | Po co                                                                                                    |
| --------------- | -------------------------------------------------------------------------------------------------------- |
| **ESLint**      | Wyłapywanie błędów i podejrzanych wzorców w TS/React przed reviewem                                      |
| **Prettier**    | Jednolity format bez dyskusji o stylu w PR                                                               |
| **lint-staged** | Lint + format tylko na plikach ze stage’a - szybki commit, bez przeformatowania całego repo              |
| **Husky**       | Uruchomienie lint-staged przy `git commit` - reguły działają automatycznie, nie zależą od pamięci autora |

## Struktura projektu

```
src/
  data/              # columns.json
  components/        # atoms -> templates (ApplicationsTablePanel)
  features/
    applications/    # useApplicationsData, useApplicationsTableView
  lib/               # filterApplications, sortApplications, formatCellValue, …
  types/             # column, applicationRow, applicationView, sort
public/data/         # rows.json
vitest.setup.ts
```

## Testy (skrót)

- **Logika / filtrowanie:** `filterApplications.test.ts`, `useApplicationsTableView.test.ts`
- **Sortowanie / akcje:** `sortApplications.test.ts`, `rowActions.test.ts`
- **Render:** `TableDataCell.test.tsx`, `TableHeadCell.test.tsx`

## Co zrobiłbym dalej (60–90 min)

1. **Wirtualizacja lub paginacja** — przy pełnej liście kilku tysięcy wierszy DOM jest wąskim gardłem; `@tanstack/react-virtual` albo stronicowanie po przefiltrowanych danych, żeby renderować tylko widoczne wiersze.
2. **Query params** — trzymanie `search`, `status`, `sortKey`, `sortDirection` w URL (`useSearchParams`), żeby filtry i sort dało się udostępnić linkiem i odświeżyć stronę bez utraty widoku.
