
-- DB II

-- EJERCICIO INTEGRADOR 1


-- A1

SELECT usuarios.nombre, pedidos.total FROM usuarios
INNER JOIN pedidos ON usuarios.id = pedidos.usuario_id

-- A2

SELECT u.id, u.nombre, MAX(p.fecha) AS fecha_ultimo_pedido FROM usuarios AS u
LEFT JOIN pedidos AS p ON u.id = p.usuario_id
GROUP BY u.id, u.nombre

-- A3

SELECT u.id, u.nombre, SUM(total) AS total_acumulado
FROM pedidos AS p
LEFT JOIN usuarios AS u ON u.id = p.usuario_id
GROUP BY u.id, u.nombre

-- B1

SELECT * FROM productos
WHERE EXISTS(SELECT 1 FROM detalle_pedidos WHERE  detalle_pedidos.producto_id = productos.id)

-- B2
SELECT u.nombre FROM usuarios u
WHERE NOT EXISTS(SELECT 1 FROM pedidos p WHERE p.usuario_id = u.id)

-- D1
WITH gasto_usuarios AS (
SELECT usuarios.nombre, SUM(pedidos.total) AS total_gastado
FROM usuarios
JOIN pedidos ON usuarios.id = pedidos.usuario_id
GROUP BY usuarios.nombre)
SELECT * FROM gasto_usuarios ORDER BY total_gastado DESC
)

-- E1
CREATE VIEW vista_pedidos_usuarios AS
SELECT u.nombre, p.total AS monto, p.fecha
FROM usuarios u
JOIN pedidos p ON p.usuario_id = u.id

SELECT * FROM vista_pedidos_usuarios
WHERE monto > 1000

-- E2
CREATE MATERIALIZED VIEW reporte_ventas_mensuales AS
SELECT EXTRACT (MONTH FROM fecha) AS mes, SUM(total) AS monto FROM pedidos
GROUP BY mes

REFRESH MATERIALIZED VIEW reporte_ventas_mensuales
SELECT * FROM reporte_ventas_mensuales


-- F1

SELECT 
	pedidos.usuario_id,
	pedidos.fecha,
	pedidos.total AS monto,
	SUM(pedidos.total)
		OVER (PARTITION BY pedidos.usuario_id ORDER BY pedidos.fecha) AS acumulado
FROM pedidos

-- F2

SELECT 
    p.usuario_id,
    p.fecha,
	p.total AS monto,
    LAG(p.total) OVER(PARTITION BY p.usuario_id ORDER BY p.fecha) as monto_anterior,
    (p.total - LAG(p.total) OVER(PARTITION BY p.usuario_id ORDER BY p.fecha)) AS diferencia
	FROM pedidos AS p

-- F3
SELECT u.id, u.nombre,
	SUM(p.total) AS gasto_total,
	RANK() OVER(ORDER BY SUM(p.total) DESC) as ranking
FROM usuarios AS u
JOIN pedidos AS p ON p.usuario_id = u.id
GROUP BY u.id, u.nombre
