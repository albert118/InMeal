# syntax=docker/dockerfile:1.4

FROM python:3.10-slim-bookworm as builder

WORKDIR /build

# the version is pinned for CI
ENV POETRY_VERSION=1.7.1
ENV POETRY_NO_INTERACTION=1
# disable cache for CI
ENV POETRY_NO_CACHE=1
# avoid using a venv in a dedicated Python image
ENV POETRY_VIRTUALENVS_IN_PROJECT=0
ENV POETRY_VIRTUALENVS_CREATE=0
ENV POETRY_HOME=/etc/poetry
ENV PATH="$PATH:/$POETRY_HOME/bin"

COPY ./README.md ./LICENSE ./.python-version ./pyproject.toml ./poetry.lock /
COPY ./gri /gri

RUN \
    --mount=type=cache,target=/var/cache/poetry; \
    mkdir /etc/poetry; \
    curl -sSL https://install.python-poetry.org | POETRY_HOME=$POETRY_HOME python3 -

RUN \
    --mount=type=cache,target=/var/cache/pip; \
    pip install -U pip setuptools --no-cache-dir; \
    pip install poetry==$POETRY_VERSION --no-cache-dir

# install dependencies before source code to leverage layer caching
# sync deps to avoid conflicts with the environment
RUN poetry install --no-dev --no-root --sync --quiet; \
    poetry --version && poetry check

# don't install the source in "editable mode"
# https://python-poetry.org/docs/basic-usage/#installing-dependencies-only
RUN poetry install --no-dev --quiet; \
    poetry build -vV -f sdist

FROM python:3.10-slim-bookworm as runtime

COPY --from=builder /dist/gri-*.tar.gz ./

# copy the demo content (this can be removed eventually)
COPY /static /static

RUN pip install ./gri-*.tar.gz

# log level is already set but uvicorn is lowercase
# configured the rootpath as per, https://fastapi.tiangolo.com/advanced/behind-a-proxy/
CMD LOG_LEVEL_LWR=$(echo $LOG_LEVEL | tr '[:upper:]' '[:lower:]'); \
    echo "Logging set to: ${LOG_LEVEL_LWR}"; \
    uvicorn gri.main:app \
    --proxy-headers \
    --host 0.0.0.0 --port 8131 \
    --log-level $LOG_LEVEL_LWR