# In Meal

<p align="center">
    <a href="https://github.com/albert118/InMeal/blob/master/LICENSE">
        <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="In Meal is released under the MIT license" />
    </a>
    <a href="https://github.com/albert118/InMeal/blob/master/meal-ui/webpack.common.js">
        <img src="https://badges.aleen42.com/src/webpack.svg" alt="In Meal uses Webpack" />
    </a>
    <a href="https://github.com/albert118/InMeal/blob/master/meal-ui/README.md">
        <img src="https://badges.aleen42.com/src/eslint.svg" alt="In Meal uses ESLint" />
    </a>
    <a href="https://github.com/albert118/InMeal/blob/master/meal-ui/README.md">
        <img src="https://badges.aleen42.com/src/react.svg" alt="In Meal is built with React" />
    </a>
    <a href="https://github.com/albert118/InMeal/blob/master/meal-ui/Dockerfile">
        <img src="https://badges.aleen42.com/src/docker.svg" alt="In Meal is deployed using Docker" />
    </a>
</p>

> A modern and clean interface for managing recipes and ingredients, In Meal acts as a digital cookbook without bloat.

## 🍇 Features

<p align="center">
    **This is still a work in progress but currently supports simple recipe and ingredient management.**
</p>

_Designed to be responsive with tablets in mind from the start. No more squinting at small buttons or "mouse-friendly" UX 🪤._

-   Minimal design avoids bloating your experience with unnecessary reviews or comments 😁.
-   Bulk editing for ingredients, no more typos across all your recipes 🔏!
-   Searchable, recipes and ingredients are easy to find 🔎.
-   Batteries included meta-data, easily include common meta-data for recipes such as servings or cook-time 🔋.

## Quick Start

Serve the development configuration locally,

```sh
npx nx run serve-stack
```

This runs a Vite dev server for the frontend and a dotnet API.

-   Vite is configured with HMR and auto-restart
-   dotnet is configured to watch and auto-restart too

## Project overview

| Project                                          | Description                                                              |
| ------------------------------------------------ | ------------------------------------------------------------------------ |
| [InMeal](./apps/InMeal.Api/README.md)            | A dotnet API using EF Core + MariaDb                                     |
| [Food UI (aka. "FUI")](./apps/fui/README.md)     | A Vite + React UI built with Carbon Design System and heavy modification |
| [Generative Recipe Images](./apps/gri/README.md) | A Python FastAPI REST microservice for serving (AI) generative images    |

## Building for Production

> Ensure you have a valid MariaDb/MySQL instance you can connect to before continuing.

Configure your environment with a db connection string in a fresh dotenv file,

```sh
cp .env.example .env
nano .env
```

To get the app up and running we simply need to build and run the docker images using Docker compose,

```sh
docker compose up
```

Done 🎈! You should be viewing successful docker container logs in your console.
Visit the app on <http://localhost:3002/>

> Note: nx docker-build will determine you need to build the dotnet projects.
> nx-dotnet has issues when running in parallel, as it and msbuild conflict on file-locks...
> To avoid this problem, the underlying script builds the dotnet projects sequentially before
> building the containers.

## 👀 Examples

![image]()
![image]()

![image]()


<p >
<p align="center">
    <img src="https://github.com/albert118/InMeal/assets/26985949/b7aa189e-63a1-44d2-a951-bcb6d800a371" alt="home/dashboard" />
    <img src="https://github.com/albert118/InMeal/assets/26985949/6d929c38-52ca-43d0-a2b8-1152e29af817" alt="manage recipes" />
    <img src="https://github.com/albert118/InMeal/assets/26985949/32d86de8-492f-45aa-bba2-94fccac126e6" alt="view recipe" />
    <img src="https://github.com/albert118/InMeal/assets/26985949/e5735d49-6dd2-4dcc-84ef-62445c18361a" alt="edit recipe" />
</p>

## Roadmap

-   [x] Introduce Nx to repo
-   [x] Move away from create-react-app + webpack (use Vite instead)
-   [ ] apply filters when clicking a badge
-   [x] improved dummy images (replace demo image)
-   [ ] generative (AI) images
-   [ ] add sections to recipe steps
-   [ ] add settings to page to extend/edit meal types and categories
-   [ ] favourites list
-   [ ] recommended options on the homepage
-   [ ] "always on" feature for mobile
-   [ ] improve background design
