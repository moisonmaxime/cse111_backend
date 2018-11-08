CREATE TABLE user_container (
    uc_id INT PRIMARY KEY,
    uc_user_id INT, 
    uc_c_id INT,
    FOREIGN KEY(uc_user_id) REFERENCES user(u_id)
    FOREIGN KEY(uc_c_id) REFERENCES container(c_id)
);
