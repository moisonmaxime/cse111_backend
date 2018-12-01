CREATE TABLE food (
    f_id INTEGER PRIMARY KEY AUTOINCREMENT,
    f_name         CHAR (25)    NOT NULL,
    f_brand        CHAR (25)    NOT NULL,
    f_expiredate   DATE         NOT NULL,
    f_calories     INT          NOT NULL,
    f_quantity     INT          NOT NULL,
    f_container_id INT          NOT NULL,
    CONSTRAINT fc FOREIGN KEY (f_container_id) REFERENCES container (c_id) on delete cascade
);
