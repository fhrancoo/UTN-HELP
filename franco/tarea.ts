enum Categorias {
    ELECTRONICA = "Electrónica",
    ROPA = "Ropa",
    ALIMENTOS = "Alimentos",
}

type Producto = {
    nombre: string;
    precio: number;
    categoria: Categorias;
}

const precioFinal = (p: Producto): number => {
    let precioFinal = p.precio;
    try {
        if (p.precio < 0) throw new Error("El precio no puede ser negativo");

        if (p.precio > 1000) {
            precioFinal = p.precio * 0.9; // Descuento del 10%
        }

        return precioFinal
    } catch (_err) { }

    return 0;
}

const nota = (p: Producto): string | null => {
    if (p.categoria === Categorias.ALIMENTOS) {
        return "Este producto es perecedero";
    } else {
        return null;
    }
}

const inventario: Producto[] = [
    { nombre: "Laptop", precio: 1500, categoria: Categorias.ELECTRONICA },
    { nombre: "Camiseta", precio: 20, categoria: Categorias.ROPA },
    { nombre: "Leche", precio: 1.5, categoria: Categorias.ALIMENTOS },
    { nombre: "Pan", precio: -2, categoria: Categorias.ALIMENTOS },
    { nombre: "Smartphone", precio: 800, categoria: Categorias.ELECTRONICA },
];

let inventarioFiltrado = inventario.filter((p) => precioFinal(p) > 0);
inventarioFiltrado = inventarioFiltrado.filter((p) => p.categoria === Categorias.ELECTRONICA);

inventarioFiltrado.forEach((p) => {

    if (precioFinal(p) > 0) {
        console.log(`Producto: ${p.nombre} | Precio final: $${precioFinal(p).toFixed(2)} | Nota: ${nota(p)}`)
    }
});

console.log("--------------------------------------------------");
console.log(`Total de precios finales: $${inventarioFiltrado.reduce((total, p) => total + precioFinal(p), 0).toFixed(2)}`);