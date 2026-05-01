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


-- B2

CREATE OR REPLACE FUNCTION revisar_stock()
RETURNS TRIGGER AS $$
DECLARE stock_disponible NUMERIC;
BEGIN
	SELECT stock INTO stock_disponible FROM productos WHERE id = NEW.producto_id;
	IF stock_disponible < NEW.cantidad THEN RAISE EXCEPTION 'No hay sufuciente stock disponible del producto';
	END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER verificar_stock
BEFORE INSERT ON detalle_pedidos
FOR EACH ROW
EXECUTE FUNCTION revisar_stock();


INSERT INTO detalle_pedidos (id, producto_id, cantidad) VALUES (1,1,15)

SELECT * FROM detalle_pedidos
SELECT * FROM productos

-- C1

CREATE OR REPLACE PROCEDURE ajustar_puntos(usuario_id int, delta int)
AS $$
BEGIN
    IF EXISTS (SELECT id FROM usuarios WHERE id = usuario_id) THEN 
    UPDATE usuarios SET puntos = puntos + delta WHERE id = usuario_id;
	ELSE RAISE EXCEPTION 'No existe el usuario.';
	END IF;
    COMMIT;
END;
$$ LANGUAGE plpgsql;

-- C2

CALL ajustar_puntos(10, 100)

SELECT * FROM usuarios

-- D1 y D2

CREATE OR REPLACE FUNCTION reponer_stock_minimo(stock_min int, nuevo_stock int)
RETURNS TEXT AS $$
DECLARE items RECORD;
DECLARE total_afectados INT := 0;
BEGIN
	FOR items IN (SELECT * FROM productos WHERE stock < stock_min) LOOP
		IF items.stock = 0 THEN
			CONTINUE;
		END IF;
		UPDATE productos SET stock = nuevo_stock WHERE id = items.id;
    	RAISE NOTICE '% actualizado', items.nombre;
		total_afectados = total_afectados + 1;
	END LOOP;
	RETURN CONCAT((total_afectados::TEXT), ' Productos afectados.');
END;
$$ LANGUAGE plpgsql;

SELECT reponer_stock_minimo(36, 35)

(SELECT * FROM productos)

-- E1

SELECT nombre,
  CASE 
    WHEN stock = 0 THEN 'Sin Stock'
    WHEN stock < 5 THEN 'Pocas Unidades'
    ELSE 'Disponible'
  END AS disponibilidad
FROM productos;

-- E2

SELECT nombre, COALESCE(ciudad, 'No especificada') AS ciudad FROM usuarios;

UPDATE usuarios SET ciudad = NULL WHERE nombre = 'Luis Lopez'




