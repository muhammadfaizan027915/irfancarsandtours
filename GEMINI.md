# Irfan Cars & Tours - Project Documentation

This document outlines the architecture, conventions, and workflows for the Irfan Cars & Tours project.

## Project Overview

Irfan Cars & Tours is a comprehensive platform for booking cars and tours. It is built as a monorepo using Turborepo to manage multiple packages and applications efficiently.

## Architecture & Directory Structure

The project follows a modular architecture, separating concerns into distinct packages:

### Folder Structure Overview

```text
irfancarsandtours/
├── apps/
│   └── web/                 # Main Next.js application
├── packages/
│   ├── contracts/           # Zod schemas, DTOs, interfaces
│   ├── database/            # Drizzle schema and migrations
│   ├── repositories/        # Database access layer
│   ├── services/            # Business logic layer
│   ├── features/            # High-level UI features (complex components)
│   ├── ui/                  # Shared primitive UI components (shadcn/radix)
│   └── lib/                 # Shared utilities, auth, handlers
├── docker/                  # Dockerfiles (dev, web, migrate)
├── nginx/                   # Nginx configuration
├── .env.docker              # Dev Docker DATABASE_URL override (committed)
├── compose.dev.yaml         # Dev stack: database + web
└── compose.yaml             # Production stack: database, migrate, web, proxy (+ certbot)
```

### Applications

- `apps/web`: The main Next.js (App Router) application. It contains routes, server actions, and application-specific logic.

### Packages

- `packages/contracts`: Defines the interface between layers. Contains Zod schemas and DTOs (Data Transfer Objects) for requests and responses.
- `packages/database`: Manages the database schema and migrations using Drizzle ORM.
- `packages/repositories`: Data access layer. Handles all direct interactions with the database.
- `packages/services`: Business logic layer. Orchestrates repositories and applies business rules.
- `packages/features`: Reusable UI features and complex components. See [Feature Component Management](#feature-component-management).
- `packages/ui`: Shared primitive UI components, typically built on Radix UI and styled with Tailwind CSS (Shadcn UI).
- `packages/lib`: Shared utilities, authentication logic (NextAuth), custom hooks, and error handling decorators.

## Feature Component Management

Components within `packages/features` follow a strict organizational pattern to ensure modularity and maintainability:

### Internal Feature Structure

Each feature is housed in its own directory within `packages/features/src/[feature-name]`. A typical feature directory looks like this:

```text
[feature-name]/
├── [feature-name].tsx           # Main component (PascalCase)
├── [feature-name].types.ts      # TypeScript interfaces and types
├── [feature-name].constants.ts  # Static constants or configurations (optional)
├── index.ts                     # Entry point (exports main component and types)
└── components/                  # Internal sub-components (if needed)
    └── [sub-component]/
        ├── [sub-component].tsx
        └── index.ts
```

### Conventions

1. **Isolation:** Features should be as self-contained as possible. If a sub-component is only used within a specific feature, it should stay inside that feature's directory.
2. **Naming:** Files use **kebab-case** (e.g., `user-dashboard.tsx`), but the exported components use **PascalCase**.
3. **Entry Points:** Every feature directory must have an `index.ts` file that explicitly exports what should be visible to other parts of the monorepo.
4. **Data Fetching:** Features can use hooks or accept data as props. If they perform mutations, they should typically call Server Actions from the `apps/web` layer (passed as props or imported if appropriate).
5. **Complexity:** If a feature grows too large, it should be broken down into sub-directories (e.g., `dashboard/tables`, `dashboard/forms`).

## Tech Stack

- **Framework:** Next.js (App Router, React 19)
- **Language:** TypeScript
- **Monorepo Tooling:** Turborepo
- **Database ORM:** Drizzle ORM
- **Database:** PostgreSQL (implied)
- **Authentication:** NextAuth.js (v5 beta)
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI / Shadcn UI
- **Form Validation:** Zod
- **State Management:** React Context (e.g., `CarCartProvider`)

## Development Workflows

### Environment files


| File          | Used by                                                                 | Purpose                                                                                      |
| ------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `.env.dev`    | `compose.dev.yaml`, `npm run dev`, `npm run env:dev`                    | Local development: Postgres credentials and `DATABASE_URL` with `localhost` for host/CLI     |
| `.env.prod`   | `compose.yaml`, `npm run build`, `npm run env:prod`, `Dockerfile.web`   | Production secrets, Postgres credentials, auth, GCS, certbot, etc.                         |
| `.env.docker` | `compose.dev.yaml` (`web` service only)                                 | Committed override: sets `DATABASE_URL` to host `database` inside the dev Docker stack       |


Example `.env.dev`:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
POSTGRES_DB=irfancarsandtours
DATABASE_URL=postgresql://postgres:your-secure-password@localhost:5432/irfancarsandtours
NEXTAUTH_SECRET=...
GCS_BUCKET_NAME=...
GCS_PROJECT_ID=...
GCS_CLIENT_EMAIL=...
GCS_PRIVATE_KEY=...
```

Example `.env.prod` (add `CERT_*` when enabling certbot):

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
POSTGRES_DB=irfancarsandtours
DATABASE_URL=postgresql://postgres:your-secure-password@database:5432/irfancarsandtours
NEXTAUTH_SECRET=...
GCS_BUCKET_NAME=...
GCS_PROJECT_ID=...
GCS_CLIENT_EMAIL=...
GCS_PRIVATE_KEY=...
CERT_EMAIL=...
CERT_DOMAIN=...
CERT_DOMAIN_WWW=...
```

`.env.dev` and `.env.prod` are gitignored—create them locally before building images or starting Docker. `.env.docker` is committed; keep its Postgres credentials in sync with `.env.dev`.

**Host vs container:** Inside a container, `localhost` is not Postgres. Production `.env.prod` uses the Compose service name `database` in `DATABASE_URL`. For dev Docker, `.env.dev` keeps `localhost` for CLI use while `.env.docker` overrides `DATABASE_URL` on the `web` service only.

**Automatic loading:**

- **Docker Compose** — each service uses `env_file`; no `--env-file` flag required. Healthchecks and certbot use `$$VAR` so values are read from the container environment at runtime.
- **npm scripts** — `dev` and `build` wrap Turbo with `dotenv-cli` automatically.
- **Drizzle** — `packages/database/load-env.ts` loads `.env.dev` when `NODE_ENV=development`, otherwise `.env.prod`. It does not override variables already set (e.g. by Docker Compose).

### Environment-specific commands

| Script                       | Env file    | Typical use                                                     |
| ---------------------------- | ----------- | --------------------------------------------------------------- |
| `npm run dev`                | `.env.dev`  | Start all apps via Turbo (loads env automatically)            |
| `npm run build`              | `.env.prod` | Build all packages and apps (loads env automatically)           |
| `npm run env:dev -- <task>`  | `.env.dev`  | Run any Turbo task with dev env (e.g. Drizzle `generate`)       |
| `npm run env:prod -- <task>` | `.env.prod` | Run any Turbo task with prod env                                |
| `npm run docker:up`          | `.env.prod` | `docker compose up` (prod stack)                                |
| `npm run docker:dev`         | `.env.dev`  | `docker compose -f compose.dev.yaml up`                         |

### Database management

Run from the repo root. Start the dev database first if using local Docker:

```bash
npm run docker:dev
# or: docker compose -f compose.dev.yaml up
```

Drizzle loads env via `load-env.ts`. For local CLI against Docker Postgres on `localhost`, use:

- Generate migrations: `npm run env:dev -- generate`
- Push schema changes: `npm run env:dev -- push`
- Run migrations: `npm run env:dev -- migrate`
- Open Drizzle Studio: `npm run env:dev -- studio`

Use `npm run env:prod -- <task>` when running Drizzle or other Turbo tasks against production from your machine (e.g. over an SSH tunnel—set `DATABASE_URL` to the reachable host in `.env.prod`). The production Docker stack runs migrations automatically via the `migrate` service in `compose.yaml`.

### Docker support

#### Development (`compose.dev.yaml`)

Start the full dev stack (database + Next.js):

```bash
npm run docker:dev
# or: docker compose -f compose.dev.yaml up
```

| Service    | Role                                                                                                               |
| ---------- | ------------------------------------------------------------------------------------------------------------------ |
| `database` | PostgreSQL (`postgres:latest`), port `5432` on the host, `env_file: .env.dev`, volume `irfancarsandtours_postgres_db_dev` |
| `web`      | Next.js dev server on port `3000`, hot-reload via bind mount, built from `docker/Dockerfile.dev`                   |

Both services join the `backend_database` bridge network. `web` waits for `database` to pass its healthcheck.

**Env wiring in dev:**

- `database` — `env_file: .env.dev` (`POSTGRES_*`; `DATABASE_URL` in the file is not used by Postgres itself).
- `web` — `env_file: [.env.dev, .env.docker]` (later file overrides `DATABASE_URL` for the Docker network), plus `environment`:
  - `WATCHPACK_POLLING=true` (file watching in Docker on Windows)
  - `NODE_ENV=development`
- `Dockerfile.dev` — runs `npm run dev`; env vars are injected by Compose (no manual dotenv in the container CMD).

#### Production (`compose.yaml`)

Create `.env.prod` on the server, then start the stack:

```bash
npm run docker:up
# or: docker compose up
```

No `--env-file` flag is needed—each service declares `env_file: .env.prod`.

| Service    | Role                                                                                            |
| ---------- | ----------------------------------------------------------------------------------------------- |
| `database` | PostgreSQL; no host port published; `env_file: .env.prod`; volume `irfancarsandtours_postgres_db` |
| `migrate`  | Runs `drizzle-kit migrate` once via `docker/Dockerfile.migrate`; `env_file: .env.prod`          |
| `web`      | Next.js production app (`docker/Dockerfile.web`); `env_file: .env.prod` at runtime               |
| `proxy`    | Nginx on ports `80` / `443`                                                                     |
| `certbot`  | Let's Encrypt (commented out in `compose.yaml`; uncomment when ready; needs `CERT_*` in `.env.prod`) |

Startup order: `database` (healthy) → `migrate` (exits successfully) → `web` → `proxy` (and `certbot` when enabled). DB-related services use `backend_database`; `web` and `proxy` also use `frontend_backend`.

**Production env wiring:**

- `database`, `migrate`, `web`, `certbot` — `env_file: .env.prod`
- Healthchecks use `$$POSTGRES_USER` / `$$POSTGRES_DB` (resolved inside the container from `env_file`)
- `Dockerfile.web` — copies `.env.prod` at build time and runs `npm run build`; the final runner image does not include the file—runtime vars come from Compose
- `Dockerfile.migrate` — no env file copied; runtime vars come from Compose only
- `DATABASE_URL` in `.env.prod` must use host `database` (not `localhost`) for `web` and `migrate` containers

Ensure `.env.prod` exists on the build host before `docker compose build` (required by `Dockerfile.web`).

### Running the project locally

| Command            | Description                                              |
| ------------------ | -------------------------------------------------------- |
| `npm run dev`      | Start all apps via Turbo (auto-loads `.env.dev`)         |
| `npm run build`    | Build all packages and apps (auto-loads `.env.prod`)   |
| `npm run lint`     | Lint the monorepo                                        |
| `npm run clean`    | Remove build artifacts                                   |
| `npm run docker:dev` | Dev Docker stack (database + web)                    |
| `npm run docker:up`  | Production Docker stack                                |

For Drizzle and other Turbo tasks, use `npm run env:dev -- <task>` or `npm run env:prod -- <task>` (see [Database management](#database-management)).

## Coding Conventions

### File Naming

- Use **kebab-case** for directories and files (e.g., `user-profile.tsx`, `auth-service.ts`).
- React components should use **PascalCase** for the component name within the file (e.g., `export function UserProfile() {}`).

### Patterns

- **Repository/Service Pattern:** Always wrap database access in a Repository and business logic in a Service.
- **Server Actions:** Use Server Actions for data mutations in the Next.js app. Decorate them with `handlerFormActionWithError` or `handleServerActionWithError` from `@icat/lib` for consistent error handling.
- **Contracts:** Use Zod schemas from `@icat/contracts` for both client-side and server-side validation.

### Styling

- Prefer **Tailwind CSS** for styling.
- Use shared components from `@icat/ui` whenever possible to maintain visual consistency.

### Error Handling

- Use the provided decorators in `@icat/lib` to handle errors in Server Actions and API handlers.
- Return consistent error structures to the frontend.

## Core Concepts

### Authentication

- Authentication is handled by NextAuth.js.
- Configuration and helpers are located in `packages/lib/src/auth`.

### Data Flow

1. **Frontend:** User interacts with a component in `packages/features` or `apps/web`.
2. **Action:** A Server Action in `apps/web/src/actions` is triggered.
3. **Service:** The action calls a method in a Service (`packages/services`).
4. **Repository:** The service calls a Repository (`packages/repositories`).
5. **Database:** The repository executes a query using Drizzle ORM (`packages/database`).
6. **Response:** Data flows back up through the layers, usually validated against a Contract (`packages/contracts`).

