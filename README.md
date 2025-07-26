# React + TypeScript + Vite + Tailwind CSS Boilerplate

A modern React development boilerplate with TypeScript, Vite, and Tailwind CSS v4.

## ✨ Features

- **React 19** with TypeScript support
- **Vite** for fast development and building
- **Tailwind CSS v4** with the new Vite plugin
- **SWC** for fast TypeScript compilation
- **ESLint** with React and TypeScript rules
- **React Icons** for icon components
- **Lodash** utilities included
- Path aliases configured (`@/` for root directory)

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd rtv-base
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local development URL (typically `http://localhost:5173`)

## 📁 Project Structure

```
rtv-base/
├── src/
│   ├── App.tsx          # Main App component
│   ├── index.tsx        # React app entry point
│   └── index.css        # Global styles with Tailwind imports
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── README.md           # This file
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🎨 Styling

This project uses Tailwind CSS v4 with the new Vite plugin for styling. The configuration is automatically handled through the Vite plugin.

Global styles are defined in `src/index.css`.

## 🔧 Configuration

### Path Aliases

The project is configured with path aliases:
- `@/` - Points to the root src directory

### TypeScript

TypeScript is configured with strict mode enabled and includes:
- React JSX support
- ES2020 target
- Strict type checking
- Unused variable detection

## 🚀 Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

To preview the production build locally:

```bash
npm run preview
```

## 📦 Dependencies

### Main Dependencies
- React 19 + React DOM
- Tailwind CSS v4
- React Icons
- Lodash

### Development Dependencies
- Vite with SWC plugin
- TypeScript
- ESLint with React plugins
- Type definitions

## 🤝 Contributing

Feel free to submit issues and pull requests to improve this boilerplate.

## 📄 License

This project is open source and available under the MIT License.
