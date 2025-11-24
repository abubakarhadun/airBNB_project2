-- 1. Create user safely
-- 1. Create user
CREATE USER abubakar WITH PASSWORD '122005';
 -- 2. Create database owned by that user
CREATE DATABASE airbnb OWNER abubakar;
-- 3. Connect to DB
\c airbnb

-- 4. Create schema
CREATE SCHEMA IF NOT EXISTS booking_app AUTHORIZATION abubakar;

-- 5. Enum
CREATE TYPE booking_app.role AS ENUM (
  'owner',
  'visitor'
);

-- 6. Tables
CREATE TABLE IF NOT EXISTS booking_app.users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  password TEXT NOT NULL,
  salt TEXT NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS booking_app.homes (
  id SERIAL PRIMARY KEY,
  address TEXT,
  price_per_night INT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS booking_app.users_homes (
  id SERIAL PRIMARY KEY,
  home_id INT REFERENCES booking_app.homes(id),
  user_id INT REFERENCES booking_app.users(id),
  role booking_app.role,
  start TIMESTAMP,
  "end" TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  UNIQUE (user_id, home_id)
);



ALTER SCHEMA booking_app OWNER TO abubakar;

ALTER TABLE booking_app.users OWNER TO abubakar;
ALTER TABLE booking_app.homes OWNER TO abubakar;
ALTER TABLE booking_app.users_homes OWNER TO abubakar;

ALTER TYPE booking_app.role OWNER TO abubakar;

