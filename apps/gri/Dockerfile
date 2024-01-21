FROM python:3.10

WORKDIR /build

# the version is pinned for CI
ENV POETRY_VERSION=1.7.1

RUN pip install -U pip setuptools --no-cache-dir; \
    pip install --no-cache-dir poetry==$POETRY_VERSION

COPY ./.python-version ./pyproject.toml ./poetry.lock /

# do not install the source in "editable mode"
# https://python-poetry.org/docs/basic-usage/#installing-dependencies-only
RUN poetry install --no-root

COPY ./gri /gri

# copy demo static assets too
COPY ./static /static

# use "--proxy-headers" to inform uvicorn we're behind a proxy
CMD ["uvicorn", "gri.main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "80"]