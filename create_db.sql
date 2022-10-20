DROP DATABASE IF EXISTS webapp;

CREATE DATABASE webapp;

USE webapp;

CREATE TABLE University (
	collegeID INT AUTO_INCREMENT, 
	uni_name VARCHAR(255) NOT NULL, 
	city VARCHAR(50) NOT NULL, 
	province VARCHAR(50) NOT NULL, 
	country VARCHAR(50) NOT NULL, 
	logoURL TEXT, 
	rating FLOAT,
	CHECK (rating>=0 AND rating<=10),
	PRIMARY KEY (collegeID)
);

CREATE TABLE Program (
	programID INT AUTO_INCREMENT, 
	collegeID INT NOT NULL, 
	prog_name VARCHAR(255) NOT NULL,
	degree_type enum('Undergraduate'. 'Graduate'), 
	PRIMARY KEY (programID),
	FOREIGN KEY (collegeID) REFERENCES University(collegeID)
);

CREATE TABLE User (
	userID INT AUTO_INCREMENT, 
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	avatar TEXT,
	email VARCHAR(50) NOT NULL,
	password VARCHAR(50) NOT NULL,
	linkedIn VARCHAR(255), 
	joinedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
--	collegeID INT NOT NULL,
--	uni_name VARCHAR(255) NOT NULL, 
	yearStarted INT UNSIGNED NOT NULL, 
	yearEnded INT UNSIGNED,
	programID INT NOT NULL,
--	prog_name VARCHAR(255),
--	degreeType VARCHAR(25) NOT NULL,
	CHECK (yearStarted >= 1940),
	CHECK (yearEnded IS NULL OR yearStarted <= yearEnded), 
	PRIMARY KEY (userID),
--	FOREIGN KEY (collegeID) REFERENCES University(collegeID),
	FOREIGN KEY (programID) REFERENCES Program(programID)
); -- remove redundancy

CREATE TABLE Attended (
	attID INT AUTO_INCREMENT,
	userID INT NOT NULL,
--	collegeID INT NOT NULL,
	programID INT,
	yearStarted INT UNSIGNED,
	yearEnded INT UNSIGNED,
	PRIMARY KEY (attID),
	FOREIGN KEY (userID) REFERENCES User(UserID) ON DELETE CASCADE,
--	FOREIGN KEY (collegeID) REFERENCES User(collegeID),
	FOREIGN KEY (programID) REFERENCES User(programID)
); -- remove redundancy

CREATE TABLE Review (
	reviewID INT AUTO_INCREMENT, 
	timeWritten DATETIME DEFAULT CURRENT_TIMESTAMP, 
	userID INT NOT NULL, 
	writtenBy VARCHAR(50) NOT NULL,
--	collegeID INT NOT NULL,
	programID INT NOT NULL,
	reviewBody TEXT, 
	difficulty TINYINT UNSIGNED NOT NULL, 
	price INT UNSIGNED NOT NULL,  -- change to ROI, or remove if needed
	academics TINYINT UNSIGNED NOT NULL, 
	studentLife TINYINT UNSIGNED NOT NULL, 
	recommend enum('N', 'Y') NOT NULL,
	CONSTRAINT CHK_Review CHECK (difficulty<=10 AND academics<=10 AND studentLife<=10),
	PRIMARY KEY (reviewID),
	FOREIGN KEY (userID) REFERENCES User(userID) ON DELETE CASCADE,
--	FOREIGN KEY (collegeID) REFERENCES University(collegeID),
	FOREIGN KEY (programID) REFERENCES Program(programID)
); -- remove redundancy
