from datetime import datetime, timedelta
import csv

# Open the CSV file
with open('data.csv', newline='', encoding='utf-8-sig') as csvfile:
    reader = csv.DictReader(csvfile)
    
    # Open a file to write the insert statements
    count = 0
    with open('insert_client.sql', 'w') as file:
        # Iterate over each row
        for row in reader:
            if count == 0:
                count += 1
                continue
            for key, value in row.items():
                if not value.strip():
                    row[key] = 'NULL'
                else:
                    row[key] = f"'{value}'"
            
            # Subtract 100 years if Date_of_Birth is in the future
            dob = datetime.strptime(row['Date of Birth'], "'%d-%b-%y'")
            if dob > datetime.now():
                dob -= timedelta(days=36525)  # 365.25 days per year on average

            row['Date of Birth'] = f"'{dob.strftime('%d-%b-%Y')}'"

            row['Active'] = row['Active'] == 'Y'
            row['Indigenous'] = row['Indigenous'] == 'Y'
            row['PWD'] = row['PWD'] == 'Y'
            row['Vet'] = row['Vet'] == 'Y'
            row['Emergency Sheltered'] = row['Emergency Sheltered'] == 'Y'
            row['Bus Pass'] = row['Bus Pass'] == 'Y'
            row['Clothing Supplement'] = row['Clothing Supplement'] == 'Y'
            row['Pet Deposit'] = row['Pet Deposit'] == 'Y'
            row['PSSG'] = row['PSSG'] == 'Y'

            # Construct the insert statement
            insert_statement = f"INSERT INTO client (Year, Active, Client_ID, First_Name, Last_Name, Gender, Date_of_Birth, City_Name, Indigenous, PWD, Vet, Emergency_Sheltered, Bus_Pass, Clothing_Supplement, Pet_Deposit, PSSG, Status, Deceased) VALUES ({row['Year']}, {row['Active']}, {row['Client ID']}, {row['First Name']}, {row['Last Name']}, {row['Gender']}, {row['Date of Birth']}, {row['City']}, {row['Indigenous']}, {row['PWD']}, {row['Vet']}, {row['Emergency Sheltered']}, {row['Bus Pass']}, {row['Clothing Supplement']}, {row['Pet Deposit']}, {row['PSSG']}, {row['Status']}, {row['Deceased']});\n"
            file.write(insert_statement)

print("Insert statements have been written to insert_queries.sql")
