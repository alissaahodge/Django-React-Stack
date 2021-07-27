# More Datascience friendly gist can be found here: https://gist.github.com/ruddra/870d7a51238ddfa4b50375086c12a4f5
# pull official python alpine image
FROM python:3.7

# Set Environment Variable
ENV PYTHONUNBUFFERED 1
ENV C_FORCE_ROOT true

# Making source and static directory
RUN mkdir /src
RUN mkdir /static
RUN mkdir /.envs

# Creating Work Directory
WORKDIR /src

# Update pip
RUN pip install --upgrade pip

# Installing requirements.pip from project
COPY ./backend/requirements.pip /scripts/
RUN pip install --no-cache-dir -r /scripts/requirements.pip

# Add env file
COPY .env /.envs/.env

# CMD will run when this dockerfile is running
CMD ["sh", "-c", "python manage.py collectstatic --no-input; python manage.py migrate; gunicorn --reload pystack.wsgi -b 0.0.0.0:${DJANGO_PORT}"]
