# How to deploy and use the app

This project was created with a flask backend, react frontend, and mysql database.

## What you need to install
- Docker (desktop recommended)
- mysql workbench

## Running the app for the first time
From the main directry, run `docker-compose --profile populate up --build`
  - this will populate the database with data (should always be the same since I set the seed to 2), we will use this data as our production data as described in the report.
  - you can then connect to the database through mysql workbench on port 3306 with user=root, password=secret to test your sql queries against sample data
  - this command should only be run once and not everytime you're rebuilding the containers
  - for the normal workflow, see 'Workflow' below
  - If you want to reset the database back to it's original data, you can run this command as well

## Workflow
1. switch to main branch `git checkout main`
2. pull latest changes `git pull`
3. create new branch `git checkout -b yourname/branch-name`
4. run `yarn install` to install new dependencies
5. start the db `service docker-compose up db`
6. uncomment the database_url env variable in api/.flaskenv
7. start api code `yarn start-api`
8. start frontend client `yarn start`
9. get to coding and see any changes instantly on localhost:3000
10. when done, commit changes and push

## Notes
 - You can also run the service using the container(s) by running `docker-compose up --build`
  - everytime you make a change to either the frontend or backend using the docker compose method, you'll have to rebuild the containers
 - routes are in the views.py file in /api, and models/tables are defined in /api/models.py
 - if you are solely testing mysql stuff, you just have to run the db service (docker-compose up db), then you can connect on port 3306 with user=root, password=secret. In mysql workbench you can run any sql queries you want.
 - all the sql query stuff Jason worked on is in /sql
