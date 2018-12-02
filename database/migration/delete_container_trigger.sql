CREATE FUNCTION container_delete() RETURNS TRIGGER AS $_$
BEGIN
    DELETE FROM item WHERE f_container_id = old.c_id;
    DELETE FROM user_container WHERE uc_c_id = old.c_id;
    RETURN NULL;
END $_$ LANGUAGE 'plpgsql';

CREATE TRIGGER container_delete
BEFORE DELETE ON container
FOR EACH ROW
EXECUTE PROCEDURE container_delete();