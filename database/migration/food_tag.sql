CREATE TABLE food_tag (
    ft_id INTEGER PRIMARY KEY AUTOINCREMENT,
    ft_food_id INT, 
    ft_tag_id INT,
    FOREIGN KEY(ft_food_id) REFERENCES food(f_id)
    FOREIGN KEY(ft_tag_id) REFERENCES tag(t_id)
);
