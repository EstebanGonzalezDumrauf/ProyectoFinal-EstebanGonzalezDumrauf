//Inicializo todas las variables necesarias
let comprar = true;
let opcion;
let idProducto;
let valorProducto;
let cantidadProdu;
let montoCarrito = 0;
let cantidad = 0;
const iva = 1.21; /*defino al IVA como constante */

while (comprar==true) { /*mientras quiera seguir comprando */

    //obtengo todos los valores, despues los tomaré de un control o componente
    idProducto = prompt ("Ingrese el PRODUCTO (ID) que desea comprar");
    valorProducto = parseFloat(prompt("Ingrese el valor del producto que desea comprar")); /* este valor lo tomaría del ID de una BD*/
    cantidadProdu = parseInt(prompt("Ingrese la cantidad del producto que desea comprar"));
    cantidad = cantidad + 1; /*al ingresar un producto al carrito incremento el contador de productos */

    //calculo el subtotal de la compra y sumo ese subtotal valorizado del carrito
    montoCarrito = (montoCarrito + (valorProducto * cantidadProdu))*iva;

    //informo el subtotal de la compra hasta el momento, despues lo mostraría en un componente
    alert("Hasta ahora el monto de su carrito de compras es $" + montoCarrito);

    //pregunto si quiero seguir comprando
    opcion = prompt ("Desea seguir comprando? (S/N)");

    //si el usuario ingresó S o s sigue comprando, sino sale de la compra
    if (opcion =="S" || opcion =="s" ){
        comprar = true;
    } else {
        comprar = false; /*e informa el monto de la compra total */
        alert("Ud. compró " + cantidad + " productos por un valor total de $" + montoCarrito);
    }
}