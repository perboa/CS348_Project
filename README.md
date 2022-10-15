# How to deploy and use the app

This project was created with a flask backend, react frontend, and mysql database.

## What you need to install
Docker (desktop recommended)
mysql workbench

## Order of operations
1. Boot up the container(s) by running 'docker-compose up --build'
2. Check container logs to make sure they're up and running with no errors. If there are errors, you can try to fix then running the same code above to rebuild the containers.
3. you can interact with the frontend by going to localhost:3000 in your browser
4. routes are in the views.py file in /api, and models/tables are defined in /api/models.py
5. everytime you make a change to either the frontend or backend using the docker compose method, you'll have to rebuild the containers (using the command in step 1)
6. if you are solely testing mysql stuff, you just have to run the db service (docker-compose up db), then you can connect on port 3306 with user=root, password=secret.
In mysql workbench you can run any sql queries you want.
7. all the sql query stuff Jason worked on is in /sql
