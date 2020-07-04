<p align="center">
  <img src="./public/img/favicon.svg" alt="Logo of Kirby + Vue.js 3 Starterkit" width="114" height="114">
</p>

<h3 align="center">Kirby + Vue.js 3 Starterkit</h3>

<p align="center">
  SPA with Vue.js 3 and Kirby. Uses Vite as web dev build tool.<br>
  <a href="https://kirby-vue3-starterkit.jhnn.dev"><strong>Explore the starterkit live »</strong></a>
</p>

<br>

## Kirby + Vue.js 3 Starterkit

### Key Features

- 🖖 Vue.js 3 powered
- ⚡️ [Vite](https://github.com/vitejs/vite) instead of Vue.js CLI
- ♿ Accessible routing
- 🔍 SEO-friendly ([server-side generated](site/snippets/meta.php) meta tags)
- 🦋 [Cache pages between sessions](#caching) and revalidate with modification timestamps
- 🗃️ Centralized state management without Vuex
- 🤝 Shared `.env` file for frontend & backend
- 🚀 Modern Kirby folder setup

### Introduction

This project is a starting point for [Vue.js v3](https://github.com/vuejs/vue-next) as the frontend UI library and [Kirby](https://getkirby.com) as headless CMS. The content is provided as JSON through Kirby and fetched by the frontend.

It's a simple, zero-setup, almost identical port of the [Kirby 3 starterkit](https://github.com/getkirby/starterkit) frontend (snippets, templates and their corresponding JS/CSS) to Vue.js single file components. By "almost" meaning that some features have been added like meta tags generation, environment variables support, accessible routing etc.

To compile the frontend sources, [Vite](https://github.com/vitejs/vite) comes to use. Vite is an opinionated web development build tool, created by Evan You. It serves code via native ES Module imports during development, allowing you to develop Vue.js single file components without a bundle step, and bundles it with Rollup for production. Features include:
- Lightning fast cold server start
- Instant hot module replacement (HMR)
- [Head over to the GitHub page](https://github.com/vitejs/vite) for more details

### Folder structure

Some notes about the folder structure with some additional comments on important files.

```sh
kirby-vue3-starterkit/
|
|   # Includes all frontend-related files
├── frontend/
|   |
|   |   # Vue.js sources
|   ├── src/
|   |   |
|   |   |   # `Footer`, `Header` and `Intro` components
|   |   |   # (Vue.js components correspond to Kirby snippets)
|   |   ├── components/
|   |   |
|   |   |   # Hooks for common actions
|   |   ├── hooks/
|   |   |   |
|   |   |   |   # Handle retrieval of JSON content and store management
|   |   |   ├── useKirbyApi.js
|   |   |   |
|   |   |   |   # Roughly corresponds to the Kirby's `$page` object
|   |   |   └── usePage.js
|   |   |
|   |   |   # Minimal store to cache page data fetched via api (Vuex-free)
|   |   ├── store/
|   |   |
|   |   |   # Vue.js views correspond to Kirby templates
|   |   |   # Routes are being automatically resolved 
|   |   ├── views/
|   |   |
|   |   ├── App.vue
|   |   ├── main.js
|   |   └── router.js
|   |
|   |   # Index page used by Vite in development environment
|   └── index.html
|
|   # The main entry point of the website
|   # Therefore web servers can only access files based in that directory
├── public/
|   |
|   |   # JavaScript and CSS assets generated by Vite (not tracked)
|   ├── assets/
|   |
|   |   # Static images for web manifest and PWA icons
|   ├── img/
|   |
|   |   # Kirby's media folder for thumbnails and more (contents not tracked)
|   └── media/
|
|   # Kirby's core folder containing templates, blueprints, snippets etc. for Kirby
├── site/
|   ├── blueprints/
|   ├── config/
|   ├── models/
|   ├── plugins/
|   ├── snippets/
|   |   |
|   |   |   # Other files
|   |   ├── [...]
|   |   |
|   |   |   # Index page used by Kirby in production environment
|   |   |   # Except for asset loading identical to `frontend/index.html`
|   |   └── index.php
|   |
|   |   # Templates for JSON content representations fetched by frontend
|   └── templates/
|
|   # Contains everything content and user data related (contents of each directory are not tracked)
├── storage/
|   ├── accounts/
|   ├── cache/
|   ├── content/
|   └── sessions/
|
|   # Kirby CMS and other PHP dependencies handled by Composer
├── vendor/
|
|   # Shared environment variables accessible from both Kirby and Vue.js
|   # To be duplicated as `.env`
├── .env.example
|
|   # Handles PHP dependencies
├── composer.json
|
|   # Handles NPM dependencies
├── package.json
|
|   # Node script to start a PHP server for Kirby
├── serve-kirby.js
|
|   # Router for the PHP built-in development server (used by the script above)
├── server.php
|
|   # Configuration file for Vite
└── vite.config.js
```

## Prerequisites

- Node.js with npm (only required to build the frontend)
- Kirby requires PHP 7.2+

> Kirby is not a free software. You can try it for free on your local machine but in order to run Kirby on a public server you must purchase a [valid license](https://getkirby.com/buy).

## Setup

Duplicate the [`.env.example`](.env.example) as `.env` and optionally adapt its values.

Install npm dependencies.

```bash
npm install
```

**Note**: Composer dependencies are tracked in this repository by default. Running `composer install` isn't necessary.

## Usage

### Serve backend & frontend for development

```bash
# Same as `npm run kirby:serve` and `npm run dev` but run in parallel
npm run start
```

Out of the box the backend is automatically served while developing. `npm run kirby:serve` spawns a PHP built-in web server by Node. You can also serve the backend by a web server of your choice. If done so, please specify hostname and port in the [`.env.example`](.env.example) if they differ from `127.0.0.1:8080` so that the decoupled frontend can access the JSON content representations in development.

### Compile for production

```bash
npm run build
```

This builds the frontend assets (CSS & JS files) and moves them to the `public/assets`.

### Configuration

All development and production related configurations for both backend and frontend code are located in your `.env` file:
- `KIRBY_SERVER_HOSTNAME` and `KIRBY_SERVER_PORT` specifies the address where you wish the Kirby backend to be served from. It is used by the frontend to fetch content data.
- Keys starting with `VITE_` are available in your code with e.g. `import.meta.env.VITE_CUSTOM_VARIABLE`.

### Caching

Even without caching enabled, the frontend will cache pages between indiviual routes/views. Once you reload the tab however, every page data has to be fetched from the api once again.

If you wish to create  apersistent store which caches pages between browser sessions, set:
- `KIRBY_CACHE` to `true`
- `VITE_PERSIST_API_STORE` to `true`

By that, the pages state will be saved to `IndexedDB` each time a page has been fetched.

While calling up the website for the first time, the `home` page will be always be fetched. It holds `site` data with an index of modification timestamps for each page id. This is relevant, because before returning a cached page, the timestamp will be compared with the latest modification timestamp from the site modification index. If it differs, the cached page will be removed and freshly fetched.

### Deployment

1. Deploy whole repository on your server.
2. Duplicate [`.env.example`](.env.example) as `.env`.
3. Install npm dependencies and build frontend assets: `npm i && npm run build`.
4. Change variables in your `.env`:
   - `KIRBY_DEBUG` to `false`
   - `KIRBY_CACHE` to `true` (recommended)
   - `VITE_PERSIST_API_STORE` to `true` (optional)
5. Point your web server to the `public` folder.
6. Some hosting environments require to uncomment `RewriteBase /` in [`.htaccess`](public/.htaccess) to make site links work.

Now your project is hopefully up 'n' running!

## Credits

- Big thanks to Jakub Medvecký Heretik for his inspirational work on [kirby-vue-starterkit](https://github.com/jmheretik/kirby-vue-starterkit).
- Mario Brendl for his [article on a Vue 3 based store w/o Vuex](https://medium.com/@mario.brendel1990/vue-3-the-new-store-a7569d4a546f).

## License

[MIT](https://opensource.org/licenses/MIT)

It is discouraged to use this plugin in any project that promotes racism, sexism, homophobia, animal abuse, violence or any other form of hate speech.
