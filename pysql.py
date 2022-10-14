import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="jason",
    allow_local_infile=True
    )
    
cur = db.cursor(dictionary=True)

filelist = ['create_db.sql', 'load_data.sql']

for file in filelist:
    with open(file, 'r') as sqlfile:
        query_iter = cur.execute(sqlfile.read(), multi=True)
        for q in query_iter:
            print("Running: ", q)
            print(f"{q.rowcount} rows changed")
        db.commit()

cur.execute("SHOW DATABASES")
for item in cur:
    print(item)

cur.execute("SHOW TABLES")
for item in cur:
    print(item)

cur.execute("SELECT * FROM Program")
for item in cur:
    print(item)