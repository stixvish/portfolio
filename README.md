# Portfolio

Personal portfolio website built with Next.js, featuring real-time integrations and a dynamic image gallery.

## Features

- **Live integrations** — Spotify (now playing), Steam (current/last game), and Letterboxd (last watched film)
- **Dynamic background gallery** — 3 random images served from Cloudflare R2 on each visit
- **Responsive design** — Mobile-friendly header with dropdown navigation
- **Performance monitoring** — Vercel Analytics and Speed Insights

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19
- TypeScript + Tailwind CSS 4
- Cloudflare R2 (image storage, served via `images.stixvish.com`)
- AWS SDK v3 (Cloudflare R2 S3-compatible API)
- Vercel (deployment)

## Getting Started

### Prerequisites

Create a `.env.local` file in the project root with the following variables:

```env
# Spotify
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=

# Steam
STEAM_API_KEY=

# Cloudflare R2
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
```

**Getting Spotify credentials:** Create an app at [Spotify Developer Dashboard](https://developer.spotify.com/dashboard), then follow any OAuth refresh token guide to obtain a refresh token with `user-read-currently-playing` and `user-read-recently-played` scopes.

**Getting a Steam API key:** Generate one at [steamcommunity.com/dev/apikey](https://steamcommunity.com/dev/apikey).

**Cloudflare R2:** Create a bucket and generate an API token with read/write access from the [Cloudflare dashboard](https://dash.cloudflare.com).

### Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
  app/
    api/
      spotify/     # Now playing / last played track
      steam/       # Current / last played game
      letterboxd/  # Last watched film (RSS)
    about/         # About page with live integrations
    experience/    # Work and education history
    projects/      # Projects showcase
    page.tsx       # Home page with background gallery
  components/
    Header.tsx         # Navigation with mobile dropdown
    Integrations.tsx   # Spotify / Steam / Letterboxd widgets
    RandomGallery.tsx  # Cloudflare R2 image gallery
```
