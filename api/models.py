from calendar import c
import enum
from api import db
from datetime import datetime

"""
Table: Review (association table)
"""
class Rating(enum.Enum):
    awful = 1
    bad = 2
    neutral = 3
    good = 4
    great = 5

class Review(db.Model):
    __tablename__ = 'review'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    college_id = db.Column(db.Integer, db.ForeignKey('college.id'), primary_key=True)
    body = db.Column(db.Text, nullable=True)
    recommend = db.Column(db.Boolean, nullable=False)
    difficulty = db.Column(db.Enum(Rating), nullable=False)
    employer_reputation = db.Column(db.Enum(Rating), nullable=False)
    academics = db.Column(db.Enum(Rating), nullable=False)
    student_life = db.Column(db.Enum(Rating), nullable=False)
    time_written = db.Column(db.DateTime, default=datetime.now)
    user = db.relationship("User", back_populates="reviews")
    college = db.relationship("College", back_populates="reviews")

    # def __init__(self, user, college, recommend, difficulty, employer_reputation, academics, student_life, body):
    #     self.user =  user
    #     self.college = college
    #     self.recommend = recommend
    #     self.difficulty = difficulty
    #     self.employer_reputation = employer_reputation
    #     self.academics = academics
    #     self.student_life = student_life
    #     self.body = body

    def __repr__(self):
        return f'<Review from "{self.user_id}" about "{self.college.name}">' 


"""
Table: Attended (association table)
"""
class Attended(db.Model):
    __tablename__ = 'attended'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    program_id = db.Column(db.Integer, db.ForeignKey('program.id'), primary_key=True)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    user = db.relationship("User", back_populates="attended_list")
    program = db.relationship("Program", back_populates="users")

    # def __init__(self, user, program, start_date, end_date):
    #     self.user =  user
    #     self.program = program
    #     self.start_date = start_date
    #     self.end_date = end_date

    def __repr__(self):
        return f'<Attended "{self.program.name}" by User "{self.user_id}">' 


"""
Table: User
"""
class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    joined_date = db.Column(db.DateTime, default = datetime.now)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    linkedIn = db.Column(db.String(100), nullable=True)
    avatar_URL = db.Column(db.String(100), default="default")
    reviews = db.relationship('Review', back_populates="user")
    attended_list = db.relationship('Attended', back_populates="user")

    # def __init__(self, email, password, first_name, last_name, linkedIn=None, avatar_URL="default"):
    #     self.email = email
    #     self.password = password
    #     self.first_name = first_name
    #     self.last_name = last_name
    #     self.linkedIn = linkedIn
    #     self.avatar_URL = avatar_URL
    
    def __repr__(self):
        return f'<User "{self.first_name} {self.last_name}" {self.id}>' 


"""
Table: College (Dominant Entity to Program (one to many))
"""
class College(db.Model):
    __tablename__ = 'college'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    country = db.Column(db.String(100), nullable=False)
    state_province = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    logo_URL = db.Column(db.String(100), default="default")
    rating = db.Column(db.Float, default=0)
    programs = db.relationship('Program', back_populates='college')
    reviews = db.relationship('Review', back_populates="college")

    # def __init__(self, name, country, state_province, city):
    #     self.name = name
    #     self.country = country
    #     self.state_province = state_province
    #     self.city = city

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
    __tablename__ = 'program'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    college_id = db.Column(db.Integer, db.ForeignKey(College.id), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    degree_type = db.Column(db.Enum(DegreeType), nullable=False)
    users = db.relationship('Attended', back_populates="program")
    college = db.relationship('College', back_populates='programs')

    # def __init__(self, name, degree_type):
    #     self.name = name
    #     self.degree_type = degree_type

    def __repr__(self):
        return f'<User "{self.name}" {self.id}>' 