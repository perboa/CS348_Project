SELECT * FROM college WHERE name = "University of Waterloo"; 

INSERT INTO user(first_name, last_name, email, password, joined_date)
VALUES("Test", "User", "testuser@gmail.com", "123",  CURRENT_TIMESTAMP);

INSERT INTO review (time_written, user_id, college_id, body, difficulty, employer_reputation, academics, student_life, recommend) 
VALUES (CURRENT_TIME(), 1 , 1, "This is my review.", 1, 2, 3, 5, True); 

DELETE FROM review WHERE user_id = 1 AND college_id = 1;

SELECT * FROM review WHERE college_id = 2 ORDER BY time_written DESC;

SELECT * FROM user WHERE email='testuser@gmail.com' AND password='123';

