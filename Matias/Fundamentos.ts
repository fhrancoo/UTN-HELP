enum categorias{
   electronica = "Electronica",
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
    } catch (error) {
        console.error("Error desconocido:", error);
        return 0;
    }
    return precioCalculado;
}
const nota = (p: producto): string | null => {
    if (p.categoria === categorias.alimentos) {
        return "Este producto es perecedero";
    } else {
        return null;
    }
}
const inventario: producto[] = [
    { nombre: "Laptop", precio: 1500, categoria: categorias.electronica },
    { nombre: "Camiseta", precio: 20, categoria: categorias.ropa },
    { nombre: "Leche", precio: 1.5, categoria: categorias.alimentos },
    { nombre: "Pan", precio: -2, categoria: categorias.alimentos },
    { nombre: "Smartphone", precio: 800, categoria: categorias.electronica },
];
let inventarioFiltrado = inventario.filter((p) => preciofinal(p) > 0);
inventarioFiltrado = inventarioFiltrado.filter((p) => p.categoria === categorias.electronica);

inventarioFiltrado.forEach((p) => {

    if (preciofinal(p) > 0) {
        console.log(`Producto: ${p.nombre} | Precio final: $${preciofinal(p).toFixed(2)} | Nota: ${nota(p)}`)
    }
});

console.log("--------------------------------------------------");
console.log(`Total de precios finales: $${inventarioFiltrado.reduce((total, p) => total + preciofinal(p), 0).toFixed(2)}`);
