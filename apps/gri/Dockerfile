FROM python:3.9

WORKDIR /build

COPY ./requirements.txt /build/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /build/requirements.txt

COPY ./app /build/app

# use "--proxy-headers" to inform uvicorn we're behind a proxy
CMD ["uvicorn", "app.main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "80"]