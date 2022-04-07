# Combinatorial Labelling Optimisation Algorithm Web Service
This the repository hosting the code for the Combinatorial Labelling Optimisation Algorithm Web Service. It is comprised of several microservices:

* `optimisation-worker` - a container that contains and runs the optimisation algorithm from the [final-year-project](https://github.com/justitsi/final-year-project) repository
* `compute-api` - a HTTP API that ingests optimisation jobs and passes them on to the optimisaiton worker using a message que
* `api` -  a HTTP API that exposes additional functionality, such as saved jobs and results from the database
* `frontend` - a NGINX web server that serves a static React application that interacts with the application APIs
* `reverseproxy` - a NGINX web server that redirects requrests to the two APIs and static frontend from a single endpoint
* `postgresdb` - a Postgres database used to store user optimisation jobs and job results
* `redis` - a Redis instance used as a message-queing medium for the `optimisation-worker` and `compute-api` containers
* `phppgadmin` - a PHPGAdmin instance used to grapically manage the `postgresdb` database

This diagram shows the microservices part of this application:

![Microservices](https://user-images.githubusercontent.com/40371335/162277339-62c86113-9e68-4ced-b6ed-fd0a9cfeec05.png)

## How to run this service
Running this service requires you to have `Docker` and `docker-compose` installed. To start all the application services, run the following command:
```
$ sudo docker-compose up
```
This will create and run all the containers detailed in the previous section. The `docker-compose` network will expose the `reverseproxy` container on ports `8000` and `8443` for `HTTP` and `HTTPS` traffic respectively.

It will also expose the `phppgadmin` container on port `5580` and `50443` for `HTTP` and `HTTPS` traffic resepctively. 

It should be noted that this software is not production ready. 
