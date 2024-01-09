<h1 align="center">
  Meal UI
</h1>

> a superset of custom designs and [Carbon Design System](https://github.com/carbon-design-system/carbon/blob/main/README.md)
> for a clean, minimal, and modern UI experience.
> This includes various React components, custom designs,
> and the supporting JS scripting.

## Getting started

Install the dependencies and run the dev server

```sh
npm ci && npm run start
```

This should automatically open on [http://localhost:8080](http://localhost:8080). Requests to `/api` will automatically proxy to dotnet API project.

## Linting and autoformatting

This project uses [ESLint](https://eslint.org) and [Prettier](https://prettier.io).

To preview the linting process run,

```sh
npm run lint:preview
```

If you're happy with the suggestions, you can apply autofixes with,

```sh
npm run lint
```

Prettier is configured to format on-save. However, if you wish to autoformat the entire project at once run,

```sh
npm run format
```

## Building / Compiling the Production App

To build the app for production run `build` command (below). This will optimise the app for production and place it in the `dist/ folder`

```sh
npm run prod:build
```

Then in the repo root directory (`cd ..`), create a dotenv file to configure the app,

```sh
cp .env.example .env
nano .env
```

Edit the .env file with a valid MariaDb / MySql connection string and your preferred SPA and API ports.

> Docker loads configuration from environment variables using dotenv (`.env`) files.
> See the `.env.example` file in the repo root directory for some examples.

Having added some configuration, compose the docker stack with,

```sh
docker compose up
```

// TODO: fix this for local testing purposes
~After the compose completes, visit [inmeal.my-domain.local](inmeal.my-domain.local).~

~After the compose completes, visit [localhost:3002](localhost:3002).~

To preview the production process on your local machine without docker, run the `prod-preview` command (below) This will compile the app to `dist/` using the Webpack production config and preview it in your browser using `webpack-dev-server`.

```sh
npm run prod:preview
```

_TODO_ configure this command to utilise a dev-proxy