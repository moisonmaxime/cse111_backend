CREATE TABLE user_container (
    uc_id INTEGER PRIMARY KEY AUTOINCREMENT,
    uc_user_id INT, 
    uc_c_id INT,
    CONSTRAINT ucuid FOREIGN KEY(uc_user_id) REFERENCES user(u_id) on delete cascade,
    CONSTRAINT uccid FOREIGN KEY(uc_c_id) REFERENCES container(c_id) on delete cascade
);
