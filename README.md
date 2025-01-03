# Book-Store-Online-React-Nodejs
Online book store web app. 
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

Website Images-
## User GUI:

![Screenshot from 2025-01-03 10-37-06](https://github.com/user-attachments/assets/47de46af-a8b5-4ee5-ba18-354c82016197)

![Screenshot from 2025-01-03 10-37-28](https://github.com/user-attachments/assets/f5b5b99f-b98d-4451-bdd9-26450554d0fd)

![Screenshot from 2025-01-03 10-37-48](https://github.com/user-attachments/assets/d438ae9e-ed24-4504-b92f-cc1e86d407e5)

![Screenshot from 2025-01-03 10-38-15](https://github.com/user-attachments/assets/b3047374-00f2-4ce6-a4db-ffeb9e3cc84f)

![Screenshot from 2025-01-03 10-38-44](https://github.com/user-attachments/assets/31868de1-42f4-4cfb-8879-fda07c05c786)

![Screenshot from 2025-01-03 10-39-21](https://github.com/user-attachments/assets/792b764f-1e3f-4c52-9785-0c3f78a2e9a0)


## Admin Dashboard:

![Screenshot from 2025-01-03 10-39-59](https://github.com/user-attachments/assets/6ae71e10-752b-4534-b59c-00dfc9fefe01)

![Screenshot from 2025-01-03 10-40-12](https://github.com/user-attachments/assets/eb5a04ce-6afb-4f3a-a459-6e775f84c3dd)

![Screenshot from 2025-01-03 10-40-24](https://github.com/user-attachments/assets/1adb7060-9f1d-4c76-9947-84796257bf47)

![Screenshot from 2025-01-03 10-40-55](https://github.com/user-attachments/assets/7a63eb32-e863-47bd-a9dd-b47182bee82b)

![Screenshot from 2025-01-03 10-42-25](https://github.com/user-attachments/assets/3cc04506-2e25-4330-8ed4-ca42e98abd01)

![Screenshot from 2025-01-03 10-42-46](https://github.com/user-attachments/assets/6a027247-2921-42b7-b0a0-8bf29493d08c)

![Screenshot from 2025-01-03 10-43-05](https://github.com/user-attachments/assets/6b969f6c-289d-4661-b453-1314598e58e6)

![Screenshot from 2025-01-03 10-43-24](https://github.com/user-attachments/assets/c926587d-efcf-4545-9bcc-23bdf28c9f51)

![Screenshot from 2025-01-03 10-43-35](https://github.com/user-attachments/assets/89e72587-0a23-4754-a0db-fa16ff917f20)

![Screenshot from 2025-01-03 10-54-24](https://github.com/user-attachments/assets/bc8871b0-af4d-4da0-be16-394fea318ee0)



# How To Install

Git clone https://github.com/NogaAv/Book-Store-Online-React-Nodejs.git


git clone 

## Instructions

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


