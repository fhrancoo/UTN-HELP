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
