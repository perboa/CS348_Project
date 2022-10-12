DROP DATABASE IF EXISTS webapp;

CREATE DATABASE webapp;

USE webapp;

CREATE TABLE University (
	collegeID INT AUTO_INCREMENT, 
    name VARCHAR(255) NOT NULL, 
    city VARCHAR(50) NOT NULL, 
    province VARCHAR(50) NOT NULL, 
    country VARCHAR(50) NOT NULL, 
    logoURL TEXT, 
    rating FLOAT,
	PRIMARY KEY (collegeID)
);

CREATE TABLE Program (
	programID INT AUTO_INCREMENT, 
    collegeID INT NOT NULL, 
    uni_name VARCHAR(255) NOT NULL, 
    prog_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (programID) 
--    FOREIGN KEY (collegeID) REFERENCES University(collegeID), 
--    FOREIGN KEY (uni_name) REFERENCES University(name)
);

CREATE TABLE Profile (
    userID INT AUTO_INCREMENT, 
    name VARCHAR(50) NOT NULL, 
    email VARCHAR(50) NOT NULL UNIQUE, 
    LinkedIn VARCHAR(255), 
    joinedDate DATETIME DEFAULT CURRENT_TIMESTAMP, 
    attended VARCHAR(255) NOT NULL, 
    yearStarted INT NOT NULL, 
    yearEnded INT, 
    program VARCHAR(255), 
    degreeType VARCHAR(50) NOT NULL, 
    PRIMARY KEY (userID) 
--    FOREIGN KEY (attended) REFERENCES University(name), 
--    FOREIGN KEY (program) REFERENCES Program(prog_name)
);

CREATE TABLE Review (
	reviewID INT AUTO_INCREMENT, 
    timeWritten DATETIME DEFAULT CURRENT_TIMESTAMP, 
    writerID INT NOT NULL, 
    writtenBy VARCHAR(50) NOT NULL, 
    reviewBody TEXT, 
    difficulty TINYINT NOT NULL, 
    price TINYINT NOT NULL, 
    academics TINYINT NOT NULL, 
    studentLife TINYINT NOT NULL, 
    recommend BOOL NOT NULL, 
    PRIMARY KEY (reviewID) 
--	  FOREIGN KEY (writerID) REFERENCES Profile(userID) ON DELETE CASCADE, 
--    FOREIGN KEY (writtenBy) REFERENCES Profile(name)
);