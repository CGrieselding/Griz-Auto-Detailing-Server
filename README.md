# Griz Auto Detailing Web Application

Griz Auto Detailing is a convenient, easily navigable application, where users can create an account, login, read about our automobile detailing services, view pictures of our previous work, send us inquiries, and post their personal reviews.

Griz Auto Detailing is geared towards licensed automobile (or motorcycle) owners that care about their vehicle(s) and want it looking brand new. We are also open to partnering with local car dealerships that want their cars fully detailed before they are displayed on the lot.

Why did I choose Griz Auto Detailing? Growing up, I was always taught to take good care of my belongings no matter what condition they were in. My appreciation for car detailing originated from my father. Some of my most memorable summer days consisted of centering my family’s cars and motorcycle on our driveway, unspooling the garden hose, filling a bucket with warm water and dish soap, and giving the car a thorough wash. My younger brother, Alec, shares a similar passion and has taken it upon himself to continue this hobby to this day. His ongoing auto detailing side hustle is my inspiration for this application.

## Griz Auto Detailing -- Server

The server for the Griz Auto Detailing app was built using a number of technologies including Express, NodeJs, JSON Web Token, Bcrypt, PostgresSQL, and Sequelize. The server is comprised of 15 REST API endpoints and 3 database tables. 2 of the tables have full create, read, update, delete (CRUD) capabilities. The server also utlizies role based access control allowing admin users to access 3 endpoints that a regular user cannot.

## Server -- Endpoints

The following 3 tables delineate the API endpoints and their corresponding functionality.

### User Enpoints (usercontroller.js)

|  CRUD Operation  |  Endpoint   |             Function          |
| ---------------- | ----------- | ----------------------------- |
|    POST          | /createAcct | Allow users to create a new      account   |
|    POST          | /login      | Allows returning users to login |
|    GET           | /myInfo     | Allows users to view all of their submitted reviews and sent inquiries (using database association) |
|    GET           | /admin      | Decides whether or not the logged in user is an admin user or a regular user |
|  GET *admin only* | /viewUser   | Allows admin users to view all registered users in the database |
|DELETE *admin only*| /deleteUser | Allows admin users to delete a user's account |

### User Review Endpoints (revcontroller.js)

|  CRUD Operation  |  Endpoint   |             Function          |
| ---------------- | ----------- | ----------------------------- |
|    CREATE        | /postREV    | Allows users to create and post a review |
|   READ           | /viewRev    | Allows users to view all the posted reviews on the app |
|  UPDATE          | /updateRev  | Allows users to update/edit their posted review(s) |
|  DELETE          | /deleteRev  | Allows users to permanently delete their posted review(s) |

### User Inquiry Endpoints (inqcontroller.js)

|  CRUD Operation  |  Endpoint   |             Function          |
| ---------------- | ----------- | ----------------------------- |
|    CREATE        | /sendInq    | Allows users send a private inquiry to Griz Auto Detailing |
|    READ          | /viewInq    | Allows users to view their own sent inquiries |
|    UPDATE        | /updateInq   | Allows users to update/edit their send inquiry |
|    DELETE        | /deleteInq   | Allows users to permanently delete their sent inquiry |
| READ *admin only* | /allInq     | Allows admin users to view all the sent inquiries in the database |

## Server -- Databate Tables

The following 3 tables display the content of the server's database tables along with corresponding keys and value types.

### User Table  (user.js )

|  id |  firstName | lastName | email | password | isAdmin |
| --- | ---------- | -------- | ----- | -------- | ------- |
| UUID | string    | string   | string | string | boolean |

### User Review Table (review.js)

|  id |  title     | date     | review | imageURL | userId |
| --- | ---------- | -------- | -----  | -------- | ------- |
| UUID | string    | date only | string | string (link to a social media post and/or video) | integer (database association) |

### User Inquiry Table (inquiry.js)

|  id |  fullName  | email    | phoneNumber | car | message | userId |
| --- | ---------- | -------- | -----       | -------- | ------- | ---- |
| UUID | string    | string   | string      | string | string | integer (database association) |

## Learn More

A big shoutout to the [Sequelize v6 Documentation](https://sequelize.org/), which was very helpful in building my backend.

Please feel free to peruse my GitHub files and accompanying code. I am always looking for ways to learn something new and improve my code. Happy coding!