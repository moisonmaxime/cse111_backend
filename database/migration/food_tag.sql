CREATE TABLE food_tag (
    ft_id INTEGER PRIMARY KEY AUTOINCREMENT,
    ft_food_id INT, 
    ft_tag_id INT,
    CONSTRAINT foodid FOREIGN KEY(ft_food_id) REFERENCES food(f_id) on delete cascade,
    CONSTRAINT tagid FOREIGN KEY(ft_tag_id) REFERENCES tag(t_id) on delete cascade
);
