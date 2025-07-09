# The Animal Says website

This repository is the source code for the 2025 release of [The Animal Says... website](https://theanimalsays.com/).

This is a static site built using [Publican](https://publican.dev/) and [esbuild](https://esbuild.github.io/). Configuration is defined in publican.config.js which constructs the site in the ./build/ directory.


## Development build

Build in development mode and watch for file changes with style hot reloading:

```bash
npm start
```


## Production build

Build minified files for production deployment:

```bash
npm run build
```
