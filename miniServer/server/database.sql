
CREATE TABLE genre (
    genre_id serial PRIMARY KEY,
    genre_name varchar(50) NOT NULL
);

CREATE TABLE films (
    film_id serial PRIMARY KEY,
    film_name text NOT NULL,
    film_year int NOT NULL
);

CREATE TABLE films_genre (
  	films_genre_id serial,
	film_id int REFERENCES films(film_id),
    genre_id int REFERENCES genre(genre_id)
);