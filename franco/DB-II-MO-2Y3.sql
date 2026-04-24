-- EJERCICIO INTEGRADOR 2

-- A1

CREATE OR REPLACE FUNCTION sumar_numeros(a INT, b INT)
RETURNS INT AS $$
BEGIN
    RETURN A + B;
END;
$$ LANGUAGE plpgsql;

SELECT sumar_numeros(5, 10)

-- A2

CREATE OR REPLACE FUNCTION descuento(precio NUMERIC)
RETURNS NUMERIC AS $$
BEGIN
    RETURN precio * 0.90;
END;
$$ LANGUAGE plpgsql;

SELECT descuento(100)

-- A3

CREATE OR REPLACE FUNCTION user_puntos(id_user INT)
RETURNS TEXT AS $$
BEGIN
	IF (SELECT puntos FROM usuarios WHERE id = id_user) > 1000 THEN
		RETURN 'VIP';
	ELSE
		RETURN 'ESTANDAR';
	END IF;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM usuarios
SELECT user_puntos((SELECT id FROM usuarios WHERE id = 3))

-- B1

CREATE TABLE log_usuarios (
	id SERIAL PRIMARY KEY,
	usuario_id INT,
	accion TEXT,
	fecha TIMESTAMP default (CURRENT_TIMESTAMP)
)

-- B2

CREATE OR REPLACE FUNCTION user_deleted()
RETURNS TRIGGER AS $$
BEGIN
	INSERT INTO log_usuarios (usuario_id, accion)
	VALUES (OLD.id, 'DELETED');
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_user
AFTER DELETE ON usuarios
FOR EACH ROW
EXECUTE FUNCTION user_deleted();

DELETE FROM usuarios WHERE id = 6
SELECT * FROM log_usuarios
