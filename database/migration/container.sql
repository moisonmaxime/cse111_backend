CREATE TABLE container (
    c_id INTEGER PRIMARY KEY AUTOINCREMENT,
    c_name CHAR(25) not null,
    c_type VARCHAR(25),
    c_user_id INT not null
);
