# Generative Recipe Images

<p align="center">
    <a href="https://github.com/albert118/GenerativeRecipes/blob/master/LICENSE">
        <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="Generative Recipes is released under the MIT license" />
    </a>
    <a href="https://github.com/albert118/GenerativeRecipes/blob/master/GenerativeRecipesMicroservice/Dockerfile">
        <img src="https://badges.aleen42.com/src/docker.svg" alt="Generative Recipes is deployed using Docker" />
    </a>
</p>

> A simple REST Microservice abstracting the consumption of a generative model for images of a recipe.
> This provides stylistic representations of the recipe prompt and implements some prod-ready features.

-   [🤖 Features](#-features)
-   [Getting started](#getting-started)
-   [Build the Docker image](#build-the-docker-image)
-   [Maintaining](#maintaining)
-   [👀 Examples](#-examples)

## 🤖 Features

**This is still a work in progress but currently supports simple recipe and ingredient management.**

> The main goal of this project is providing an easy to deploy, maintain, and consumable model.
> The model aims to provide consistently styled results, so that they are themed. These are also stylistic,
> and not a pure representation of the real recipe.

-   **Safe**: Filtered prompts and tailoured outputs to avoid extranous uses...
-   **Documentation**: OpenAPI standard and code-first design.
-   **Fast**: uses [FastAPI](https://fastapi.tiangolo.com/) for a fast development + build + deploy time.

## Getting started

> This assumes you have Poetry installed. Currently we're tagged on Poetry `v1.7.1`. To get started see [here](https://python-poetry.org/docs/)

To run the app in development mode,

```sh
source ./bin/activate
uvicorn app.main:app --reload
```

Then checkout the OpenAPI docs, [http://127.0.0.1:8000/docs].

## Build the Docker image

To build the service using Docker compose run,

```sh
docker compose up
```

or to build without compose...

```sh
docker build -t testImage .
docker run -d --name testContainer -p 80:80 testImage
```

... then test it by visiting the [ping-pong test URL](http://127.0.0.1:8000/test/ping)

## Maintaining

> TL;DR: Poetry has some fairly similar language as `npm`, simply run `poetry install` for most cases.

Poetry is used for package management in this project. The basic usage of Poetry is documented [here](https://python-poetry.org/docs/basic-usage/)

Or if you prefer the CLI, then Poetry has a very nice help menu available by simply running `poetry`.

## 👀 Examples

// TODO
