# AyurMantra Digital Platform

A production-grade, dynamic clinic management platform for AyurMantra - an Ayurvedic wellness center. Built with Next.js, NestJS, PostgreSQL, and Prisma.

## System Components

| Component | Technology | Port |
|-----------|------------|------|
| Public Website | Next.js 14 | 2900 |
| Patient Portal | Next.js 14 | 2800 |
| Admin Panel | Next.js 14 | 2700 |
| Backend API | NestJS | 2600 |
| Database | PostgreSQL 16 | 5432 |

## Features

### Public Website
- SEO-optimized homepage with dynamic content
- Treatment catalog with booking integration
- Blog with categories and search
- Product showcase
- Contact form with WhatsApp integration
- Gallery and testimonials

### Patient Portal
- User registration and login (JWT)
- Appointment management
- Medical records viewing
- Prescription downloads
- Profile management

### Admin Panel
- Dashboard with analytics
- Patient management
- Appointment calendar
- Content management system (CMS)
- Treatment and product management
- Blog editor with SEO tools
- Media library
- Role-based access control

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Framer Motion
- React Hook Form + Zod

### Backend
- NestJS
- TypeScript
- Prisma ORM
- JWT Authentication
- Swagger Documentation

### Database
- PostgreSQL
- Prisma Schema

## Quick Start

### Prerequisites
- Node.js 18+
- pnpm (package manager)
- Docker (optional)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ayurmantra-platform
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Set up the database:
```bash
cd packages/database
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

5. Start development servers:
```bash
# Start all apps
cd ../..
pnpm dev

# Or start individually:
pnpm --filter @ayurmantra/api dev
pnpm --filter @ayurmantra/web dev
```

### Docker Deployment

```bash
docker-compose up -d
```

## Project Structure

```
ayurmantra-platform/
├── apps/
│   ├── web/              # Public Website
│   ├── patient-portal/   # Patient Portal
│   └── admin-panel/      # Admin Dashboard
├── packages/
│   ├── api/              # NestJS Backend API
│   ├── database/         # Prisma Schema & Client
│   ├── ui/               # Shared UI Components
│   ├── auth/             # Authentication Utilities
│   └── config/           # Shared Configuration
├── docker-compose.yml
└── README.md
```

## Default Credentials

After running `pnpm db:seed`:

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@ayurmantra.com | admin123 |
| Doctor | doctor@ayurmantra.com | admin123 |

## API Documentation

Once the API is running, access Swagger docs at:
```
http://localhost:4000/api/docs
```

## Scripts

```bash
# Development
pnpm dev              # Start all apps in development
pnpm build            # Build all apps
pnpm lint             # Lint all apps

# Database
cd packages/database
pnpm db:generate      # Generate Prisma client
pnpm db:migrate       # Run migrations
pnpm db:push          # Push schema changes
pnpm db:studio        # Open Prisma Studio
pnpm db:seed          # Seed database
```

## License

Private - All rights reserved.
