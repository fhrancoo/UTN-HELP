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

enum Categoria {
    Electronica = "Electronica",
    Ropa = "Ropa",
    Alimentos = "Alimentos",
}
type Producto = {
    Nombre: string;
    Precio: number;
    Categoria: Categoria;
};
const precioFinal = (p:Producto): number => {
    try {
       if(p.Precio === 0) {
        throw new Error("El precio no puede ser Cero");
        if(p.Precio > 1000) {
            return p.Precio * 0.9;
       } 
    } catch (error: any) {
        console.error(error.message);
        return 0;
    }
}
return precioFinal;