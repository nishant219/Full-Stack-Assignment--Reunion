# Property-Portal Reunion Readme👨‍💻 

## Client

The client application is hosted at [https://client-reunion.vercel.app/](https://client-reunion.vercel.app/).

## Server API

The server API can be accessed at [https://backend-reunion.vercel.app/api/list-properties](https://backend-reunion.vercel.app/api/list-properties).

## Introduction

This project is a comprehensive property portal that allows tenants to search for properties based on their preferences and property owners to manage their property listings. 

The portal is built using the following technologies:
- Frontend: React
- Backend: Node.js/Express
- Database: MongoDB Atlas
- Middlewares: Various middleware libraries such as `cors`, `yup`, `body-parser`, `helmet`, `express-mongo-sanitize`, `xss-clean`, and `express-rate-limit` are used for security and request handling.
- version control: Git
- Hosting Platform : vercel


## Running the Application
1. Clone the project repository to your local machine.
2. Ensure you have client and Database setup.
3. Run `npm install` to install the project dependencies.
4. set up `.env` file.
5. start client via `npm start`
6. Start the server by running `npm start` or via `npm run dev` with the help of dev dependency.
7. The server and client should now be running on the specified port.

## Environment Variables
Create a .env file in the project root with the following variables:
```
DB_URL
PORT
JWT_SECRET_KEY
JWT_EXPIRY
COOKIE_TIME
```


## Front End: Property Search / Listing Page

- **Home Page**: The home page serves as the property listing page where all available properties are displayed.
- **Filter Options**:
  - Location: Dropdown displaying city list.
  - Available from date: Calendar dropdown.
  - Price range: Slider.
  - Property type: Dropdown.
- **Authentication**: This is a public page accessible to both authenticated and unauthenticated users.
- **Pagination**: No pagination; all properties are shown on a single page.
- **Responsiveness**: The page is designed to be responsive.

## Back End: API Development

### 1. Fetch all available properties

- **Route**: `/api/list-properties`
- **Method**: GET
- **Authentication**: Public endpoint.
- **Purpose**: Fetch all available properties to display on the property search/listing page.

### 2. Add a property

- **Route**: `/api/property`
- **Method**: POST
- **Authentication**: Private endpoint (requires authentication).
- **Purpose**: Allows property owners to add new properties.

### 3. Update a property

- **Route**: `/api/property/:id`
- **Method**: PUT
- **Authentication**: Private endpoint (requires authentication).
- **Purpose**: Enables property owners to update their existing property listings.

### 4. Delete a property

- **Route**: `/api/property/:id`
- **Method**: DELETE
- **Authentication**: Private endpoint (requires authentication).
- **Purpose**: Allows property owners to delete their listed properties.

### 5. List my properties

- **Route**: `/api/property`
- **Method**: GET
- **Authentication**: Private endpoint (requires authentication).
- **Purpose**: Provides property owners with a list of properties they have listed on the portal.

### 6. Signup endpoint

- **Route**: `/api/signup`
- **Method**: POST
- **Purpose**: Allows users (property owners) to register on the portal using a valid email ID.

### 7. Login endpoint

- **Route**: `/api/login`
- **Method**: POST
- **Purpose**: Enables registered users to log in and authenticate themselves using JWT tokens.

### 8. Logout endpoint

- **Route**: `/api/logout`
- **Method**: GET
- **Purpose**: Enables registered users to logout from the platform



## Contributing
Contributions to the projects are welcome! Please follow these steps:
1. 🍴 Fork the repository.
2. 🌿 Create a new branch for your feature or fix.
3. 🛠️ Make your changes and commit them.
4. 🚀 Push your changes to your fork.
5. 🔄 Create a pull request to the main repository.

Contributions and feedback are welcome! If you find any issues or have suggestions for improvements, please feel free to submit a pull request or open an issue. Please follow the contribution guidelines.

👨‍💻 **Author**: Nishant (@nishant219)
