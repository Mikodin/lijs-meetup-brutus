![Brutus](https://png.icons8.com/brutus/color/96)
# Brutus - For the Long Island JavaScript Meetup 
#### A starting point for creating your own RESTful API in Node.js

### Key Takeaways
* Managing users
  * User Registration
  * User Sign In
  * One Way Encryption for passwords using BCrypt
* Token Authorization - (JWT)
* A solid base to start your own API

### Requirements
1. Node.js & NPM / Yarn installed
1. MongoDB instance running
    * We will be using [Docker](https://www.docker.com/ "Docker") running the official [MongoDB Container](https://hub.docker.com/_/mongo/ "MongoDB Container")
    
### End Points - Coming Soon

### Quick and Dirty Docker Cheat sheet

| Purpose        | Command           |
| :------------- |:-------------|
| Download the MongoDB container      | `docker pull mongo`
| Start MongoDB Instance      | `docker run --name lijs -d mongo`|
| List running containers | `docker ps`      |    $1 |
| Get IP Address of our Mongo Container | `docker inspect lijs`|
| Execute commands on the container | `docker exec -it lijs bash`|

<a href="https://icons8.com">Icon pack by Icons8</a>
