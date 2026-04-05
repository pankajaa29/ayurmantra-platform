# Database Setup Guide for Ayurmeda

This guide will walk you through setting up PostgreSQL database for the Ayurmeda platform.

## Prerequisites

1. **PostgreSQL 14+** installed on your system
2. **Node.js 18+** and **pnpm** installed
3. Project dependencies already installed (`pnpm install`)

## Step 1: Install PostgreSQL (if not already installed)

### Option A: Download PostgreSQL Installer
1. Go to: https://www.postgresql.org/download/windows/
2. Download PostgreSQL 16 installer
3. Run the installer with default settings
4. Remember the password you set for the `postgres` user

### Option B: Use Docker (Easier)
```bash
# Run PostgreSQL in Docker
docker run --name ayurmeda-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=ayurmeda -p 5432:5432 -d postgres:16
```

## Step 2: Create the Database

### Using pgAdmin (GUI):
1. Open pgAdmin (comes with PostgreSQL installation)
2. Connect to your PostgreSQL server
3. Right-click on "Databases" → "Create" → "Database"
4. Name it: `ayurmeda`
5. Click "Save"

### Using Command Line:
```bash
# Open psql (PostgreSQL command line)
psql -U postgres

# Create database
CREATE DATABASE ayurmeda;

# Exit
\q
```

## Step 3: Configure Environment Variables

The `.env` file at the project root should already have:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ayurmeda?schema=public"
```

**If your PostgreSQL password is different**, update the connection string:
- Format: `postgresql://USERNAME:PASSWORD@localhost:5432/ayurmeda?schema=public`
- Example with password "admin123": `postgresql://postgres:admin123@localhost:5432/ayurmeda?schema=public`

## Step 4: Install Database Dependencies

```bash
cd packages/database
pnpm install
```

## Step 5: Generate Prisma Client

```bash
pnpm db:generate
```

This generates the Prisma Client based on your schema.

## Step 6: Run Database Migrations

```bash
pnpm db:migrate
```

When prompted, give your migration a name like: `init`

This creates the database tables based on the schema.

## Step 7: Seed the Database

```bash
pnpm db:seed
```

This populates the database with:
- Default roles (SUPER_ADMIN, ADMIN, DOCTOR, STAFF, PATIENT)
- Default admin user
- Default doctor user
- Sample treatments
- Sample products
- Sample blog posts
- Sample testimonials
- CMS pages

## Step 8: Verify Database Setup

### Option A: Using Prisma Studio (GUI)
```bash
pnpm db:studio
```
This opens a web interface at http://localhost:5555 where you can view and edit data.

### Option B: Check with psql
```bash
psql -U postgres -d ayurmeda -c "\dt"
```
You should see a list of tables like: users, patients, doctors, treatments, appointments, etc.

## Default Login Credentials

After seeding, you can log in with:

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@ayurmeda.com | admin123 |
| Doctor | doctor@ayurmeda.com | admin123 |

## Troubleshooting

### Error: "Database does not exist"
Make sure you created the database named `ayurmeda` (Step 2).

### Error: "Authentication failed"
Check your `.env` file and ensure the password in `DATABASE_URL` matches your PostgreSQL password.

### Error: "Prisma schema not found"
Run `pnpm db:generate` again from the `packages/database` directory.

### Error: "Port already in use"
Make sure PostgreSQL is running and port 5432 is not blocked by another application.

## Next Steps

Once database is set up:
1. Start the backend API: `pnpm --filter @ayurmantra/api dev`
2. Start the web frontend: `pnpm --filter @ayurmantra/web dev`
3. Access the site at http://localhost:2900

## Useful Commands

```bash
# Reset database (WARNING: Deletes all data!)
pnpm db:push --force-reset

# Create a new migration after schema changes
pnpm db:migrate

# View database in browser
pnpm db:studio

# Seed database again
pnpm db:seed
```

## Database Schema Overview

The database includes tables for:
- **Users & Authentication** (users, roles, permissions)
- **Patient Management** (patients, medical_records, prescriptions)
- **Appointments** (appointments, doctor_time_slots)
- **Treatments** (treatments, treatment_categories)
- **Products** (products, product_categories)
- **Content Management** (blog_posts, cms_pages, media)
- **System** (settings, audit_logs, notifications)

## Support

If you encounter issues:
1. Check PostgreSQL is running: `services.msc` → Look for "postgresql"
2. Verify connection string in `.env`
3. Check the terminal output for specific error messages
