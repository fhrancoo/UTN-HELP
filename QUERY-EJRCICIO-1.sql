CREATE TABLE cupones (
	id SERIAL PRIMARY KEY,
	codigo TEXT UNIQUE NOT NULL,
	porcentaje INTEGER CHECK(porcentaje BETWEEN 1 AND 90),
	fecha_vencimiento DATE NOT NULL,
	activo BOOLEAN DEFAULT true
)

CREATE TABLE usuarios_cupones (
	id SERIAL PRIMARY KEY,
	usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
	cupon_id INTEGER REFERENCES cupones(id) ON DELETE CASCADE
)

INSERT INTO cupones (codigo, porcentaje, fecha_vencimiento)
VALUES ('UTN10', 10, '2026-01-01')

INSERT INTO usuarios_cupones (usuario_id, cupon_id)
VALUES (1,1)

SELECT * FROM cupones
SELECT * FROM usuarios
SELECT * FROM usuarios_cupones
SELECT * FROM productos

UPDATE cupones
SET activo = false
WHERE codigo = 'UTN10'

UPDATE usuarios
SET puntos = puntos + 50
WHERE ciudad = 'Cordoba'

DELETE FROM usuarios_cupones
WHERE usuario_id = 1 AND cupon_id = 1

SELECT DISTINCT ciudad FROM usuarios

SELECT * FROM productos
WHERE stock = 0 ORDER BY precio DESC

SELECT * FROM usuarios
WHERE ciudad = 'Cordoba' AND puntos BETWEEN 0 AND 500 ORDER BY puntos ASC

SELECT * FROM usuarios
WHERE nombre ILIKE '%a%'

SELECT * FROM productos ORDER BY precio DESC LIMIT 3