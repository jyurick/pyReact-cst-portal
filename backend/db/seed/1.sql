-- Drop tables if they exist
DROP TABLE IF EXISTS health_authority_city;
DROP TABLE IF EXISTS client_note;
DROP TABLE IF EXISTS client;
DROP TABLE IF EXISTS city;
DROP TABLE IF EXISTS health_authority;


-- Create table for health authority
CREATE TABLE health_authority (
    health_authority_id SERIAL PRIMARY KEY,
    health_authority_name VARCHAR(100)
);

-- Create table for city
CREATE TABLE city (
    city_id SERIAL PRIMARY KEY,
    city_name VARCHAR(100)
);

-- Create table for client
CREATE TABLE client (
	year INT,
	Active BOOLEAN,
    client_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    gender VARCHAR(10),
    date_of_birth DATE,
	city_name VARCHAR(50),
    city_id INT,
    indigenous BOOLEAN,
    pwd BOOLEAN,
    vet BOOLEAN,
    emergency_sheltered BOOLEAN,
    bus_pass BOOLEAN,
    clothing_supplement BOOLEAN,
    pet_deposit BOOLEAN,
    pssg BOOLEAN,
    status VARCHAR(50),
    deceased DATE,
    FOREIGN KEY (city_id) REFERENCES city(city_id)
);

-- Create table for health authority and city relationship
CREATE TABLE health_authority_city (
    health_authority_city_id SERIAL PRIMARY KEY,
    health_authority_id INT,
    city_id INT,
    FOREIGN KEY (health_authority_id) REFERENCES health_authority(health_authority_id),
    FOREIGN KEY (city_id) REFERENCES city(city_id)
);

CREATE TABLE client_note (
	note_id SERIAL PRIMARY KEY,
	client_id INT,
    date DATE,
	note VARCHAR(400),
	FOREIGN KEY (client_id) REFERENCES client(client_id)
);