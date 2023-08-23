# Rare: The Publishing Platform for the Discerning Writer


## Application Overview



## Getting Started

### Server Side
1. Clone this repository for the server side:
```sh
git clone git@github.com:NSS-Day-Cohort-64/rare-django-server-glacier-freeze-1.git
cd rare-django-server-glacier-freeze
```
2. Initialize virtual environment:
```sh
pipenv shell
```
3. Install third party packages:
```sh
pipenv install django autopep8 pylint djangorestframework django-cors-headers pylint-django
```
4. Create the project and API application (DO WE NEED THIS??????)
```sh
django-admin startproject rare
python3 manage.py startapp rareapi
```

5. Migrate and seed database (DO WE NEED THIS??????)
```sh
chmod u+x ./seed_database.sh
./seed_database.sh
```
6. Get the server running
```sh
python3 manage.py runserver
```


### Client Side
1. Clone this repository for the client side:
```sh
git clone git@github.com:NSS-Day-Cohort-64/rare-django-client-glacier-freeze.git
cd rare-django-client-glacier-freeze
```
2. Install dependencies: 
```sh
npm install
```
3. Run the code 
```sh
npm start
```
3. Login credentials: (Admin = Jonathan, Author = Chesney)
```txt
username: jonathanislame@aol.com
password: lemmon
```
```txt
username: chesney@farmersmeet.com
password: lemmon
```

## ERD

https://dbdiagram.io/d/5f885a013a78976d7b77cb74

## Wireframe

https://miro.com/app/board/o9J_kiGCSK4=/


## Features



## Technologies Used

4. This template is using [Bulma](https://bulma.io/documentation) for styling. Take a little bit of time to familiarize yourself with the framework if you would like to continue using it.
