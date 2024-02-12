import datetime
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
import databases

load_dotenv()

# Database URL from Heroku credentials
DATABASE_URL = os.getenv("DATABASE_URL")

# Create FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with your frontend URL (e.g., "http://localhost:3000")
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Create a database connection pool
database = databases.Database(DATABASE_URL)

# Endpoint to fetch client data
@app.get("/client_data/")
async def read_client_data(search_query: str = Query(None)):
    query = f"SELECT c.*, ci.city_name, ha.health_authority_name FROM client c left outer join city ci on c.city_id = ci.city_id"
    query += " left outer join health_authority_city hac on ci.city_id = hac.city_id"
    query += " left outer join health_authority ha on hac.health_authority_id = ha.health_authority_id"
    if search_query:
        query += f" WHERE CONCAT(first_name, ' ', last_name) LIKE '%{search_query}%'"
    
    query += " LIMIT 50"
    return await database.fetch_all(query)

# Startup event to connect to the database
@app.on_event("startup")
async def startup():
    await database.connect()

# Shutdown event to close the database connection
@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

# Endpoint to insert client data
@app.post("/client_data/")
async def insert_client_data(new_client: dict):
    # Convert date string to datetime object
    print(new_client)
    if new_client.get("date_of_birth"):
        new_client["date_of_birth"] = datetime.datetime.fromisoformat(new_client["date_of_birth"])
    
    # Insert data into database
    columns = ', '.join(new_client.keys())
    values = ', '.join([f"'{value}'" if isinstance(value, str) else str(value) for value in new_client.values()])
    query = f"INSERT INTO client (client_id, {columns}) VALUES (generateClientID(), {values})"
    try:
        await database.execute(query)
        print("Client data inserted successfully")
        return {"message": "Client data inserted successfully"}
    except Exception as e:
        print(e)
        return {"error": str(e)}

# Run the FastAPI app with Uvicorn server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)