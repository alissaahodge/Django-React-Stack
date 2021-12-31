# Django-React Stack

## About 
This development stack makes use the following frameworks:

Django (Python 3.7)<br>
React<br>
Postgres DB<br>
Docker<br>
Nginx

The features included on this stack include:

- Fully functioning auth (login, sign up , google auth signup/login)
- Home page
- Dashboard
- basic posts module
- user account settings


<code>
<img src='https://github.com/alissaahodge/Django-React-Stack/blob/master/ReadMeImages/Screenshot%202021-08-04%20at%207.43.30%20AM.png?raw=true'/>
</code>

## How To Run The Project 

### Dev Setup :
In order to run pystack locally your dev environment needs to be configured. To setup
your environment, follow the following instructions:
- make changes to file `env.example` to your choosing
- RUN `make`<br>
Poof! You're done!




## **Advanced:**

If you're reading this then we assume you want to adjust default values or setup step by step:

1. Run the command `make env` in the project root. A file called `.env` will be
created with default configs alongside `environment.ts` inside of 
`frontend/src/environments`. Edit this to be whatever you want.

2. `make build` - This will build each of the docker containers using the configurations you
specified in `.env`

3. `make up` - This will launch each docker containers for usage. You can visit the frontend at
`http://localhost:{REACT_PORT}` and the django backend at `http://localhost:{DJANGO_PORT}/admin`

#### Accessing API console
There are a few pre-built API endpoints you can explore:
- Users: http://localhost:8000/api/v1/users
- Blog: http://localhost:8000/api/v1/blog/, http://localhost:8000/api/v1/blog/posts/, http://localhost:8000/api/v1/blog/stats/

### Creating new modules
You may use the `blog` app as a template for new modules. It's located at `./pystack/api/apps/blog`

1. Make a copy of the `blog` app. ex: `./pystack/api/apps/memo`.
2. Rename all blog related entities to correspond with the new module.
3. Update imports in `models/__init__.py` and `views/__init__.py` within your module to ensure Django can discover your code.
4. Update `urls.py` within your module to expose any views you created.
5. Include the module's urls in `./pystack/api/urls.py`. ex: `path('memo/', include('pystack.api.apps.memo.urls')),`
6. Add the new app to `INSTALLED_APPS` in the project settings at `./pystack/settings/common.py`.
    - ex: `'pystack.api.apps.memo'`
7. Perform migrations

##### NOTES
- You should perform migrations whenever you are done make changes to the fields on 
your models and you're ready to test them. This will apply the necessary DB updates to correspond with the models.

- You should create a superuser on start by running the command `docker-compose exec python manage.py createsuperuser`
`Happy dev-ing :D`


