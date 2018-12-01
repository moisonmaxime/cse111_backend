CREATE TRIGGER container_delete
BEFORE DELETE ON container
BEGIN
DELETE FROM drink WHERE d_container_id = old.c_id;
DELETE FROM food WHERE f_container_id = old.c_id;
DELETE FROM user_container WHERE uc_c_id = old.c_id;
END;