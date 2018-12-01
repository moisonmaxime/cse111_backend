CREATE TABLE food_tag (
    ft_food_id INT, 
    ft_tag_id INT,
    CONSTRAINT foodid FOREIGN KEY(ft_food_id) REFERENCES food(f_id),
    CONSTRAINT tagid FOREIGN KEY(ft_tag_id) REFERENCES tag(t_id)
);
