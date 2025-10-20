
# Project
`npm start` - Starts the server 

`npm run build` - Builds to `./dist` folder.

## Database Setup
Before starting the server you should setup the data configuration in the `.env`. You can look at the `.env.example` what data you need. However, the data values should match the ones in the `environment` of the `docker-compose.yml` file.

After you have properly setup the `.env` you should run the `docker-compose.yml` with the `docker-compose up` command. This will create a container which will be your database. 

If the project is started for the first time there would be no `migrations` or `seeds` applied.

`npm run migrations` - Runs the migrations from the `/migrations` folder.

`npm run seeds` - Runs the seeds from the `/seeds` folder so the database is populated with some initial data.



## Endpoints
Base Endpoint is `/v1`;

Disclaimer: In the endpoint definitions is used the term "selected" this means the :id of the user or book (depending on endpoint)

### Auth
#### POST /v1/auth/register - Creates a user 
#### POST /v1/auth/login - Logs a user and issues JWT access token

### Books
#### GET /v1/books/all - Returns all books
#### GET /v1/books/:id - Returns selected book
#### GET /v1/books/ - Returns the books of the *currently logged user*
#### POST /v1/books/ - Creates book
#### PUT /v1/books/:id - Updates the selectd book
#### DELETE /v1/books/:d - Deletes the selected book

### Users
#### GET /v1/users/:id/books - Returns all books for the selected user 
#### POST /v1/users/books/:id - Adds book to the *currently logged user*
#### DELETE /v1/users/books/:id - Removes book from the *currently logged user*
#### POST /v1/users/:userId/books/:bookId - Adds any *selected book* to *any selected* user
#### DELETE /v1/users/:userId/books/:bookId - Removes any *selected book* from *any selected* user

## Testing

### Database Setup
Tests include both unit tests and integrations. For that there is a *test database* setup.

To properly setup the test database there should be a `.env.test` which should hold connection data for the test database. As mentioned in the beginning of this file, you can look in the `.env.example` to check what data you need. However, the `.env.test` data values should match the `environment` values from the `docker-compose.test.yml` file.

To have a running test database you should run the command: `docker-compose -f docker-compose.test.yml up`. This will run a container which will be your test database.

After everything is setup properly you can run the following commands individually:

`npm test` - Runs all existing tests, unit and integration tests.

`npm run test:coverage` - Runs all existing tests and shows the overall coverage.

## Postman

### [API Overview](https://www.postman.com/nikolabaikushev-9707178/koa-app/overview)

Unfortunately, to send the requests, Postman requires you to have an account. 