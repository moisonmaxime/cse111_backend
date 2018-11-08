CREATE TABLE tag_audience (
    ta_id INT PRIMARY KEY,
    ta_tag_id INT, 
    ta_audience_id INT,
    FOREIGN KEY(ta_audience_id) REFERENCES audience(a_id)
    FOREIGN KEY(ta_tag_id) REFERENCES tag(t_id)
);
