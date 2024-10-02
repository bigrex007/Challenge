Code Challenge
------------
CHATTINI APP

--- Proyect Architecture ---

Lucid Chart Diagraming: https://lucid.app/lucidchart/33b8d1b1-8cf6-4698-8d44-cb28bb0c42c0/edit?viewport_loc=12%2C-61%2C1357%2C1555%2C0_0&invitationId=inv_73dfb19d-1dd3-421e-8455-d823cf9c97ca

--- Backend ---

Typescript + NestJS + Postgres + Typeorm

Libraries Utilized:
- class-validator
- class-transformer
- cookie-session


--- Frontend ---

Typescript + React + Vite + Material UI

Libraries Utilized:
- localforage
- match-sorter
- react-router
- sort-by



--- Notification Sender Service ---

Typescript + NestJS + Postgres + Typeorm

Libraries Utilized:
- nodemailer



--- How to Install and Run

First, make sure that PostgreSQL is runnning in your local machine. The proyect consists of 3 different repos, 2 backend servers and a single client-side server. For the ports we have:
- Frontend - http://localhost:5173/
- Backend - http://localhost:3000/
- Notification Sender Service - http://localhost:3500/

You will need to configure 2 .env files;
- one for the backend:
POSTGRES_HOST=localhost
POSTGRES_PORT= YOUR POSTGRES PORT
POSTGRES_USER= DB USERNAME
POSTGRES_PASSWORD= DB PASSWORD
POSTGRES_DB= DATABASE TO CONNECT
PORT=3000
JWTSECRET=zXmGMWqs3Dqew3PJ

- and one for the Notification Sender Service:
SMTP_HOST=smtp.mailersend.net
SMTP_PORT=587
SMTP_FROM=MS_6awBwm@trial-vywj2lp2zojg7oqz.mlsender.net
SMTP_USER=MS_6awBwm@trial-vywj2lp2zojg7oqz.mlsender.net
SMTP_PASS=ayz1ig7LwyfT1VwD
NOTIFICATION_TOKEN=ThisIsASecret

Please leave the notification mailer like this, credentials have already been defined on a single randomly created account for this test purpose only, so security can be ignored for this specific case.

Once the .env files are set up you need to install any packages, for this you can run the following commands from termin

In order to run all servers you will need to open a terminal for each one of them, then:

Backend:
- cd ./backend/
- pnpm i
- pnpm run start:dev

Frontend:
- cd ./frontend/
- pnpm i
- pnpm run dev

Notification Sender Service:
- cd ./notification-sender-service/
- pnpm i
- pnpm run start:dev

Once this is running you can access the app from http://localhost:5173/, this should automatically redirect to http://localhost:5173/login in oder to signup.



--- App Testing and Running

Once in the Login page, if you already have an account you can go ahead and log into it. Additionally, you can create a new account if you wish, it will ask you for a username, email and password. All new users have 'user' role and permissions.

NOTE: The app itself is not capable of creating new 'admin' users, the way to do this is to do it manually by going into the users.entity.d.ts file and changing the default behavior of the entity to 'admin', then signing up in the app and this will automatically create admin users. Ideally 1 single admin user is required to manage users appropiately.

Also, if the user is unable to remember his password he can request a password reset, which requests an email address. If the email provided is tied to a user it will atempt to send a password reset link for the user. This is done via de notification-sender-service.

Once a user logs in he will be greeted with a very simple yet intuitive UI. If the user is an administrator he will have an additional tab to the HOME page that allows him to access a table of users and see their data manually. Also from this table users can be deleted by clicking on the trash can button right next to the corresponding row entry.

The Home page is just a basic landing page for the app. In the left side there will be a side bar that holds all conversations that the current user has. You can click on the + button in order to choose an existing user to conversate with. Once a user is selected a window with a messaging pane with some input and a button will show. In here you can send messages through the UI. 

NOTE: Notice that live functionality is not active for this proyect as it was not required.

Additionally, a small visual queue will show with how many unread messages there are in a conversation. Reading messages happens when accessing any conversation, it will automatically mark as read any message in where the logged user is the receiver.

If a message has been sent and the message has not been read after 15 minutes, the app will automatically send an email notification about the unread message to the receiver's email address.
