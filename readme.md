
# irfancarsandtours

**A comprehensive platform for booking cars and tours with Irfan Cars And Tours.**

---

## Table of Contents

- [About](#about)
- [Architecture / Folder Structure](#architecture--folder-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Packages Overview](#packages-overview)
- [Contributing](#contributing)
- [License](#license)

---

## About

**irfancarsandtours** is a modern car and tour booking platform designed to provide a smooth, user-friendly, and scalable experience.  
It is built as a **monorepo** using a modular architecture that separates UI, business logic, and infrastructure code — ensuring clarity, maintainability, and reusability.

---

## Architecture / Folder Structure

```

irfancarsandtours/
│
├── apps/
│   └── web/                     # Next.js web frontend
│
├── packages/
│   ├── contracts/               # TypeScript types, DTOs, and API contracts
│   ├── database/                # ORM setup, migrations, and database models
│   ├── features/                # Next.js feature componets (built using UI components)
│   ├── lib/                     # Utility functions and shared helpers
│   ├── repositories/            # Database access layer (queries, data mappers)
│   ├── services/                # NestJS-style services: business logic
│   └── ui/                      # Shared UI component library (design system)
│
├── .gitignore
├── LICENSE
├── package.json
├── package-lock.json
├── tsconfig.base.json
└── turbo.json

````

---

## Packages Overview

| Package | Description |
|----------|-------------|
| **contracts** | Shared TypeScript types and data transfer objects (DTOs) used across backend and frontend. |
| **database** | Centralized database setup (e.g., Drizzle ORM / Prisma), schema definitions, and migrations. |
| **features** | Modular Next.js features — each built using reusable UI components. These represent pages or sections of the frontend. |
| **lib** | Shared utilities like hooks, error handlers, and utils. |
| **repositories** | Abstracted data access layer — responsible for CRUD operations and interacting with the database. |
| **services** | Inspired by NestJS — handle application logic. |
| **ui** | Shared, reusable UI components built with ShadCN/UI, Tailwind CSS, and icons. Used by `features` to compose the frontend. |

---

## Getting Started

### Prerequisites

- **Node.js** v20+  
- **npm** or **yarn**  
- A configured database (e.g., PostgreSQL)  
- Environment variables (`.env`) for API keys, DB connections, etc.

### Installation

```bash
# Clone the repository
git clone https://github.com/muhammadfaizan027915/irfancarsandtours.git
cd irfancarsandtours

# Install all dependencies (Turbo will handle monorepo dependencies)
npm install
````

### Running the App

```bash
# Run all apps in development
npm run dev

# Or run web app directly
cd apps/web
npm run dev
```

### Database Setup

```bash
cd packages/database
npm run migrate
npm run seed
```

---

## Development Notes

* `features` and `ui` are **frontend-focused** packages.
* `services`, `repositories`, and `database` are **backend or logic-focused**.
* `contracts` ensures **type safety** across all layers.
* The monorepo uses **TurboRepo** for efficient build and dependency caching.

---

## Contributing

Contributions are welcome!

1. Fork the repo
2. Create your branch (`git checkout -b feature/awesome-feature`)
3. Commit changes (`git commit -m "feat: add awesome feature"`)
4. Push to your branch (`git push origin feature/awesome-feature`)
5. Create a Pull Request

Please follow consistent code style, write descriptive commit messages, and test before submitting.

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

> Built with ❤️ using Next.js, TypeScript, and a modular monorepo architecture powered by TurboRepo.

