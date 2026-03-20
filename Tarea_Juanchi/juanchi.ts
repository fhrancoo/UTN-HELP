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
        // uso de backticks para que p.nombre se renderice
        throw new Error(`el precio de "${p.nombre}" no puede ser negativo.`);
    }

    if (p.precio > 1000) 
    {
        return p.precio * 0.90;
    }
    return p.precio;
}

function obtenerNota(p: Producto): string | null 
{
    return p.categoria === Categoria.ALIMENTOS ? "perecedero" : null;
}

const inventario: Producto[] = 
[
    { nombre: "monitor gamer", precio: 1200, categoria: Categoria.ELECTRONICA },
    { nombre: "teclado mecánico", precio: 500, categoria: Categoria.ELECTRONICA },
    { nombre: "campera addidas", precio: 1500, categoria: Categoria.ROPA },
    { nombre: "masita salada serranitas", precio: 200, categoria: Categoria.ALIMENTOS },
    { nombre: "producto fallado", precio: -50, categoria: Categoria.ROPA } 
];

console.log("--- recorrido de inventario ---");
for(const p of inventario) 
{
    try 
    {
        const precio = precioFinal(p);
        const nota = obtenerNota(p);
        
        // corrección: cambié ' por `
        let salida = `producto: ${p.nombre} | precio final: ${precio}`;
        
        if (p.precio > 1000) salida += " (descuento aplicado)";
        if (nota) salida += ` | nota: ${nota}`;
    
        console.log(salida);
    }
    catch (error) 
    {
        if (error instanceof Error) 
        {
            // corrección: cambié ' por `
            console.error(`error: ${error.message}`);
        }
    }
}

console.log("\n--- analisis de datos ---");

const soloElectronica = inventario.filter(p => p.categoria === Categoria.ELECTRONICA);
console.log(`productos de electrónica encontrados: ${soloElectronica.length}`);

const preciosValidos = inventario
    .filter(p => p.precio >= 0)
    .map(p => precioFinal(p));

const totalInventario = preciosValidos.reduce((acc, precio) => acc + precio, 0);

console.log(`total acumulado de precios finales: ${totalInventario.toFixed(2)}`);