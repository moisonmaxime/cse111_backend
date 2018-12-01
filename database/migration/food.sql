CREATE TABLE food (
    f_id serial PRIMARY KEY,
    f_name         CHAR (25)    NOT NULL,
    f_brand        CHAR (25),
    f_expiredate   DATE,
    f_calories     INT,
    f_quantity     INT,
    f_container_id INT          NOT NULL,
    CONSTRAINT fc FOREIGN KEY (f_container_id) REFERENCES container (c_id)
);
