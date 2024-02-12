UPDATE client c
SET city_id = (
    SELECT city_id
    FROM city
    WHERE city_name = c.city_name
);

ALTER TABLE client
DROP COLUMN city_name;

CREATE FUNCTION generateClientID() RETURNS int
    LANGUAGE plpgsql
AS $$
DECLARE
idCount integer := 1;
   _code varchar(8) := '';
BEGIN
   WHILE idCount > 0 LOOP
      _code := array_to_string(ARRAY((
                SELECT SUBSTRING('123456789'
								 FROM MOD((random()*9)::int, 9)+1 FOR 1)
				FROM generate_series(1,8))),'');
		idCount := COUNT(*) FROM public.client l WHERE l.client_id = CAST(_code AS INT);
END LOOP;
return CAST(_code AS INT);
END;
$$;