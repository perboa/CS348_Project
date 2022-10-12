import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="root",
    allow_local_infile=True
    )
    
cur = db.cursor(dictionary=True)

filelist = ['create_db.sql', 'load_university.sql']

# executes commands in sql files
for file in filelist:
    with open(file, 'r') as sqlfile:
        query_iter = cur.execute(sqlfile.read(), multi=True)
        for q in query_iter:
            print("Running: ", q)
            print(f"{q.rowcount} rows changed")
        db.commit()

# shows databases
cur.execute("SHOW DATABASES")
for item in cur:
    print(item)

# shows tables
cur.execute("SHOW TABLES")
for item in cur:
    print(item)

''' For verifying that the University table was populated

cur.execute("SELECT * FROM University")
for item in cur:
    print(item)

'''
