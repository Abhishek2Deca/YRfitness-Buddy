# YRfitness-Buddy

A beginner-friendly gym guide built with React, Vite, and Tailwind CSS. Explore muscle groups, find exercises with safe-form tips, follow starter routines, and learn the basics of nutrition, supplements, and gym etiquette, all in one place.

## Features

- **3D Anatomy Explorer** – browse muscle groups and see the exercises and variations for each one
- **Exercise Search** – quickly find any muscle or exercise
- **Beginner Routines** – ready-made starter workout plans with progress tracking
- **Nutrition & Diet Plans** – simple meal plan guidance for common goals
- **Supplements Guide** – a plain-language overview of common supplements
- **Gym Etiquette 101** – unwritten gym rules for newcomers
- **Coach Modal** – answers to common beginner questions (busy machines, starting weight, muscle soreness)

## Tech Stack

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Motion](https://motion.dev/) for animations
- [Lucide React](https://lucide.dev/) for icons

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer (20+ recommended)
- npm (included with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR-USERNAME/YRfitness-Buddy.git

# 2. Go into the project folder
cd YRfitness-Buddy

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open **http://localhost:3000** in your browser.

> If `npm install` fails with an `ERESOLVE` error, run `npm install --legacy-peer-deps`.

## Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start the dev server on port 3000        |
| `npm run build`   | Create an optimized production build     |
| `npm run preview` | Preview the production build locally     |
| `npm run lint`    | Type-check the project with TypeScript   |

## Project Structure

```
YRfitness-Buddy/
├── index.html
├── package.json
├── vite.config.ts
└── src/
    ├── App.tsx                 # Main layout and navigation
    ├── main.tsx                # App entry point
    ├── index.css               # Tailwind theme and styles
    ├── components/
    │   ├── AnatomyExplorer.tsx
    │   ├── BeginnerRoutinesView.tsx
    │   ├── NutritionPlansView.tsx
    │   ├── SupplementsGuideView.tsx
    │   ├── GymEtiquetteView.tsx
    │   └── CoachModal.tsx
    └── data/
        ├── anatomyData.ts      # Muscle group data
        └── exerciseDatabase.ts # Exercise data
```

## Environment Variables

No API key is required to run the app. The `.env.example` file is a leftover from the AI Studio template; if you add AI features later, copy it to `.env.local` and set `GEMINI_API_KEY`.

## Deployment

The app is a static site and can be hosted for free on [Vercel](https://vercel.com/) or [Netlify](https://netlify.com/):

- **Build command:** `npm run build`
- **Output directory:** `dist`

## Disclaimer

This project is for educational purposes only and is not medical or nutritional advice. Consult a qualified professional before starting any new exercise or diet program.

## License

MIT License. Free to use and modify.
