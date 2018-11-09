CREATE TABLE user (
    u_id INT PRIMARY KEY,
    u_name CHAR(25) not null,
    u_email VARCHAR(50) not null,
    u_api_key VARCHAR(50) not null,
    u_username VARCHAR(25) not null,
    u_password VARCHAR(72) not null
);
