CREATE TABLE drink (
    d_id           INT       PRIMARY KEY,
    d_name         CHAR (25) NOT NULL,
    d_brand        CHAR (25) NOT NULL,
    d_expiredate   DATE      NOT NULL,
    d_calories     INT       NOT NULL,
    d_quantity     INT       NOT NULL,
    d_container_id INT       NOT NULL,
    FOREIGN KEY (d_container_id) REFERENCES container (c_id)
);
