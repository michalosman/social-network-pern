# Social Network

Social Network app that imitates basic functionality of Facebook created with PERN stack.

## Features

### Guest

- [x] Sign up
- [x] Sign in

### User

- [x] Manage friends
- [x] Create posts
- [x] Comment posts
- [x] Like & unlike posts

### Moderator

- [x] Warn users
- [x] Remove posts

### Admin

- [x] Ban users
- [x] Remove posts

## Technologies used

### Frontend

- HTML5
- CSS3
- JavaScript
- React

### Backend

- TypeScript
- Node.js
- Express
- PostgreSQL
- TypeORM

## Geting started

### Clone repository

```
git clone https://github.com/michalosman/social-network.git
cd social-network
```

### Client setup

Create a .env file in the client directory and set up the following environment variables

```
REACT_APP_SERVER_URL='Address of the server'
```

Example client .env file

```
REACT_APP_SERVER_URL=http://localhost:5000
```

Install packages and start client

```
cd client
npm install
npm start
```

### Server setup

Create a .env file in the server directory and set up the following environment variables

```
PORT='The port the server will run on'
SECRET_KEY='Passwords encryption secret key'
PG_HOST='Postgres host'
PG_PORT='Postgres port'
PG_USERNAME='Postgres username'
PG_PASSWORD='Postgres password'
PG_DATABASE='Postgres database name'
```

Example server .env file

```
PORT=5000
SECRET_KEY=somesecretkey123
PG_HOST=localhost
PG_PORT=5432
PG_USERNAME=username
PG_PASSWORD=password
PG_DATABASE=socialnetwork
```

Install packages and start server

```
cd server
npm install
npm start
```
