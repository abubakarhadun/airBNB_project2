
CREATE USER abubakar WITH PASSWORD '122005';

CREATE DATABASE airbnb OWNER abubakar;

GRANT ALL PRIVILEGES ON DATABASE airbnb TO abubakar;

GRANT CREATE ON DATABASE airbnb TO abubakar;

CREATE SCHEMA booking_app;

ALTER SCHEMA booking_app OWNER TO abubakar;

CREATE TYPE booking_app.Role AS ENUM (
  'owner',
  'visitor'
);

CREATE TABLE booking_app.users (
  "id" int PRIMARY KEY,
  "name" text,
  "email" text,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE booking_app.homes (
  "id" int PRIMARY KEY,
  "address" text,
  "price_per_night" int,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE booking_app.users_homes (
  "id" int PRIMARY KEY,
  "home_id" int REFERENCES booking_app.homes("id"),
  "user_id" int REFERENCES booking_app.users("id"),
  "role" booking_app.Role,
  "start" timestamp,
  "end" timestamp,
  "created_at" timestamp,
  "updated_at" timestamp
);


CREATE UNIQUE INDEX idx_users_homes_unique ON booking_app.users_homes(user_id, home_id);

ALTER TABLE booking_app.users ADD CONSTRAINT email_unique UNIQUE(email);


ALTER TABLE booking_app.users
  ADD COLUMN password TEXT NOT NULL,
  ADD COLUMN salt TEXT NOT NULL;