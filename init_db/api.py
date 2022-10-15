from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
import random
import pandas as pd

app = Flask(__name__, static_folder='../build', static_url_path='/')

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

from models import User, College, DegreeType, Rating, Program

with app.app_context():
    db.drop_all()
    db.create_all()


random.seed(2)


#Step 1: Create all the Users
numUsers = 150
users = []
emailSuffixes = ['@gmail.com', '@hotmail.com', '@live.ca']
surnames = pd.read_csv('surnames.csv')
first_names = pd.read_csv('first_names.csv')

for i in range(0, numUsers):
    rNumE = random.randint(0, 3)
    rNumS = random.randint(1, len(surnames))
    rNumF = random.randint(1, len(first_names))

    first_name = first_names.at(rNumF)
    surname = surnames.at(rNumS)
    password = surname + str(rNumE*12+rNumE*2)
    email = first_name + '.' + surname + emailSuffixes[rNumE]

    user = User(email, password, first_name, surname)
    users.append(user)

db.session.add_all(users)

#Step 2: Create all the Universities
colleges = []
collegeData = pd.read_csv('colleges.csv')
numColleges = len(collegeData)

for i in range(0, numColleges):
    row = collegeData.loc[i]
    name = row['name']
    city = row['city']
    state = row['state']
    country = row ['country']

    college = College(name, country, state, city)
    colleges.append(college)

#Step 3: Create all the programs
programData = pd.read_csv('programs.csv')
programs = []

#for each college, add 4-8 programs
for college in colleges:
    for i in range(0, random.randint(4, 8)):
        rNumN = random.randint(1, len(programData))
        degree_type = random.randint(1, 5)
        name = programData.at(rNumN)
        
        program = Program(name, degree_type, college=college)
        programs.append(program)


#Step 4: Add randomly 0-3 programs to each user

#Step 5: Add randomly 0-1 reviews for each user based off their programs