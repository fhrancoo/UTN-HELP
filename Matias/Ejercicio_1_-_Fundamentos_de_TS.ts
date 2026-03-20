enum categorias{
   elctronica = "Electronica",
   ropa = "Ropa",
   alimentos = "Alimentos",
}
type producto = {
    nombre: string,
    precio: number,
    categoria: categorias
}
const preciofinal = (p: producto): number => {
    let precioCalculado = p.precio;
    try {
        if (precioCalculado < 0) throw new Error("El precio no puede ser negativo");
        if (precioCalculado > 1000) {
            precioCalculado *= 0.9;
        }
        return precioCalculado;
    } catch (error) {
        console.error("Error desconocido:", error);
        return 0;
    }
}