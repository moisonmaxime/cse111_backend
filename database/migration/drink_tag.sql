CREATE TABLE drink_tag (
    dt_id INTEGER PRIMARY KEY AUTOINCREMENT,
    dt_drink_id INT, 
    dt_tag_id INT,
    CONSTRAINT dtdid FOREIGN KEY(dt_drink_id) REFERENCES drink(d_id) on delete cascade,
    CONSTRAINT dttid FOREIGN KEY(dt_tag_id) REFERENCES tag(t_id) on delete cascade
);
