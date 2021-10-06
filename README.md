# Griz Auto Detailing Web Applicaiton

Griz Auto Detailing is a convenient, easily navigable application, where users can create an account, login, read about our automobile detailing services, view pictures of our previous work, send us inquiries, and post their personal reviews.

Griz Auto Detailing is geared towards licensed automobile (or motorcycle) owners that care about their vehicle(s) and want it looking brand new. We are also open to partnering with local car dealerships that want their cars fully detailed before they are displayed on the lot.

Why did I choose Griz Auto Detailing? Growing up, I was always taught to take good care of my belongings no matter what condition they were in. My appreciation for car detailing originated from my father. Some of my most memorable summer days consisted of centering my family’s cars and motorcycle on our driveway, unspooling the garden hose, filling a bucket with warm water and dish soap, and giving the car a thorough wash. My younger brother, Alec, shares a similar passion and has taken it upon himself to continue this hobby to this day. His ongoing auto detailing side hustle is my inspiration for this application.

## Griz Auto Detailing -- Server

The server for the Griz Auto Detailing app was built using a number of technologies including Express, Node, JSON Web Token, Bcrypt, PostgresSQL, and Sequelize. The server is comprised of 15 REST API endpoints and 3 database tables. 2 of the tables have full create, read, update, delete (CRUD) capabilities. The server also utlizies role based acess control allowing admin personnel to access 3 endpoints that a regular cannot use.

## Server -- Endpoints

The following 3 tables delineate the API endpoints and the corresponding functionality.

### User Enpoints (usercontroller.js)

|  CRUD Operation  |  Endpoint   |             Function          |
| ---------------- | ----------- | ----------------------------- |
|    POST          | /createAcct | Allow users to create a new      account   |
| Content Cell     | /login      |

## Server -- Databate Tables