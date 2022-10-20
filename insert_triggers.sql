DELIMITER $$
CREATE TRIGGER in_Attended AFTER INSERT ON User FOR EACH ROW
BEGIN
INSERT INTO Attended(userID, programID, yearStarted, yearEnded) 
VALUES (NEW.userID, NEW.programID, NEW.yearStarted, NEW.yearEnded); 
END$$
DELIMITER; -- each programID has a collegeID value
