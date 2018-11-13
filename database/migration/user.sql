CREATE TABLE user (
    u_id INTEGER PRIMARY KEY AUTOINCREMENT,
    u_name CHAR(25) not null,
    u_email VARCHAR(50) not null,
    u_token VARCHAR(255) not null,
    u_username VARCHAR(25) not null,
    u_password VARCHAR(72) not null,
    u_type VARCHAR (25) not null
);
