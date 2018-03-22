DROP DATABASE IF EXISTS restaurant_reviews;
CREATE DATABASE restaurant_reviews;

\connect restaurant_reviews;


CREATE TABLE restaurant (
  restaurant_id serial NOT NULL PRIMARY KEY,
  name text NOT NULL 
);

CREATE TABLE reviews ( 
  reviews_id serial NOT NULL PRIMARY KEY,
  user_name text NOT NULL,
  dined_date text NOT NULL,
  rating integer NOT NULL,
  city text NOT NULL,
  reviews text NOT NULL,
  restaurant_id INT REFERENCES restaurant (restaurant_id)
);
 
-- CREATE TABLE joined_table (
--   reviews_id INT REFERENCES reviews (reviews_id) ON UPDATE CASCADE ON DELETE CASCADE,
--   restaurant_id INT REFERENCES restaurant (restaurant_id) on UPDATE CASCADE,
--   CONSTRAINT restaurant_reviewsJOIN PRIMARY KEY (reviews_id, restaurant_id)
-- );

-- INSERT INTO reviews (city, dined_date, description , rating, review ) VALUES 
-- psql postgres restaurant_reviews < schema.sql


