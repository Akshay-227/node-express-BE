# Node-Express Application

A backend application using node.js, express, mongoose and typescript. 

## Environment Variables

Make sure to create a `.env` file in the root of your project with the following environment variables:

### 1. PORT

- **Description:** The port on which the server will run.
- **Example Value:** `8000`

### 2. MONGODB_PASSWORD

- **Description:** The password used to connect to MongoDB. - mongoDB atlus user
- **Example Value:** `user@1234`

### 3. MONGODB_URL

- **Description:** The URL to connect to the MongoDB database.
- **Example Value:** `mongodb+srv://user:{{password}}@cluster0.mjqho9w.mongodb.net`

### 4. API_URL

- **Description:** The URL for the external API used in your application.
- **Example Value:** `https://randomuser.me/api/`

### 5. BATCH_SIZE

- **Description:** The configurable batch size for background tasks - it will divide records into batch size of 'BATCH_SIZE' and schedule the job using 'bullMQ' library.
- **Example Value:** `50`

### 5. TOTAL_RECORDS

- **Description:** The configurable total records that needs to fetched from the random user generate API.
- **Example Value:** `5000`
- **Code will fetch 5000 records from API and run a queue job on batch size to enter records in DB.

## Getting Started

    1. Clone the repository.
    2. Install Docker
    3. Create a `.env` file in the root of your project.
    3. Copy and paste the above environment variables into the `.env` file.
    4. Adjust the values as needed.

## Running the Application

```bash
npm install
npm run dev
```

## Building docker file
- Make sure docker is installed in your system
- Run the below command
```bash
docker build -t <Image_Name> .
```
## Running the Docker image - container
- This will run our docker image inside a container 
- Note: we need to pass env file which we had created for successfuly running our APP. 
```bash
docker run -p <HOST_PORT>:<PORT_FROM_ENV> --env-file .env <Image_Name>

```
- <HOST_PORT> : Port of machine on which you are running docker
- <PORT_FROM_ENV> : Port which you have mentioned in .env file

## API Reference

#### Register User

```bash
  POST /api/v1/users/register
```

### Parameters
    1. id: User ID (string, required)
    2. gender: Gender of the user (string, required)
    3. name: Full name of the user (string, required)
    4. email: Email address of the user (string, required)
    5. address[city]: City in the user's address (string, required)
    6. address[state]: State in the user's address (string, required)
    7. address[country]: Country in the user's address (string, required)
    8. address[street]: Street in the user's address (string, required)
    9. age: Age of the user (string, required)
    10. picture: FILE (file, required)
- Note - address is a object with nested fields for - city, state, country, street
- You can use postman - `form-data` type while sending POST request to this endpoint



#### Get Users

```bash
  POST /api/v1/users/getUser?{QueryParams}
```
#### Retrieves a list of users with optional pagination and sorting.
### QueryParams
    1. limit - how many records you wish to get
    2. page - page number [example : 1]
    3. sortBy : String - name, email, gender, dob etc
    4. searchBy : query param for search
### Sample Request 
```bash 
http://localhost:8001/api/v1/users/getUsers?limit=10&page=1&sortBy=email&searchBy=john
```

## Note: 'Redis' must be installed and configured in the system on which you are running the Application. 

