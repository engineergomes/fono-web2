const config = {
  // Type check TypeScript files
  '**/*.(ts|tsx)': () => 'bunx tsc --noEmit',

  // Lint & Prettify TS and JS files
  '**/*.(ts|tsx|js)': (filenames) => [
    `bunx eslint ${filenames.join(' ')}`,
    `bunx prettier --write ${filenames.join(' ')}`,
  ],

  // Prettify only Markdown and JSON files
  '**/*.(md|json)': (filenames) => `bunx prettier --write ${filenames.join(' ')}`,
};

module.exports = config;
