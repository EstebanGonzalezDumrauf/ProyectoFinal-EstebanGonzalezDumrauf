//Inicializo todas las variables necesarias
let comprar = true;
let opcion;
let idProducto;
let valorProducto;
let cantidadProdu;
let montoCarrito = 0;
let cantidad = 0;
const iva = 1.21; /*defino al IVA como constante */

function determinarEsNumero(valor) {
    if (isNaN(valor)) {
        console.log("Error. No es un valor numérico el ingresado")
        return false
    } else {
        return true
    }    
}

while (comprar==true) { /*mientras quiera seguir comprando */

    //obtengo todos los valores, despues los tomaré de un control o componente
    idProducto = prompt ("Ingrese el PRODUCTO (ID) que desea comprar: (Ejemplo: AB-5003)");
    valorProducto = parseFloat(prompt("Ingrese el valor del producto que desea comprar")); /* este valor lo tomaría del ID de una BD*/
    
    //Me aseguro que ingrese un valor numerico de precio, sino es asi lo pido de nuevo hasta que sea correcto
    while (determinarEsNumero(valorProducto)==false) {
        valorProducto = parseFloat(prompt("El valor ingresado no es correcto. Ingrese nuevamente el valor del producto que desea comprar")); /* este valor lo tomaría del ID de una BD*/
    }
    
    cantidadProdu = parseInt(prompt("Ingrese la cantidad del producto que desea comprar"));

    //Me aseguro que ingrese un valor numerico de cantidad, sino es asi la pido de nuevo hasta que sea correcta
    while (determinarEsNumero(cantidadProdu)==false) {
        cantidadProdu = parseInt(prompt("La cantidad ingresada no es correcta. Ingrese nuevamente la cantidad del producto que desea comprar"));
    }

    cantidad = cantidad + 1; /*al ingresar un producto al carrito incremento el contador de productos */

    //calculo el subtotal de la compra y sumo ese subtotal valorizado del carrito
    montoCarrito = (montoCarrito + ((valorProducto * cantidadProdu) *iva));

    //Muestro el renglon completo del carrito de compras, como si fuera el registro de una factura
    console.log("ID:(" + idProducto + ")-Descripcion Producto " + cantidad + "-Cantidad:" + cantidadProdu + "-Precio Producto:$" + valorProducto);

    //informo el subtotal de la compra hasta el momento, despues lo mostraría en un componente
    alert("Hasta ahora el monto de su carrito de compras es $" + montoCarrito);

    //pregunto si quiero seguir comprando
    opcion = prompt ("Desea seguir comprando? (S/N)");

    switch (opcion){
        case "S":
            comprar = true;
            break;
        
        case "s":
            comprar = true;
            break;

        case "N":
            comprar = false; /*e informa el monto de la compra total */
            alert("Ud. compró " + cantidad + " producto/s por un valor total de $" + montoCarrito);
            break;

        case "n":
            comprar = false; /*e informa el monto de la compra total */
            alert("Ud. compró " + cantidad + " producto/s por un valor total de $" + montoCarrito);
            break;
        
        default:
            do {
    	        opcion = prompt ("Ha ingresado una opción inválida. Desea seguir comprando? (S/N)");
            } while (opcion != "S" && opcion != "s" && opcion != "N" && opcion != "n");
            if (opcion=="S" || opcion == "s") {
                comprar = true;
            } else {
                comprar= false;
            }
    }
}