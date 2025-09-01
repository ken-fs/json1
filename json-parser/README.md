# JSON Parser & Formatter

A modern JSON parsing, formatting, and validation tool built with React, Next.js, and Tailwind CSS.

## Features

- **Format JSON**: Beautify and indent JSON for better readability
- **Minify JSON**: Compress JSON by removing unnecessary whitespace  
- **Validate JSON**: Check if your JSON syntax is valid with detailed error messages
- **Tree View**: Visualize JSON structure in an interactive tree format
- **Copy to Clipboard**: Easy one-click copying of processed JSON
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework
- **React 18** - Modern React with hooks

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone or download this project
2. Install dependencies:

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

3. Run the development server:

```bash
# Using pnpm
pnpm dev

# Or using npm
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Paste or type your JSON data in the input area
2. Select the desired operation (Format, Minify, Validate, or Tree View)
3. Click the corresponding button to process your JSON
4. View the result in the output area
5. Copy the processed JSON using the Copy button

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Home page
└── components/
    ├── JsonParser.tsx       # Main JSON parser component
    └── JsonTreeView.tsx     # Tree view visualization component
```