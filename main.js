//Inicializo todas las variables necesarias
let comprar = true;
let opcion;
let idProducto;
let valorProducto;
let cantidadProdu;
let montoCarrito = 0;
let cantidad = 0;
let i = 1;
let arrayRenglon = [];
const iva = 1.21; /*defino al IVA como constante */

function determinarEsNumero(valor) {
    if (isNaN(valor)) {
        console.log("Error. No es un valor numérico el ingresado")
        return false
    } else {
        return true
    }    
}

class Renglon {
    constructor (id, precio, cantidad){
        this.nroFila;
        this.id = id;
        this.precio = precio;
        this.cantidad = cantidad;
        this.subtotal;
    }

    calcularRenglon = function () {
        this.subtotal = (this.precio * this.cantidad) *iva;
    }
}

while (comprar==true) { /*mientras quiera seguir comprando */

    let renglonNew = new Renglon();

    //obtengo todos los valores, despues los tomaré de un control o componente
    renglonNew.id = prompt ("Ingrese el PRODUCTO (ID) que desea comprar: (Ejemplo: AB-5003)");

    //Me aseguro que ingrese un valor de codigo, sino es asi lo pido de nuevo hasta que sea correcto
    while (renglonNew.id==null) {
        renglonNew.id = prompt ("No ha ingresado un ID. Intentelo de nuevo, por favor");
    }

    valorProducto = parseFloat(prompt("Ingrese el valor del producto que desea comprar")); /* este valor lo tomaría del ID de una BD*/

    //Me aseguro que ingrese un valor numerico de precio, sino es asi lo pido de nuevo hasta que sea correcto
    while (determinarEsNumero(valorProducto)==false) {
        valorProducto = parseFloat(prompt("El valor ingresado no es correcto. Ingrese nuevamente el valor del producto que desea comprar")); /* este valor lo tomaría del ID de una BD*/
    }
    
    renglonNew.precio = valorProducto.toFixed(2); //asigno el valor a la propiedad recien cdo me asegure que es un valor correcto

    cantidadProdu = parseInt(prompt("Ingrese la cantidad del producto que desea comprar"));

    //Me aseguro que ingrese un valor numerico de cantidad, sino es asi la pido de nuevo hasta que sea correcta
    while (determinarEsNumero(cantidadProdu)==false) {
        cantidadProdu = parseInt(prompt("La cantidad ingresada no es correcta. Ingrese nuevamente la cantidad del producto que desea comprar"));
    }

    renglonNew.cantidad = cantidadProdu;

    cantidad = cantidad + 1; /*al ingresar un producto al carrito incremento el contador de productos */

    renglonNew.calcularRenglon(); //Obtiene el subtotal de la compra aplicando el IVA

    renglonNew.nroFila = i;

    //calculo el subtotal de la compra y sumo ese subtotal valorizado del carrito
    montoCarrito = (montoCarrito + renglonNew.subtotal);

    arrayRenglon.push (renglonNew);
    //arrayRenglon [i] = renglonNew;
    i = i + 1;

    //Muestro el renglon completo del carrito de compras, como si fuera el registro de una factura
    console.log("ID:(" + renglonNew.id + ")-Descripcion Producto " + cantidad + "-Cantidad:" + renglonNew.cantidad + "-Precio Producto:$" + renglonNew.precio);

    //informo el subtotal de la compra hasta el momento, despues lo mostraría en un componente
    alert("Hasta ahora el monto de su carrito de compras es $" + montoCarrito.toFixed(2));

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
            alert("Ud. compró " + cantidad + " producto/s por un valor total de $" + montoCarrito.toFixed(2) + "\n");
            console.log(arrayRenglon);

            //Uso Funciones de Orden Superior para recorrer el arreglo/carrito para mostrarselo al usuario
            arrayRenglon.forEach((renglonNew)=>{
                alert("Nº " + renglonNew.nroFila + "\n" +
                "Producto: " + renglonNew.id + "\n" + 
                "Precio Unitario: $" + renglonNew.precio + "\n" +
                "Cantidad: " + renglonNew.cantidad + "\n" +
                "Subtotal con IVA: $" + renglonNew.subtotal.toFixed(2));
            });

            //Aca utilizo DOM para informar que la compra a finalizado, mostrando un resumen de lo comprado
            const tituloPrincipalHTML = document.getElementById("tituloPrincipal");
            tituloPrincipalHTML.innerText = "GRACIAS POR SU COMPRA";

            const divContenedorRdoN = document.getElementById("divContenedorResultado");
            arrayRenglon.forEach((renglonNew)=>{
                divContenedorRdoN.innerHTML = divContenedorRdoN.innerHTML + 
                ` <p> Nº ${renglonNew.nroFila} <br> Producto: ${renglonNew.id} <br> Precio Unitario: $ ${renglonNew.precio} <br> Cantidad: ${renglonNew.cantidad} <br> Subtotal con IVA: $ ${renglonNew.subtotal.toFixed(2)}<p> `
            });

            break;

        case "n":
            comprar = false; /*e informa el monto de la compra total */
            alert("Ud. compró " + cantidad + " producto/s por un valor total de $" + montoCarrito.toFixed(2) + "\n");
            console.log(arrayRenglon);

            //Uso Funciones de Orden Superior para recorrer el arreglo/carrito para mostrarselo al usuario
            arrayRenglon.forEach((renglonNew)=>{
                alert("Nº " + renglonNew.nroFila + "\n" +
                "Producto: " + renglonNew.id + "\n" + 
                "Precio Unitario: $" + renglonNew.precio + "\n" +
                "Cantidad: " + renglonNew.cantidad + "\n" +
                "Subtotal con IVA: $" + renglonNew.subtotal.toFixed(2));
            });

            //Aca utilizo DOM para informar que la compra a finalizado, mostrando un resumen de lo comprado
            const tituloPrincipalHTMLn = document.getElementById("tituloPrincipal");
            tituloPrincipalHTMLn.innerText = "GRACIAS POR SU COMPRA";

            const divContenedorRdon = document.getElementById("divContenedorResultado");

            arrayRenglon.forEach((renglonNew)=>{
                divContenedorRdon.innerHTML = divContenedorRdon.innerHTML + 
                ` <p> Nº ${renglonNew.nroFila} <br> Producto: ${renglonNew.id} <br> Precio Unitario: $ ${renglonNew.precio} <br> Cantidad: ${renglonNew.cantidad} <br> Subtotal con IVA: $ ${renglonNew.subtotal.toFixed(2)}<p> `
            });

            break;
        
        default:
            do { opcion = prompt ("Ha ingresado una opción inválida. Desea seguir comprando? (S/N)");
            } while (opcion != "S" && opcion != "s" && opcion != "N" && opcion != "n");
            if (opcion=="S" || opcion == "s") {
                comprar = true;
            } else {
                comprar= false;
            }
    }
}