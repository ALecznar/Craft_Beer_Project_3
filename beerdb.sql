CREATE TABLE MI_Breweries (
    brewery_name VARCHAR(255),
    brewery_type VARCHAR(255),
    city VARCHAR(255),
    address VARCHAR(255),
    phone VARCHAR(20),
    website_url VARCHAR(255),
    longitude FLOAT,
    latitude FLOAT
);

-- Enable the uuid-ossp extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the Breweries table
CREATE TABLE Breweries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255),
    brewery_type VARCHAR(255),
    address_1 VARCHAR(255),
    address_2 VARCHAR(255),
    address_3 VARCHAR(255),
    city VARCHAR(255),
    state_province VARCHAR(255),
    postal_code VARCHAR(20),
    country VARCHAR(255),
    longitude FLOAT,
    latitude FLOAT,
    phone VARCHAR(20),
    website_url VARCHAR(255),
    state VARCHAR(255),
    street VARCHAR(255)
);