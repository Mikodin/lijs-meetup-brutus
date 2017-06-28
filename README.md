![Brutus](https://png.icons8.com/brutus/color/96)
# Brutus - For the Long Island JavaScript Meetup 
#### A starting point for creating your own RESTful API in Node.js

### Key Takeaways
* Managing users
  * User Registration
  * One Way Encryption for passwords using BCrypt
  * Storing users in the database
  * User Sign In
* Token Authorization - (JWT)
* A solid base to start your own API

### Requirements
1. Node.js & NPM / Yarn installed
1. MongoDB instance running
    * We will be using [Docker](https://www.docker.com/ "Docker") running the official [MongoDB Container](https://hub.docker.com/_/mongo/ "MongoDB Container")
    
### End Points
#### Register
POST /users/register
##### Headers
| Key | Value
| :-- | :----|
| Content-Type | application/json |
##### Parameters
| Name | Type | Description|
| :--- | :--- | :----------|
| username | string | Your desired username to register for the API |
| password | string | Your desired password |

##### Response:
`Status: 200 OK`
```javascript
{
 "message": "${username} Saved successfully"
}
```

#### Authenticate (Login)
POST /users/auth
##### Headers
| Key | Value
| :-- | :----|
| Content-Type | application/json |
##### Parameters
| Name | Type | Description|
| :--- | :--- | :----------|
| username | string | Your username |
| password | string | Your password |

##### Response:
`Status: 200 OK`
```javascript
{
 "message": "Authentication succesful",
 "token": "(JSON Web Token)"
}
```

#### Check a Password
GET /passwords/:password
##### Headers
| Key | Value
| :-- | :----|
| Content-Type | application/json |
| Authorization | JWT <Your Token from /users/auth/>

##### Response:
`Status: 200 OK`
```javascript
{
 "foundPassword": boolean,
 "message": "Password was found" || "Password not found"
}
```

#### Add a Password
POST /passwords/
##### Headers
| Key | Value
| :-- | :----|
| Content-Type | application/json |
| Authorization | JWT <Your Token from /users/auth/>

##### Parameters
| Name | Type | Description|
| :--- | :--- | :----------|
| password | string | The password you wish to check |

##### Response:
`Status: 200 OK`
```javascript
{
 "message": `${password} Saved successfully`,
}
```

### Quick and Dirty Docker Cheat sheet

| Purpose        | Command           |
| :------------- |:-------------|
| Download the MongoDB container      | `docker pull mongo` |
| Start MongoDB Instance      | `docker run --name lijs -d mongo`|
| List running containers | `docker ps`      |    $1 |
| Get IP Address of our Mongo Container | `docker inspect lijs`|
| Execute commands on the container | `docker exec -it lijs bash`|

### Quick and Dirty Mongo Shell Cheat Sheet
| Purpose                           | Command                            | For our example                     |
| :-------------------------------- |:---------------------------------- | :---------------------------------  |
| Enter the shell(from a bash command prompt) | `mongo` |
| List all databases | `show dbs` |
| Set DB as current DB | `use <db>` | `use brutus` |
| View all collections on current DB | `show collections` |
| View all records on a collection | `db.<collection>.find()` | `db.users.find()` |
| Find a specific record | `db.<collection>.find( {<property>: <value>} )` | `db.users.find({username: 'mikodin'})` |


<a href="https://icons8.com">Icon pack by Icons8</a>
