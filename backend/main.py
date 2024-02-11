from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import databases
import sqlalchemy
from sqlalchemy import select

# Database URL from Heroku credentials
DATABASE_URL = "postgresql://mxagqtjxpqrsty:d7dfdf2eb8813d5916b095d4ceca89c2f214c1076fd5b586d62bd90e5dae64ac@ec2-44-213-151-75.compute-1.amazonaws.com:5432/dce1uoa4ga8f5o"

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

# SQLAlchemy metadata for creating table objects
metadata = sqlalchemy.MetaData()

# Define client_data table object
client_data = sqlalchemy.Table(
    "client_data",
    metadata,
    sqlalchemy.Column("year", sqlalchemy.Integer),
    sqlalchemy.Column("active", sqlalchemy.String),
    sqlalchemy.Column("client_id", sqlalchemy.Integer),
    sqlalchemy.Column("first_name", sqlalchemy.String),
    sqlalchemy.Column("last_name", sqlalchemy.String),
    sqlalchemy.Column("gender", sqlalchemy.String),
    sqlalchemy.Column("date_of_birth", sqlalchemy.Date),
    sqlalchemy.Column("city", sqlalchemy.String),
    sqlalchemy.Column("indigenous", sqlalchemy.String),
    sqlalchemy.Column("pwd", sqlalchemy.String),
    sqlalchemy.Column("vet", sqlalchemy.String),
    sqlalchemy.Column("emergency_sheltered", sqlalchemy.String),
    sqlalchemy.Column("bus_pass", sqlalchemy.String),
    sqlalchemy.Column("clothing_supplement", sqlalchemy.String),
    sqlalchemy.Column("pet_deposit", sqlalchemy.String),
    sqlalchemy.Column("pssg", sqlalchemy.String),
    sqlalchemy.Column("status", sqlalchemy.String),
    sqlalchemy.Column("deceased", sqlalchemy.Date),
)

# Endpoint to fetch client data
@app.get("/client_data/")
async def read_client_data():
    query = client_data.select()
    return await database.fetch_all(query)

# Startup event to connect to the database
@app.on_event("startup")
async def startup():
    await database.connect()

# Shutdown event to close the database connection
@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

# Run the FastAPI app with Uvicorn server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

