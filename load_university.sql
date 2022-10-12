SET GLOBAL local_infile=1;

LOAD DATA LOCAL INFILE 'university.csv'
INTO TABLE University
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
(collegeID, uni_name, city, province, country, logoURL, rating);