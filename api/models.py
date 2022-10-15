from calendar import c
import enum
from api import db
from datetime import datetime

"""
Table: Review
"""
class Rating(enum.Enum):
    awful = 1
    bad = 2
    neutral = 3
    good = 4
    great = 5

reviews = db.Table(
    "review",
    db.Column("user_id", db.ForeignKey('user.id'), primary_key=True),
    db.Column("college_id", db.ForeignKey('college.id'), primary_key=True),
    db.Column("body", db.Text, nullable=True),
    db.Column("recommend", db.Boolean, nullable=False),
    db.Column("difficulty", db.Enum(Rating), nullable=False),
    db.Column("employer_reputation", db.Enum(Rating), nullable=False),
    db.Column("academics", db.Enum(Rating), nullable=False),
    db.Column("student_life", db.Enum(Rating), nullable=False),
    db.Column("time_written", db.DateTime, default=datetime.now)
)

"""
Table: Attended
"""

attended = db.Table(
    "attended",
    db.Column("user_id", db.ForeignKey('user.id'), primary_key=True),
    db.Column("program_id", db.ForeignKey('program.id'), primary_key=True),
    db.Column("college_id", db.ForeignKey('program.college_id'), primary_key=True),
    db.Column("start_date", db.Date, nullable=False),
    db.Column("end_date", db.Date, nullable=False),
)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    joined_date = db.Column(db.DateTime, default = datetime.now)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    linkedIn = db.Column(db.String(100), nullable=True)
    avatar_URL = db.Column(db.String(100), default="default")
    reviews = db.relationship('College', secondary=reviews, backref='users')
    programs = db.relationship('Program', secondary=attended, backref='user')

    def __init__(self, email, password, first_name, last_name, linkedIn, avatar_URL):
        self.email = email
        self.password = password
        self.first_name = first_name
        self.last_name = last_name
        self.linkedIn = linkedIn
        self.avatar_URL = avatar_URL
    
    def __repr__(self):
        return f'<User "{self.first_name} {self.last_name}" {self.id}>' 


"""
Table: Univeristy (Dominant Entity to Program (one to many))
"""
class College(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    country = db.Column(db.String(100), nullable=False)
    state_province = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    logo_URL = db.Column(db.String(100), default="default")
    rating = db.Column(db.Float, default=0)
    programs = db.relationship('Program', backref='college')
    reviews = db.relationship('User', secondary=reviews, backref='colleges')

    def __init__(self, name, country, state_province, city):
        self.name = name
        self.country = country
        self.state_province = state_province
        self.city = city

    def __repr__(self):
        return f'<User "{self.name}" {self.id}>' 

"""
Table: Program (Subordinate Entity to University (many to one))
"""
class DegreeType(enum.Enum):
    bachelors = 1
    masters = 2
    associates = 3
    doctoral = 4
    professional = 5

class Program(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    college_id = db.Column(db.Integer, db.ForeignKey(College.id), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    degree_type = db.Column(db.Enum(DegreeType), nullable=False)
    users = db.relationship('User', secondary=attended, backref='program')

    def __init__(self, name, degree_type):
        self.name = name
        self.degree_type = degree_type

    def __repr__(self):
        return f'<User "{self.name}" {self.id}>' 

