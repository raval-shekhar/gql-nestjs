# How to run applications
- Clone repository using following command
```
git clone https://github.com/raval-shekhar/gql-nestjs.git
```
## Prerequisite
  - Nodejs lastes version [Nodejs](https://nodejs.org/en/)
  - MongoDB Atlas account [Atlas](https://account.mongodb.com/account/login)
## Frontend
- Navigate to client folder and run following command
```
cd client
npm i --save
npm run start
```

## Backend
- Navigate to server folder and run application using command
```
cd server
npm i --save
npm run start:dev
```
- Create env file
```
cp .env.example .env
```
- Replace MONGO_URL in env file with URL obtained from atlas

# Features included
 * Login
 * Register
 * Create Post
 * List All Post
 * List my post

## Login and register
 - User will be able to login using email and password
 - User will be able to register using name, email and password

## Post
 - Logged In user will be able to create post
 - Able to see all by other user with pagination
 - User will be able see all his with pagination

### Note
  - In create post form image field is accepting image URL for now.

# Backend URL (hosted on heroku)
```
https://gql-nestjs.herokuapp.com/graphql
```
## Frontend URL (hosted on heroku)

```
https://gql-client.herokuapp.com
```