UPDATE client c
SET city_id = (
    SELECT city_id
    FROM city
    WHERE city_name = c.city_name
);

ALTER TABLE client
DROP COLUMN city_name;