<p align="center">
  <img src="https://i.ibb.co/YhZYpWd/Logo2-Dark.png" width="300" alt="Telco Store Logo" />
</p>

<br/>

Fully functional demo web application for a telecommunications equipment ecommerce. <br/>

🛠️ Built using the Javascript **MERN Stack** (MongoDB, ExpressJS, React, NodeJS).

![demo](images/demo.gif) <br/>

---

# Features ✨

## Client

Front end client developed using React and TailwindCSS.

### Pages

-   Home: Website description and featured products.
-   Shop: List of products with pagination, filters by category and brand and sort by price and date.
-   About: Project description.
-   Contact: Contact info
-   FAQs: Frequently asked questions.
-   Admin: Add products, manage users and orders.

### Usability

-   User registration and login.
-   Products cart.
-   Favorite products.
-   Order details and tracking.
-   Profile details and editing.

### Context

useContext hook to manage carts in localStorage and users with JWT.

## Server

REST API that serves endpoints to fetch data from the client.

### MVC Layers

Improved project organization in MVC layers: **router, controller, service and database**.

### MongoDB

Used for data persistance, products, users, carts and orders database. Mongoose is used to connect Node JS and MongoDB.

### Abstract Factory

Takes the third arg from the CLI to create products and carts DAOs according to the desired persistance (local or MongoDB). Also uses the singleton pattern in each constructor class to avoid creating multiple DAOs instances.

### Logger

Prints in console the HTTP request methods and their routes. <br/>
Saves errors and incorrect routes in `.log` files.

### Json Web Tokens

User login implemented with JWT fetching users from MongoDB and saving cookies the sessions.

### Nodemailer

Notifies the admin with every purchase sending an email to a custom address.

---

## Available endpoints 📍

| Endpoint                           | Description                      |
| ---------------------------------- | -------------------------------- |
| `* GET /api/user`                  | get all users                    |
| `# GET /api/user/:userId`          | get an individual user           |
| `# PUT /api/user/:userId`          | modify an individual user        |
| `# DELETE /api/user/:userId`       | delete an individual user        |
| `POST /api/user/refreshtoken`      | refresh user token               |
| `# POST /api/user/logout/:userId`  | user logout                      |
| `POST /api/user/login`             | user login                       |
| `POST /api/user/register`          | user register                    |
| `GET /api/product`                 | get all products                 |
| `GET /api/product/:productId`      | get an individual product        |
| `* POST /api/product`              | upload a product to the database |
| `* PUT /api/product/:productId`    | modify an individual product     |
| `* DELETE /api/product/:productId` | delete an individual product     |
| `# GET /api/order/:userId`         | get an individual order          |
| `# POST /api/order/:userId`        | upload an order to the database  |
| `# GET /api/cart/:userId`          | get an individual cart           |
| `# POST /api/cart/`                | upload a cart to the database    |
| `# PUT /api/cart/`                 | modify an individual cart        |
| `# DELETE /api/cart/`              | delete an individual cart        |

> _\* Admin only endpoints_ </br> _# Authenticated user only endpoints_

---

## Run the project locally

1. Download the repository.
2. Install npm dependencies with `npm install` in both client and server folders.
3. Open a CLI in the server route and execute `npm run mongo` or `npm run file` to use as persistance MongoDB or a `.json` file respectivelly.
4. Open a CLI in the client route and execute `npm run dev` and open the printed address in a browser.

> You must create a `.env` file inside the server folder with the mongoDB credential in order to use it as persistance. <br/>ie. `MONGODBCONNECTION=<yourcredential>`

## Deploy 🚀

This project was deployed using **Firestore Hosting** for the react client and **Firestore Cloud Functions** for the REST API.

## 🔗 Online preview: https://telco-store-mern.web.app/
