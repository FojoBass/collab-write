const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, '/collab-write/src/**/!(*.stories|*.spec).{ts,html}'),
    join(__dirname, '/libs/editor/src/lib/*.tsx'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        'warm-light': '#F5f5f5',
        'sub-warm': '#FFFFFF',
        dark: '#333333',
        'accent-primary': '#FF8A65',
        'accent-secondary': '#FFB74D',
        'clr-brd': '#8f8f8f',
      },
    },
  },
  plugins: [],
};
