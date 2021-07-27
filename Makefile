.DEFAULT_GOAL := all

all: env build up

build:
	docker-compose build

up:
	docker-compose up -d

stop:
	docker-compose stop

down:
	docker-compose down

env:
	cp env.example .env
	cp frontend/src/environment/example.environment.js frontend/src/environment/environment.js
	openssl req -new -newkey rsa:4096 -days 3650 -nodes -x509 -subj \
	"/C=GY/ST=Demerara/L=Georgetown/" \
	-keyout config/nginx/certs/app.key \
	-out config/nginx/certs/app.crt

cleanup:
	docker-compose down --volumes --rmi local

dtest-lint:
	docker-compose exec -T django_backend /bin/bash lint_py.sh

dtest-test:
	docker-compose exec -T django_backend /bin/bash -c "python manage.py test --noinput"

dtest-coverage:
	docker-compose exec -T django_backend /bin/bash -c "coverage erase && coverage run manage.py test --noinput && coverage report"

black:
	docker-compose exec django_backend /bin/bash -c "python -m black ."
