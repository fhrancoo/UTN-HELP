/* 
    Define un Enum Categoria con los valores: Electronica, Ropa, Alimentos.
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
        reduce: calcular el total de los precios finales.
*/

enum Categoria
{
    ELECTRONICA = "Electronica",
    ROPA = "Ropa",
    ALIMENTOS = "Alimentos"
}

type Producto =
{
    nombre: string;
    precio: number;
    categoria: Categoria;
};

function precioFinal(p: Producto): number
{
    if (p.precio < 0)
    {
        throw new Error(`El precio de "${p.nombre}" no puede ser negativo.`);
    }

    if (p.precio > 1000)
    {
        return p.precio * 0.90;
    }
    return p.precio;
}

function obtenerNota(p: Producto): string | null
{
    return p.categoria === Categoria.ALIMENTOS ? "Perecedero" : null;
}

const inventario: Producto[] =
[
    {nombre: "Monitor gamer", precio: 1200, categoria: Categoria.ELECTRONICA},
    {nombre: "Teclado mecánico", precio: 500, categoria: Categoria.ELECTRONICA},
    {nombre: "Campera addidas", precio: 1500, categoria: Categoria.ROPA},
    {nombre: "Masita salada serranitas", precio: 200, categoria: Categoria.ALIMENTOS},
    {nombre: "Producto fallado", precio: -50, categoria: Categoria.ROPA}
];

console.log("              --- Recorrido de inventario ---");
for(const p of inventario)
{
    try
    {
        const precio = precioFinal(p);
        const nota = obtenerNota(p);
        
        let salida = `Producto: ${p.nombre} | Precio final: ${precio}`;
        
        if (p.precio > 1000) salida += " (Descuento aplicado)";
        if (nota) salida += ` | Nota: ${nota}`;
    
        console.log(salida);
    }
        catch (error)
        {
            if (error instanceof Error)
            {
                console.error(`Error: ${error.message}`);
            }
        }
}

console.log("\n       --- Analisis de datos ---");

const soloElectronica = inventario.filter(p => p.categoria === Categoria.ELECTRONICA);
console.log(`Productos de electrónica encontrados: ${soloElectronica.length}`);

const preciosValidos = inventario
    .filter(p => p.precio >= 0)
    .map(p => precioFinal(p));

const totalInventario = preciosValidos.reduce((acc, precio) => acc + precio, 0);

console.log(`Total acumulado de precios finales: $${totalInventario.toFixed(2)}`);