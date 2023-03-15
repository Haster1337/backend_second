CREATE DATABASE film_detail;

CREATE TABLE film_detail(
    film_id serial PRIMARY KEY,
    name text NOT NULL,
    production int NOT NULL, -- год производства
    country varchar(100) NOT NULL,
    tagline text NOT NULL
    /* необязательные поля
    budget int,
    marketing int,
    box_office int,
    premiere_in_Russia varchar(50),
    premiere_in_world varchar(50),
    release_in_DVD varchar(50),
    age int,
    rating_MPAA varchar(5),
    duration varchar(20)
    необязательные поля*/
);


CREATE TABLE person ( -- связь один ко многим
    person_id serial PRIMARY KEY,
    fullName text NOT NULL,
    profession text NOT NULL, -- через запятую можно указать все профессии скажем 'сценарист, продюсер, режиссер'
    film_id int REFERENCES film_detail(film_id)
);

CREATE TABLE category (
    category_id serial PRIMARY KEY,
    name varchar(50) NOT NULL  -- можно указать тип text и хранить все жанры в одной строке, чтобы не размножать строки на выводе
);

CREATE TABLE film_categories ( -- связь многие ко многим
    film_id int REFERENCES film_detail(film_id),
    category_id int REFERENCES category(category_id)
);

CREATE TABLE viewers (
    viewer_id serial PRIMARY KEY,
    country varchar(50) NOT NULL  -- можно создать отдельную таблицу country и по country_id ссылаться
);

CREATE TABLE film_viewers ( -- связь многие ко многим
    film_id int REFERENCES film_detail(film_id),
    viewer_id int REFERENCES viewers(viewer_id),
    count int NOT NULL
);

CREATE TABLE actors ( -- film-person
    actor_id serial PRIMARY KEY,
    fullName text NOT NULL
);

CREATE TABLE film_cast ( -- связь многие ко многим
    film_id int REFERENCES film_detail(film_id),
    actor_id int REFERENCES actors(actor_id)
);

CREATE TABLE dubbing_actors ( -- актеры дубляжа
    dubbing_actor_id serial PRIMARY KEY,
    fullname text NOT NULL
);

CREATE TABLE film_dubbing_actors_cast ( -- связь многие ко многим
    film_id int REFERENCES film_detail(film_id),
    actor_id int REFERENCES dubbing_actors(dubbing_actor_id)
);


-- adding info

INSERT INTO film_detail
VALUES (
    1, 'Зеленая миля',
    1999, 'USA',
    '«Пол Эджкомб не верил в чудеса. Пока не столкнулся с одним из них»'
);

INSERT INTO person
VALUES (1, 'Фрэнк Дарабонт', 'сценарист, продюсер, режиссер', 1);

INSERT INTO actors
VALUES
    (1, 'Том Хэнкс'),
    (2, 'Дэвид Морс'),
    (3, 'Бонни Хант'),
    (4, 'Дженнифер Энистон'),
    (5, 'Том Круз');

INSERT INTO film_cast
VALUES (1, 1), (1, 2), (1, 3);

INSERT INTO category
VALUES
    (1, 'драма'),
    (2, 'фэнтези'),
    (3, 'криминал'),
    (4, 'детектив'),
    (5, 'боевик');

INSERT INTO film_categories
VALUES (1, 1), (1, 2), (1, 3);

INSERT INTO dubbing_actors
VALUES
    (1, 'Всеволод Кузнецов'),
    (2, 'Владимир Антоник'),
    (3, 'Любовь Германова'),
    (4, 'Сергей Бурунов'),
    (5, 'Ольга Зубкова');

INSERT INTO film_dubbing_actors_cast
VALUES (1, 1), (1, 2), (1, 3);

INSERT INTO viewers
VALUES
    (1, 'USA'),
    (2, 'Germany'),
    (3, 'Italy'),
    (4, 'Nigeria'),
    (5, 'The Niger');

INSERT INTO film_viewers
VALUES (1, 1, 26000000), (1, 2, 2100000), (1, 3, 1700000);

--SELECT для вывода всей таблицы, если все таблицы заполнены и имеют хотя бы одну связь
SELECT film_detail.film_id, film_detail.name, production, film_detail.country, tagline,
person_id, person.fullname, profession,
category.category_id, category.name,
actors.actor_id, actors.fullname,
dubbing_actors.dubbing_actor_id, dubbing_actors.fullname,
viewers.viewer_id, viewers.country, film_viewers.count
FROM film_detail, person,
category, film_categories,
actors, film_cast,
dubbing_actors, film_dubbing_actors_cast,
viewers, film_viewers
WHERE
 film_detail.film_id = person.film_id -- person
AND
--category
 film_detail.film_id = film_categories.film_id AND category.category_id = film_categories.category_id
--actors
AND
 film_detail.film_id = film_cast.film_id AND actors.actor_id = film_cast.actor_id
--dubbing_actors
AND
 film_detail.film_id = film_dubbing_actors_cast.film_id AND dubbing_actors.dubbing_actor_id = film_dubbing_actors_cast.actor_id
-- viewers
AND
 film_detail.film_id = film_viewers.film_id AND viewers.viewer_id =  film_viewers.viewer_id
OR
 film_detail
ORDER BY
film_detail.film_id,
person_id,
category.category_id,
actors.actor_id,
dubbing_actors.dubbing_actor_id,
viewers.viewer_id ASC;

/*
    Вывод вышел на 80+ строчек для разных сочетаний всех таблиц :)
    Но если хотя бы одно из условий будет false, таблица будет пустой,
    поэтому лучше взаимодействовать с db через query в nodejs и по мере необходимости
    выцеплять те или иные элементы
*/


-- онуление
/*DROP TABLE film_dubbing_actors_cast;
DROP TABLE film_cast;
DROP TABLE film_categories;
DROP TABLE film_viewers;
DROP TABLE person;
DROP TABLE viewers;
DROP TABLE dubbing_actors;
DROP TABLE actors;
DROP TABLE category;
DROP TABLE film_detail;*/