# Book-Store-Online-React-Nodejs
Online book store web app assignment. 
Client-side built with React, Server-side built with Node.js and Express Framework with javascript. 
Database connection with Mongoose (ODM) and supports authentication and authorization with JWT. 

* Built With:
-----------
Node.js, 
Express, 
MongoDB, 
Mongoose (ODM), 
JWT, 
Bcrypt, 
Validator.js, 
Cors, 
Create-React-app


In this applicaiton-
* Admin can add books to the database, edit, and delete them. 
* Users can explore the book shope as unlogged users, signup and login. 
Each user has his own cart, where he can store books he wants to buy, remove books from cart, increase/decrease book quantity in his cart, clear the cart or 
checkout if he wishes too.

# How To Install

Git clone

git clone 


* Instructions

- After cloning the the repository, run 'npm i' in order to install all the dependencies.
- Fill in all the values of the env variables in 'dev.env' files under client and server folders, so that the application will run properly during development mode.
  Note: This app has the option for exposing Users interface only, and hide Admin interface. 
  This option can be applied by changing the 'dev.env' following property value to 1:
        'REACT_APP_SECURITY_MODES_SWITCH_DISABLED=1' 
        
        
 # Available Scripts:
 
* In the Server project directory, you can run:

'npm start' - 
Runs the app in the production mode.
However this script is only ment to be run when deploying the application. The application is built, where you need to setup the env variables on the machine that your will be hosting it on or in a webhosting service, unlike in development mode.

'npm run dev' - 
Runs the app in the development mode.
Open localhost on the port you decided on in the env variables to view it in the browser.

The page will reload if you make edits with nodemon.


* In the Client project directory, you can run:

'npm start' - 
Runs the app in the production mode.


