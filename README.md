# AsyncReq
Lightweight asynchronous http requests scheduler

AsyncReq is a lightweight asynchronous http requests scheduler built on Nodejs and MongoDB.

## Installation

1. Install nodejs
> sudo apt install nodejs

2. Install npm
> sudo apt install npm

3. Install mongodb
> sudo apt install -y mongodb

4. Install the dependencies:
> cd ./src && touch .env && npm install

## Configuration

#### Port
By default, the application will run on port 3000. To set a custom port add the following line to your .env file.
```
PORT=<YOUR_PORT>
```

#### Database connection
To set the default connection string to a custom mongodb database, add the following line to your .env file.
```
CONN_STRING=<YOUR_CONNECTION_STRING>
```

#### Authentication token

You can also define an authentication token that will be required in all the requests. This will add a permission requirement to the endpoints. 

Add the following line to your .env file.

```
AUTH_TOKEN=<YOUR_AUTHENTICATION_TOKEN>
```

## Endpoints:

### 1. Create
This endpoint will create a new task.
> /api/v1/create (GET)

Parameters:
    
* url (required): Full url that will be requested.
        
* datetime (required): Moment when url will be requested (format _YYYY-mm-dd hh:mm:ss_)  
        
* auth_token (optional): If you have set the _AUTH_TOKEN_ value in your .env file, you must include the value in this parameter.


### 2. List
This endpoint will return the list of tasks in the database.
> /api/v1/list (GET)

Parameters:
* auth_token (optional): If you have set the _AUTH_TOKEN_ value in your .env file, you must include the value in this parameter.

### 3. Delete
This endpoint will delete a task from database by the __id_ field of the document.

> /api/v1/delete/_<__id of task>_ (GET)

Parameters:
* auth_token (optional): If you have set the _AUTH_TOKEN_ value in your .env file, you must include the value in this parameter.