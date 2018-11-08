CREATE TABLE drink_tag (
    dt_id INT PRIMARY KEY,
    dt_drink_id INT, 
    dt_tag_id INT,
    FOREIGN KEY(dt_drink_id) REFERENCES drink(d_id)
    FOREIGN KEY(dt_tag_id) REFERENCES tag(t_id)
);
