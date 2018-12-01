CREATE TABLE drink (
    d_id INTEGER PRIMARY KEY AUTOINCREMENT,
    d_name         CHAR (25) NOT NULL,
    d_brand        CHAR (25),
    d_expiredate   DATE,
    d_calories     INT,
    d_quantity     INT,
    d_container_id INT       NOT NULL,
    CONSTRAINT dc FOREIGN KEY (d_container_id) REFERENCES container (c_id)
);
