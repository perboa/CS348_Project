from datetime import datetime
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
import random
import pandas as pd
from lorem_text import lorem
import datetime

app = Flask(__name__, static_folder='../build', static_url_path='/')

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

from models import User, College, Program, Attended, Review, DegreeType, Rating 

with app.app_context():
    db.drop_all()
    db.create_all()

'''
Database Population script
'''

random.seed(2)      #sets random seed to 2 so it's always the same

#Step 1: Create all the Users
numUsers = 150
users = []
emailSuffixes = ['@gmail.com', '@hotmail.com', '@live.ca']
surnames = pd.read_csv('surnames.csv', engine='python')
first_names = pd.read_csv('first_names.csv', engine='python')

for i in range(0, numUsers):
    r_suffix = random.randint(0, 2)
    r_surname = random.randint(1, len(surnames)-1)
    r_name = random.randint(1, len(first_names)-1)

    first_name = first_names['Name'][r_name]
    surname = surnames['Name'][r_surname]
    password = surname + str(r_suffix*12 + r_suffix*2)
    email = first_name + '.' + surname + emailSuffixes[r_suffix]

    user = User(email=email, password=password, first_name=first_name, last_name=surname)
    users.append(user)

#Step 2: Create all the colleges
colleges = []
collegeData = pd.read_csv('colleges.csv', engine='python')
numColleges = len(collegeData)

for i in range(0, numColleges):
    row = collegeData.loc[i]
    name = row['Name']
    city = row['City']
    state = row['State']
    country = row ['Country']

    college = College(name=name, country=country, state_province=state, city=city)
    colleges.append(college)

#Step 3: Create all the programs
programData = pd.read_csv('programs.csv', engine='python')
programs = []

#for each college, add 4-8 programs
for college in colleges:
    for i in range(0, random.randint(4, 8)):
        r_name = random.randint(1, len(programData)-1)
        degree_type = DegreeType(random.randint(1, 5))
        name = programData['Major'][r_name]
        
        program = Program(name=name, degree_type=degree_type, college=college)
        programs.append(program)

#Step 4: Add randomly 0-2 programs to each user
start_date = "09-07-2000"
date = datetime.datetime.strptime(start_date, "%m-%d-%Y")
attended_list = []

for user in users:
    for i in range(0, random.randint(0, 3)):
        r_program = random.randint(1, len(programs)-1)
        r_start = random.randint(0, 14)
        r_end = random.randint(3, 6)
        start = date + datetime.timedelta(days = 365*r_start)
        end = start + datetime.timedelta(days = 365*r_end)
        
        program = programs[r_program]

        #check if program is already enrolled in to ensure uniqueness constraint
        user_programs = []

        for enrollment in user.attended_list:
            user_programs.append(enrollment.program)

        while program in user_programs:
            r_program = random.randint(1, len(programs)-1)
            program = programs[r_program]

        attended = Attended(user=user, program=program, start_date=start, end_date=end)
        attended_list.append(attended)

#Step 5: Add review for each program (50% chance)
reviews = []

for user in users:
    if len(user.attended_list) > 0:
        for i in range(0, random.randint(0, 1)):
            body = lorem.paragraph()
            recommend = bool(random.randint(0, 1))
            difficulty = Rating(random.randint(1, 5))
            employer_reputation = Rating(random.randint(1, 5))
            academics = Rating(random.randint(1, 5))
            student_life = Rating(random.randint(1, 5))
            college = user.attended_list[0].program.college

            review = Review(
                    user=user, college=college, recommend=recommend, difficulty=difficulty, 
                    employer_reputation=employer_reputation, academics=academics, student_life=student_life, 
                    body=body
                )
            reviews.append(review)


with app.app_context():
    db.session.add_all(users)
    db.session.add_all(colleges)
    db.session.add_all(programs)
    db.session.add_all(attended_list)
    db.session.add_all(reviews)
    db.session.commit()



