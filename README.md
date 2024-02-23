# express-mongo-jwt
This is a demo project that can be used as Boilerplate for an microservice with Rest API development with Node, Express, MonogDB, Mongoose, JWT Middleware

Table of contents:

<!-- TOC depthFrom:2 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Install](#install)
- [Tests](#tests)
- [Docker](#docker)
- [License](#license)

<!-- /TOC -->


## Install

```sh
git clone https://github.com/vgirik/express-mongo-jwt
cd express-mongo-jwt
npm install
npm start
```

Then visit [http://localhost:4040/](http://localhost:4040/)
## Tests
## add-user

To create user use postman or similar tools

http://localhost:4040/user/add-user using POST method

add-user payload:
   {
       "firstName":"...",
       "lastName":"...",
       "gender":"Male",
       "dob":"1990-01-01",
       "password":"...",
       "email":".."
    }

## get JWT token

Method : POST

http://localhost:4040/user/token

payload:
   {
       "email":"...",
       "password":".."
   }

## get list of users through JWT authentication 

Method : GET

http://localhost:4040/user/list 

pass the bearer token which you got it from the token api in the authentication header

## to logout the and invalidate JWT token

Method : DELETE

http://localhost:4040/user/logout

pass the bearer token which you got it from the token api in the authentication header
 

## Docker

You can also use docker for development.

```sh
docker build -t kv/test-mongo:1.0 .
```
Start the services

```sh
docker-compose up -d
 ```

View the logs

```sh
docker-compose logs -f
```


Note that we are overriding the environment variable set in `.env` file because we don't want our data erased by the tests.


## License

Apache 2.0
