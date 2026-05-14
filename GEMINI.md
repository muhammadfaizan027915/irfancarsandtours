# Irfan Cars & Tours - Project Documentation

This document outlines the architecture, conventions, and workflows for the Irfan Cars & Tours project.

## Project Overview
Irfan Cars & Tours is a comprehensive platform for booking cars and tours. It is built as a monorepo using Turborepo to manage multiple packages and applications efficiently.

## Architecture & Directory Structure

The project follows a modular architecture, separating concerns into distinct packages:

### Folder Structure Overview
```text
D:\irfancarsandtours\
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
├── docker/                  # Dockerfiles for various environments
└── nginx/                   # Nginx configuration
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
1.  **Isolation:** Features should be as self-contained as possible. If a sub-component is only used within a specific feature, it should stay inside that feature's directory.
2.  **Naming:** Files use **kebab-case** (e.g., `user-dashboard.tsx`), but the exported components use **PascalCase**.
3.  **Entry Points:** Every feature directory must have an `index.ts` file that explicitly exports what should be visible to other parts of the monorepo.
4.  **Data Fetching:** Features can use hooks or accept data as props. If they perform mutations, they should typically call Server Actions from the `apps/web` layer (passed as props or imported if appropriate).
5.  **Complexity:** If a feature grows too large, it should be broken down into sub-directories (e.g., `dashboard/tables`, `dashboard/forms`).

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

### Database Management
- Generate migrations: `npm run db:generate`
- Push schema changes (for development): `npm run db:push`
- Run migrations: `npm run db:migrate`
- Open Drizzle Studio: `npm run db:studio`

### Docker Support

The project uses Docker to manage the database and other services.

#### Development (Full Stack)
To start the entire development environment (Database + Next.js App):
```bash
docker compose -f compose.dev.yml up -d
```
This will:
- Start a PostgreSQL container (`postgres-db-dev`) on port `5432`.
- Start the Next.js development server (`icat-web-dev`) on port `3000`.
- Mount your local source code into the container for hot-reloading.

#### Production / Full Stack
To run the entire production stack (Database, Migrations, Web App, Nginx Proxy, Certbot):
```bash
docker compose up -d
```
*Note: Ensure your `.env` file is properly configured before running either stack.*

### Running the Project Locally
- Development mode: `npm run dev`
- Build the project: `npm run build`
- Lint the codebase: `npm run lint`

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
