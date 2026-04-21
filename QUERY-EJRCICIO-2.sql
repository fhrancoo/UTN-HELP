-- A1 / A2

CREATE TABLE categorias (
	id SERIAL PRIMARY KEY
	nombre TEXT UNIQUE NOT NULL
)

SELECT DISTINCT productos.categoria FROM productos

INSERT INTO categorias (nombre) VALUES ('Hogar')
INSERT INTO categorias (nombre) VALUES ('Electronica')
INSERT INTO categorias (nombre) VALUES ('Muebles')
INSERT INTO categorias (nombre) VALUES ('Libros')

SELECT * FROM categorias;
SELECT * FROM productos;

ALTER TABLE productos ADD COLUMN categoria_id INTEGER

UPDATE productos AS p
SET categoria_id = (SELECT id FROM categorias WHERE nombre = p.categoria)

ALTER TABLE productos ADD FOREIGN KEY (categoria_id) REFERENCES categorias(id)

ALTER TABLE productos ALTER COLUMN categoria_id SET NOT NULL

ALTER TABLE productos DROP COLUMN categoria;


-- B1

CREATE TABLE proveedores (
	id SERIAL PRIMARY KEY,
	razon_social TEXT UNIQUE NOT NULL,
	email TEXT UNIQUE NOT NULL
)


CREATE TABLE proveedores_productos (
	proveedor_id INTEGER REFERENCES proveedores(id),
	producto_id INTEGER REFERENCES productos(id),
	precio_proveedor NUMERIC(10,2) CHECK (precio_proveedor > 0),

	PRIMARY KEY (proveedor_id, producto_id)
)

-- C

INSERT INTO proveedores (razon_social, email) VALUES ('EMPRESA 1', 'emp1@gmail.com')
INSERT INTO proveedores (razon_social, email) VALUES ('EMPRESA 2', 'emp2@gmail.com')

SELECT * FROM proveedores

INSERT INTO proveedores_productos (proveedor_id, producto_id, precio_proveedor)
VALUES (1,1,1000.00)

INSERT INTO proveedores_productos (proveedor_id, producto_id, precio_proveedor)
VALUES (2,1,1000.00)

SELECT * FROM proveedores_productos

UPDATE productos
SET stock = stock + 5
WHERE id = 1

DELETE FROM proveedores_productos
WHERE proveedor_id = 2


-- D
SELECT nombre FROM categorias ORDER BY nombre ASC

SELECT * FROM productos WHERE categoria_id = (SELECT id FROM categorias WHERE nombre = 'Electronica')

SELECT p.nombre, c.nombre FROM productos AS p
JOIN categorias AS c ON p.categoria_id = c.id
WHERE c.nombre = 'Electronica'


SELECT * FROM productos
WHERE stock <= 5 ORDER BY stock ASC

SELECT * FROM proveedores
WHERE email ILIKE '%.com'

SELECT * FROM productos ORDER BY id ASC LIMIT 3
SELECT * FROM productos ORDER BY id ASC LIMIT 3 OFFSET 3
