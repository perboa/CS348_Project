DROP DATABASE IF EXISTS ureview;

CREATE DATABASE ureview;

USE ureview;

CREATE TABLE College (
	collegeID INT AUTO_INCREMENT, 
	uni_name VARCHAR(255) NOT NULL, 
	city VARCHAR(50) NOT NULL, 
	province VARCHAR(50) NOT NULL, 
	country VARCHAR(50) NOT NULL, 
	logoURL TEXT, 
	rating FLOAT DEFAULT 0.0,
	CHECK (rating>=0 AND rating<=10),
	PRIMARY KEY (collegeID)
);

CREATE TABLE Program (
	programID INT AUTO_INCREMENT, 
	collegeID INT NOT NULL, 
	prog_name VARCHAR(255) NOT NULL,
	degree_type enum('bachelors'. 'masters'. 'doctors'. 'associates'. 'professional'), 
	PRIMARY KEY (programID),
	FOREIGN KEY (collegeID) REFERENCES College(collegeID)
);

CREATE TABLE User (
	userID INT AUTO_INCREMENT, 
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	avatar TEXT,
	email VARCHAR(50) UNIQUE NOT NULL,
	password VARCHAR(50) NOT NULL,
	linkedIn VARCHAR(255), 
	joinedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
	yearStarted INT UNSIGNED NOT NULL, 
	yearEnded INT UNSIGNED,
	CHECK (yearStarted >= 1940),
	CHECK (yearEnded IS NULL OR yearStarted <= yearEnded), 
	PRIMARY KEY (userID)
);

CREATE TABLE Attended (
	userID INT NOT NULL,
	collegeID INT NOT NULL,
	programID INT NOT NULL,
	yearStarted INT UNSIGNED,
	yearEnded INT UNSIGNED,
	PRIMARY KEY (userID, collegeID, programID)
);

CREATE TABLE Review (
	timeWritten DATETIME DEFAULT CURRENT_TIMESTAMP, 
	userID INT NOT NULL,
	collegeID INT NOT NULL,
	reviewBody TEXT, 
	difficulty TINYINT UNSIGNED NOT NULL, 
	employer_reputation INT UNSIGNED NOT NULL,
	academics TINYINT UNSIGNED NOT NULL, 
	studentLife TINYINT UNSIGNED NOT NULL, 
	recommend enum('Y', 'N') NOT NULL,
	CONSTRAINT CHK_Review CHECK (difficulty<=10 AND academics<=10 AND studentLife<=10),
	PRIMARY KEY (userID, collegeID)
);
