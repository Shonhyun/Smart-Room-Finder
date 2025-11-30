[3 tools called]

Eto na ang README na pwede mo i-copy at i-paste sa GitHub mo:

---

```markdown
# 🏫 Smart Room Finder

An interactive indoor navigation system for **Saint Benedict Hall** built with Next.js 16, featuring AR navigation and interactive floor plans.

![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)

## ✨ Features

- 🔍 **Room Search** – Quickly find computer labs, offices, and facilities
- 🗺️ **Interactive Floor Plans** – Browse detailed evacuation plans with clickable room markers
- 📱 **AR Navigation** – Marker-based augmented reality directions through your camera
- 🌙 **Dark/Light Mode** – Theme support via `next-themes`
- 📊 **Admin Dashboard** – Manage rooms, floors, paths, and settings

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI:** Tailwind CSS 4, Radix UI, shadcn/ui components
- **Animations:** Framer Motion
- **Database:** Supabase
- **Forms:** React Hook Form + Zod validation
- **Charts:** Recharts

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/Shonhyun/Smart-Room-Finder.git
cd Smart-Room-Finder

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/
│   ├── admin/          # Admin dashboard pages
│   ├── ar/             # AR navigation page
│   ├── map/            # Floor map pages (ground, 2nd, 3rd floor)
│   ├── room/[id]/      # Individual room details
│   └── page.tsx        # Home page
├── components/
│   ├── ui/             # Reusable UI components (shadcn/ui)
│   └── ...             # Feature components
├── lib/                # Utilities, Supabase client, dummy data
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
└── public/             # Static assets (maps, icons)
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

## 📄 License

This project is private and for educational purposes.

---

Made with ❤️ for Saint Benedict Hall
```

---

Para i-add yan sa repo mo:
1. Pumunta sa GitHub repo: https://github.com/Shonhyun/Smart-Room-Finder
2. Click **"Add a README"** o i-edit kung meron na
3. Paste ang content sa taas
4. Click **"Commit changes"**

O kaya locally, gumawa ka ng `README.md` file sa project folder mo, paste ang content, tapos:

```powershell
git add README.md
git commit -m "Add README"
git push
```
