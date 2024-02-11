from typing import List
from pydantic import BaseModel

from fastapi import FastAPI

app = FastAPI()

class Person(BaseModel):
    name: str
    age: int
    address: str

DB: List[Person] = [
    Person(name="Alice", age=25, address="Los Angeles"),
    Person(name="Bob", age=27, address="San Francisco"),
]

@app.get("/api")
def read_root():
    return DB
