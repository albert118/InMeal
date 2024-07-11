# Food UI aka 'fui'

<p align="center">
    <a href="https://github.com/albert118/GenerativeRecipes/blob/master/LICENSE">
        <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="FUI is released under the MIT license" />
    </a>
    <img src="https://badges.aleen42.com/src/vitejs.svg" alt="FUI uses Vite" />
    <img src="https://badges.aleen42.com/src/eslint.svg" alt="FUI uses ESLint" />
    <img src="https://badges.aleen42.com/src/react.svg" alt="FUI is built with React" />
    <img src="https://badges.aleen42.com/src/jest_1.svg" alt="FUI is tested with Jest" />
</p>

> My spin and personal preferences on a modern UI based off of [Carbon Design System](https://carbondesignsystem.com/)
> The majority of the custom styling is done using Sass

-   [Features](#features)
-   [Getting started](#getting-started)
-   [Running the tests](#running-the-tests)
-   [Maintaining](#maintaining)

## Features

> Most of the boiler-plate is fleshed out by this stage. However, this is still a work in progress as further test coverage,
> components, and abstractions are added.

-   **Pretty**: I make no promises that this is the simplest/fastest/off-the-shelf approach to designing a UI...
-   **Modern + Minimal**: Everything is intended to look modern and keep the overal look and feel relatively minimal
-   **\*Mobile Support**: Who uses a laptop when cooking? I often prefer a mobile device, typically an iPad

## Getting started

You can serve this frontend directly with the appropriate Nx task,

```sh
npx nx run @inmeal/fui:serve
```

## Running the tests

Just use the appropriate Nx task to run all the tests,

```sh
npx nx run @inmeal/fui:test
```

## Maintaining

As per usual with Javascript projects, use `npm` to install and persist package (updates) to
the `package-lock.json`.
