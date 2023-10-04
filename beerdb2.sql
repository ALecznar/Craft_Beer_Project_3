-- Enable UUID extension if not already enabled
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

-- Create the MI_Breweries table (replace with your schema if it's different)
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

-- Add UUID column to MI_Breweries table
ALTER TABLE MI_Breweries
ADD COLUMN brewery_id UUID;

-- Update brewery_id in MI_Breweries based on brewery name
UPDATE MI_Breweries AS mi
SET brewery_id = b.id
FROM Breweries AS b
WHERE mi.brewery_name = b.name;

-- Create the Beer_Ratings table
CREATE TABLE beer_ratings (
    beer VARCHAR(225),
    brewery VARCHAR(225),
    beer_type VARCHAR (225),
    abv_percent VARCHAR(10),
    total_ratings FLOAT,
    avg_rating FLOAT
);

ALTER TABLE beer_ratings
ADD COLUMN brewery_id UUID;

UPDATE beer_ratings AS br
SET brewery_id = b.id
FROM Breweries AS b
WHERE br.brewery = b.name;