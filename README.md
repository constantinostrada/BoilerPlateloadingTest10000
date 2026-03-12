# BoilerPlateloadingTest10000

A production-ready boilerplate project using vanilla HTML, CSS, and JavaScript.

## Description

This is a modern, clean, and minimal web application boilerplate built with vanilla HTML, CSS, and JavaScript. It includes proper tooling for development, linting, formatting, and building for production.

## Features

- 📦 Modern project structure
- 🎨 Clean CSS with CSS variables for theming
- 🚀 Vanilla JavaScript (ES6+)
- 🔧 ESLint and Stylelint configuration
- 💅 Prettier for code formatting
- 🏗️ Build scripts for minification
- 📱 Responsive design ready
- ♿ Accessibility best practices

## Project Structure

```
.
├── src/
│   ├── index.html          # Main HTML file
│   ├── css/
│   │   ├── styles.css      # Main stylesheet
│   │   ├── reset.css       # CSS reset
│   │   └── variables.css   # CSS variables
│   ├── js/
│   │   ├── main.js         # Main JavaScript entry point
│   │   └── utils.js        # Utility functions
│   └── assets/
│       └── images/         # Image assets
├── dist/                   # Production build output
├── .eslintrc.json          # ESLint configuration
├── .stylelintrc.json       # Stylelint configuration
├── .prettierrc             # Prettier configuration
├── .gitignore              # Git ignore rules
└── package.json            # Project dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. Clone or download this repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

This will start a live-reload server at `http://localhost:8080`

Alternatively, use the basic HTTP server:

```bash
npm start
```

### Building for Production

Create an optimized production build:

```bash
npm run build
```

This will:
- Minify CSS files to `dist/css/`
- Minify and compress JavaScript files to `dist/js/`

### Linting

Run linters to check code quality:

```bash
npm run lint
```

Run linters individually:
```bash
npm run lint:js    # JavaScript linting
npm run lint:css   # CSS linting
```

### Formatting

Format all code with Prettier:

```bash
npm run format
```

## Available Scripts

- `npm start` - Start HTTP server
- `npm run dev` - Start development server with live reload
- `npm run build` - Build for production
- `npm run lint` - Lint JavaScript and CSS
- `npm run format` - Format code with Prettier

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with vanilla HTML, CSS, and JavaScript
- No frameworks, just pure web technologies
