# CLAUDE.md — saas-timer-invoice

Guidance for AI assistants working in this repository.

---

## Project Overview

**saas-timer-invoice** is a SaaS application for time tracking and invoice generation. It is a mobile-first Progressive Web App (PWA) with a Dutch-language UI ("Timer & Facturen").

- **Frontend:** Next.js 16 + React 19 + TypeScript + Tailwind CSS 4 (in `frontend/`)
- **Backend:** Go 1.24 REST API using only the standard library (in `cmd/` and `internal/`)
- **Target deployment:** Frontend → Vercel; Backend → any Go-capable platform

---

## Repository Structure

```
saas-timer-invoice/
├── cmd/
│   └── server/
│       └── main.go          # Go server entry point
├── internal/
│   ├── handler/
│   │   ├── routes.go        # HTTP route registration
│   │   ├── timer.go         # Timer HTTP handlers
│   │   └── invoice.go       # Invoice HTTP handlers
│   ├── model/
│   │   ├── timer.go         # Timer struct (ID, UserID, Description, StartedAt, StoppedAt, DurationSec)
│   │   └── invoice.go       # Invoice + LineItem structs
│   └── service/
│       ├── timer.go         # TimerService interface
│       └── invoice.go       # InvoiceService interface
├── frontend/
│   ├── app/
│   │   ├── layout.tsx       # Root layout (metadata, PWA, BottomNav)
│   │   ├── page.tsx         # Home dashboard
│   │   ├── globals.css      # Tailwind v4 global styles
│   │   ├── timer/
│   │   │   └── page.tsx     # Timer start/stop + session history (client component)
│   │   └── invoices/
│   │       └── page.tsx     # Invoice creation + list (client component)
│   ├── components/
│   │   ├── BottomNav.tsx    # Fixed bottom navigation (client component)
│   │   └── ServiceWorkerRegistration.tsx  # PWA service worker registration
│   ├── public/
│   │   ├── manifest.json    # PWA manifest
│   │   └── sw.js            # Service worker (cache-first strategy)
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── postcss.config.mjs
│   ├── eslint.config.mjs
│   ├── vercel.json
│   └── package.json
├── go.mod                   # module: github.com/bouchraelamrani963-web/saas-timer-invoice
└── README.md
```

---

## Development Commands

### Frontend (run from `frontend/`)

```bash
npm run dev      # Start dev server on http://localhost:3000
npm run build    # Production build
npm start        # Serve production build
npm run lint     # Run ESLint
```

### Backend (run from repo root)

```bash
go run ./cmd/server          # Start API server on :8080 (or $PORT)
go build ./...               # Build all packages
go vet ./...                 # Static analysis
go test ./...                # Run tests (none yet)
```

---

## Tech Stack Details

### Frontend

| Tool | Version | Notes |
|------|---------|-------|
| Next.js | 16.2.2 | App Router; **read `node_modules/next/dist/docs/` before writing code — breaking changes from prior versions** |
| React | 19.2.4 | Concurrent features available |
| TypeScript | 5 | Strict mode enabled |
| Tailwind CSS | 4 | Uses `@import "tailwindcss"` (not `@tailwind base/components/utilities`) |
| ESLint | 9 | Flat config format (`eslint.config.mjs`) |

**Path aliases:** `@/*` resolves to `frontend/` root (configured in `tsconfig.json`).

**Next.js 16 / Tailwind 4 warnings:**
- Tailwind v4 uses `@import "tailwindcss"` in CSS — do NOT use v3 directives.
- Next.js 16 may have API differences from training data. Check `/node_modules/next/dist/docs/` when in doubt.
- `postcss.config.mjs` uses `@tailwindcss/postcss` plugin — do not switch to the old tailwindcss postcss plugin.

### Backend (Go)

- Standard library only (`net/http`, `encoding/json`, `log`, `os`, `time`)
- No external web framework — routes registered via `http.ServeMux`
- Go 1.24 method-based route matching syntax: `"GET /api/v1/timers"`
- Module: `github.com/bouchraelamrani963-web/saas-timer-invoice`

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check → `{"status":"ok"}` |
| GET | `/api/v1/timers` | List timers (returns `[]`) |
| POST | `/api/v1/timers` | Create timer |
| GET | `/api/v1/invoices` | List invoices (returns `[]`) |
| POST | `/api/v1/invoices` | Create invoice |

**Default port:** `8080` (override with `PORT` env var).

---

## Data Models

### Timer (`internal/model/timer.go`)

```go
type Timer struct {
    ID          string     `json:"id"`
    UserID      string     `json:"user_id"`
    Description string     `json:"description"`
    StartedAt   time.Time  `json:"started_at"`
    StoppedAt   *time.Time `json:"stopped_at,omitempty"`
    DurationSec int64      `json:"duration_sec"`
}
```

### Invoice + LineItem (`internal/model/invoice.go`)

```go
type Invoice struct {
    ID         string     `json:"id"`
    UserID     string     `json:"user_id"`
    ClientName string     `json:"client_name"`
    Items      []LineItem `json:"items"`
    TotalCents int64      `json:"total_cents"`
    Currency   string     `json:"currency"`
    IssuedAt   time.Time  `json:"issued_at"`
    DueAt      time.Time  `json:"due_at"`
    PaidAt     *time.Time `json:"paid_at,omitempty"`
}

type LineItem struct {
    Description string `json:"description"`
    Quantity    int    `json:"quantity"`
    UnitCents   int64  `json:"unit_cents"`
}
```

**Convention:** Monetary values are always stored in **cents** (integer), never floats.

---

## Service Interfaces

Defined but not yet implemented. Any database or in-memory implementation must satisfy:

```go
// internal/service/timer.go
type TimerService interface {
    List(userID string) ([]model.Timer, error)
    Create(t model.Timer) (model.Timer, error)
    Stop(id string) (model.Timer, error)
}

// internal/service/invoice.go
type InvoiceService interface {
    List(userID string) ([]model.Invoice, error)
    Create(inv model.Invoice) (model.Invoice, error)
    MarkPaid(id string) (model.Invoice, error)
}
```

---

## Frontend Architecture

- **App Router** (`frontend/app/`): All pages use the Next.js App Router.
- **Client components** are explicitly marked `"use client"` — timer and invoices pages are client-only.
- **Server components** have no directive — the home page and layout are server components.
- **State management:** Currently React local state only. Data does not persist across page reloads (no backend integration yet).
- **Locale:** Dutch (`nl`). Date formatting uses `nl-NL` locale. Currency is EUR displayed via `Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" })`.

### Key Component Conventions

- `BottomNav` uses `usePathname()` for active link highlighting — must remain a client component.
- `ServiceWorkerRegistration` renders `null`; side-effect only.
- All pages are `max-w-lg mx-auto` centered with `p-6` padding.
- Bottom nav is fixed (`pb-20` on `<main>` prevents content being hidden behind it).

---

## PWA / Service Worker

- **Manifest:** `frontend/public/manifest.json` — app name "Timer & Facturen", theme `#2563eb`
- **Service worker:** `frontend/public/sw.js` — cache-first, precaches `/`, `/timer`, `/invoices`, `/manifest.json`
- **Cache name:** `timer-facturen-v1` — bump this string when assets change to force cache invalidation
- Registration happens in `ServiceWorkerRegistration.tsx` via `useEffect`

---

## What Is Not Yet Implemented

- **Database:** No persistence layer. Handlers return empty arrays. Implement `TimerService` / `InvoiceService` interfaces with a real store (Postgres recommended).
- **Authentication:** Models have `UserID` fields but no auth middleware exists. JWT or session auth must be added.
- **Frontend ↔ Backend integration:** Frontend uses local React state only. Wire up `fetch` calls to `NEXT_PUBLIC_API_URL`.
- **Testing:** No test files exist for frontend or backend.
- **CORS:** Not configured. Needed before frontend can call the Go API from a browser.
- **Invoice PDF export:** Not implemented.

---

## Environment Variables

| Variable | Where | Purpose |
|----------|-------|---------|
| `PORT` | Backend | Server listen port (default: `8080`) |
| `NEXT_PUBLIC_API_URL` | Frontend | Base URL of Go API (not yet wired up) |

---

## Deployment

- **Frontend:** Vercel. `frontend/vercel.json` configures `framework: nextjs`, `buildCommand: npm run build`, `outputDirectory: .next`.
- **Backend:** Any platform that can run a Go binary. Expose `$PORT`.

---

## Code Conventions

### Go
- Package names match directory names (`handler`, `model`, `service`)
- Handlers are unexported functions registered in `routes.go`
- All JSON responses set `Content-Type: application/json`
- Use `json.NewEncoder(w).Encode(...)` for responses
- Error responses use `http.Error(w, message, statusCode)`

### TypeScript / React
- Interfaces defined at the top of each file where they are used
- `crypto.randomUUID()` for generating client-side IDs
- Monetary values passed as cents (`unitCents: number`); formatted with `formatEuro(cents)`
- Duration values in seconds; formatted with `formatDuration(sec)` → `HH:MM:SS`
- Tailwind utility classes only — no custom CSS beyond `globals.css`

---

## Git Branches

| Branch | Contents |
|--------|---------|
| `main` | Initial commit only |
| `claude/go-setup-34zye` | Most complete — full frontend + Go backend scaffold |
| `claude/go-setup-wDUAa` | Earlier Go setup iteration |
| `claude/add-claude-documentation-zrQ0A` | Documentation branch (this file) |
| `claude/create-tradingview-indicator-GKQw8` | Experimental trading indicator work |
| `claude/monthly-cashflow-tracker-E2Gix` | Cashflow tracker experiment |

The authoritative development branch is `claude/go-setup-34zye`.
