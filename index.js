function contarProdCarrito(){
    const cantidadEnCarrito = document.getElementById("cantidadProdu");

    cantidadEnCarrito.innerHTML = objetosDelCarrito;

    console.log(objetosDelCarrito);
}

contarProdCarrito();