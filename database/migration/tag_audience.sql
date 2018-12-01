CREATE TABLE tag_audience (
    ta_tag_id INT, 
    ta_audience_id INT,
    CONSTRAINT atid FOREIGN KEY(ta_audience_id) REFERENCES audience(a_id),
    CONSTRAINT ttid FOREIGN KEY(ta_tag_id) REFERENCES tag(t_id)
);
