enum Categoria {
    ELECTRONICA = "Electronica",
    ROPA = "Ropa",
    ALIMENTOS = "Alimentos" 
}

type Producto = {
    nombre: string,
    precio: number,
    categoria: Categoria
}

const obtenerPrecioFinal = (p: Producto): number => 
{
    let precioFinal = p.precio

    try{
        if(p.precio < 0) throw new Error(`El precio de ${p.nombre} no puede ser 0`);
        
        if(p.precio > 1000){
            precioFinal = p.precio * 0.90
        }
    }catch(error: any) {}
    
    return precioFinal
}

const nota = (p: Producto): string | null => 
{
    if(p.categoria === Categoria.ALIMENTOS)
        {
            return 'Este producto es perecedero'
        }else
            return null

}

const inventario: Producto[] =
[
    {nombre: 'Manzana', precio: 1500, categoria: Categoria.ALIMENTOS},
    {nombre: 'Laptop', precio: 10000, categoria: Categoria.ELECTRONICA},
    {nombre: 'Remera', precio: -20, categoria: Categoria.ROPA},
    {nombre: 'Mouse', precio: 15000, categoria: Categoria.ELECTRONICA},
    {nombre: 'Pantalon', precio: 4500, categoria: Categoria.ROPA}
]

let inventarioFiltrado = inventario.filter((p) => obtenerPrecioFinal(p) > 0)

inventarioFiltrado.forEach((p) =>
    {
        if(obtenerPrecioFinal(p) > 0)
        {
         console.log(`Producto: ${p.nombre} | Precio final: ${obtenerPrecioFinal(p).toFixed(2)} | Nota: ${nota(p)}`)
        }
    })
console.log('----------------------------------')
console.log(`Total de precios finales: ${inventarioFiltrado.reduce((total, p) => total + obtenerPrecioFinal(p), 0).toFixed(2)}`)