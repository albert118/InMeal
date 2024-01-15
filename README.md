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
nx run-man -t serve --projects=InMeal.Api,@in-meal/fui
```

This runs a Vite dev server for the frontend and a dotnet API.

-   Vite is configured with HMR and auto-restart
-   dotnet is configured to watch and auto-restart too

| Project                                          | Description                                                              |
| ------------------------------------------------ | ------------------------------------------------------------------------ |
| [InMeal](./apps/InMeal.Api/README.md)            | A dotnet API using EF Core + MariaDb                                     |
| [Food UI (aka. "FUI")](./apps/fui/README.md)     | A Vite + React UI built with Carbon Design System and heavy modification |
| [Meal UI (deprecated)](./apps/meal-ui/README.md) | A React UI served with Webpack and NGinx                                 |

## 👀 Examples

<p >
<p align="center">
    <img src="https://github.com/albert118/InMeal/assets/26985949/191c66c9-d73a-4015-b38d-b4f92909838c" alt="In Meal home dashboard" />
    <img src="https://github.com/albert118/InMeal/assets/26985949/67031ded-b9b3-4d10-ad70-60987e9e0ea1" alt="In Meal manage recipes page" />
    <img src="https://github.com/albert118/InMeal/assets/26985949/4945052f-8f5b-4d2d-b66d-df3a88ba09aa" alt="In Meal manage view recipe" />
</p>

## Roadmap

-   [x] Introduce Nx to repo
-   [x] Move away from create-react-app + webpack (use Vite instead)
-   [ ] apply filters when clicking a badge
-   [ ] generative images (replace demo image)
-   [ ] add sections to recipe steps
-   [ ] add settings to page to extend/edit meal types and categories
-   [ ] favourites list
-   [ ] recommended options on the homepage
-   [ ] "always on" feature for mobile
-   [ ] improve background design
