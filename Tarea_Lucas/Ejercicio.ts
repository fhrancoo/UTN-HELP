/* Define un Enum Categoria con los valores: Electronica, Ropa, Alimentos.
Define un tipo Producto con: nombre, precio, categoria.
Crea una función precioFinal(p: Producto): number que:
Lance un error si precio < 0.
Aplique 10% de descuento si precio > 1000.
Devuelva el precio final.
Crea una función nota(p: Producto): string | null que devuelva "Perecedero" si la categoría es Alimentos, o null si no aplica.
Crea un array inventario: Producto[] con al menos 5 productos (incluí 1 con precio negativo para probar el error).
Recorre el inventario con un bucle y muestra por consola:
Producto: <nombre> | Precio Final: <precio>
Si hay nota, agregar | Nota: <nota>
Si ocurre un error, mostrar Error: <mensaje>
Usando métodos de arrays:
filter: obtener solo productos de Electronica.
map: obtener los precios finales (los que no fallen).
reduce: calcular el total de los precios finales. */

/* enum Categoria {
    Electronica = "Electrónica",
    Ropa = "Ropa",
    Alimentos = "Alimentos",
}

type Producto = {
    nombre: string;
    precio: number;
    categoria: Categoria;
}

const precioFinal = (p: Producto): number => {
    if (p.precio < 0) {
        throw new Error(`El precio de ${p.nombre} no puede ser negativo`);
    }
    if (p.precio > 1000) {
        return p.precio * 0.9; // Descuento del 10%
    }
    return p.precio;
}

const nota = (p: Producto): string | null => {
    return p.categoria === Categoria.Alimentos ? "Perecedero" : null;
}

const inventario: Producto[] = [
    { nombre: "Laptop", precio: 1500, categoria: Categoria.Electronica },
    { nombre: "Camiseta", precio: 20, categoria: Categoria.Ropa },
    { nombre: "Leche", precio: 1.5, categoria: Categoria.Alimentos },
    { nombre: "Pan", precio: -2, categoria: Categoria.Alimentos }, 
    { nombre: "Smartphone", precio: 800, categoria: Categoria.Electronica },
];

// Recorrer inventario
for (const p of inventario) {
    try {
        const precio = precioFinal(p);
        const extra = nota(p);
        let salida = `Producto: ${p.nombre} | Precio Final: ${precio}`;
        if (extra) salida += ` | Nota: ${extra}`;
        console.log(salida);
    } catch (err: any) {
        console.log(`Error: ${err.message}`);
    }
}

const electronicos = inventario.filter(p => p.categoria === Categoria.Electronica);
console.log("Productos de Electrónica:", electronicos.map(p => p.nombre));

const preciosFinales = inventario
    .map(p => {
        try {
            return precioFinal(p);
        } catch {
            return null;
        }
    })
    .filter((precio): precio is number => precio !== null);

console.log("Precios finales válidos:", preciosFinales);

const total = preciosFinales.reduce((acc, val) => acc + val, 0);
console.log("Total de precios finales:", total); */