# Angolo della — Cinematic Premium Website

Dark luxury agency website with Arabic (RTL) + German (LTR), cinematic animations, and a full admin CMS.

## Stack

- Next.js 16 (App Router) · React · TypeScript
- Tailwind CSS v4 · Framer Motion · Lenis
- next-intl · React Icons

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

- **Arabic site:** http://localhost:3000/ar
- **German site:** http://localhost:3000/de
- **Admin:** http://localhost:3000/admin/login (password: `admin123`)

## Admin routes

| Route | Description |
|-------|-------------|
| `/admin/login` | Authentication |
| `/admin/dashboard` | Overview |
| `/admin/projects` | Projects CRUD |
| `/admin/services` | Services CRUD |
| `/admin/media` | Gallery CRUD |
| `/admin/settings` | Site settings |

## Environment

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_PASSWORD=admin123
```

## Project structure

```
app/[locale]/     Public pages (ar, de)
app/admin/        Admin dashboard
app/api/          REST API + auth
components/       UI, sections, admin
lib/              i18n, data store, utils
messages/         ar.json, de.json
data/             JSON persistence (auto-seeded)
public/uploads/   Uploaded media
```
