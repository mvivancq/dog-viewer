# Dog Viewer

Simple React app that displays random dog images using the [Dog API](https://dog.ceo/dog-api/documentation). Built for the Turnitin coding assignment.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start dev server         |
| `npm run build`| Production build         |
| `npm run preview` | Preview production build |

## Project structure

```
src/
├── api/           # Dog API client (axios)
├── components/    # Reusable UI (main image, thumbnails, favorites)
├── hooks/         # Data & state hooks (gallery, favorites)
├── pages/         # Route-level pages (DogViewerPage)
├── types/         # Shared TypeScript types
└── utils/         # Constants, breed parsing, localStorage
```

Favorites are persisted in `localStorage` under the key `dog-viewer-favorites`.

## Tech stack

- React + TypeScript + Vite
- Tailwind CSS
- Axios + TanStack React Query
- React Router
- Dog API (`https://dog.ceo/api`)
# dog-viewer
