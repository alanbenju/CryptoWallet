# node-mongo

> Example of a dockerized Node server with Mongo

## Start

There are two different ways to lift this server:
1 - With docker, the server will be lifted on port 80
```bash
# Run with Docker
docker-compose up

# Tear it down
docker-compose down

# Re-build
docker-compose build

#Get into the docker
docker exec -it container_id /bin/bash
```
2 - Run on the terminal (Only for linux distributions)
```bash
./start.sh
```
The file will:
    - install mongodb-server if it's not installed
    - install curl if it's not installed
    - install node if it's not installed
    - install mocha 
    - start mongo
    - start server on port 3000

## How to run tests

Run on the terminal the following command:
```bash
mocha tests
``` 

## Endpoints

- Get /:coin/quote
    coin: dolar/pesos/real

- Get /user

- Get /user/:id

- Put /user/:id

- Post /user


## Script to create users

- Using docker
    Get into the mongo docker
    ```bash
    cd scripts/
    ./mongoScript.sh
    ```    

- Using start file
    ```bash
    cd scripts/
    ./mongoScript.sh
    ```    

## IMPORTANT
You can't share the database between the server lifted locally with the one served with docker