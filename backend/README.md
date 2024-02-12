To build locally, navigate to backend folder and run 
uvicorn main:app --reload  

SQL Database seed files can be found in the "db/seed" directory.
The following files are found here:
1.sql
Contains schema

2.sql
Contains insert statement from Data.csv file

3.sql
Contains insert statements from Health Authority files

4.sql
Updates Client table with the correct City ids and then removes the redundant City_name column from the table. 