//Inicializo todas las variables necesarias
let comprar = true;
let opcion;
let idProducto;
let valorProducto;
let cantidadProdu;
let montoCarrito = 0;
let cantidad = 0;
let i = 1;
let objetosDelCarrito = 0;
let arrayRenglon = [];
const iva = 1.21; /*defino al IVA como constante */

// function determinarEsNumero(valor) {
//     if (isNaN(valor)) {
//         console.log("Error. No es un valor numérico el ingresado")
//         return false
//     } else {
//         return true
//     }
// }

function mostrarRenglonCarrito(renglon) {
    
    const cantidadEnCarrito = document.getElementById("cantidadProdu");

    cantidadEnCarrito.innerHTML = objetosDelCarrito;

    const cuerpoDelCarrito = document.getElementById("bodyDelCarrito");

    cuerpoDelCarrito.innerHTML = cuerpoDelCarrito.innerHTML + `<tr> <th scope="row">${renglon.nroFila}</th> <td>${renglon.id}</td>` +
    `<td>${renglon.descripcion}</td> <td>$${renglon.precio}</td> <td>${renglon.cantidad}</td> <td>$${renglon.subtotal.toFixed(2)}</td> </tr>`

}

class Renglon {
    constructor (id, precio, cantidad){
        this.nroFila;
        this.id = id;
        this.descripcion = this.descripcion;
        this.precio = precio;
        this.cantidad = cantidad;
        this.subtotal;
    }

    calcularRenglon = function () {
        this.subtotal = (this.precio * this.cantidad) *iva;
    }
}

const botonProduA = document.getElementById("botonProdA");
const botonProduB = document.getElementById("botonProdB");
const botonProduC = document.getElementById("botonProdC");
const botonProduD = document.getElementById("botonProdD");
const botonFinalizar = document.getElementById("botonFinalizar");

arrayRenglon = JSON.parse(localStorage.getItem('BD')) || [];
for (let j = 0; j <= arrayRenglon.length - 1; j++) {

    objetosDelCarrito = objetosDelCarrito + arrayRenglon[j].cantidad;

    montoCarrito = (montoCarrito + arrayRenglon[j].subtotal);

    mostrarRenglonCarrito(arrayRenglon[j]);

    i = i + 1;
}

botonProduA.addEventListener("click", ()=> {

    let renglonNew = new Renglon();
    renglonNew.nroFila = i;
    renglonNew.cantidad = parseInt(document.getElementById("textProdA").value);
    renglonNew.precio = 2338;
    renglonNew.id = "CUI-4756";
    renglonNew.descripcion = "Labial Matte Instranferible";
    renglonNew.calcularRenglon(); //Obtiene el subtotal de la compra aplicando el IVA

    //calculo el subtotal de la compra y sumo ese subtotal valorizado del carrito
    montoCarrito = (montoCarrito + renglonNew.subtotal);

    const textProduA = document.getElementById("textProdA");
    textProduA.value = 1;

    i = i + 1;
    objetosDelCarrito = objetosDelCarrito + renglonNew.cantidad;

    arrayRenglon.push (renglonNew);
    localStorage.setItem('BD', JSON.stringify(arrayRenglon))
    mostrarRenglonCarrito(renglonNew);
})

botonProduB.addEventListener("click", ()=> {

    let renglonNew = new Renglon();
    renglonNew.nroFila = i;
    renglonNew.cantidad = parseInt(document.getElementById("textProdB").value);
    renglonNew.precio = 1645;
    renglonNew.id = "CUI-4750";
    renglonNew.descripcion = "Iluminador Dúo Super Brillo";
    renglonNew.calcularRenglon(); //Obtiene el subtotal de la compra aplicando el IVA

    //calculo el subtotal de la compra y sumo ese subtotal valorizado del carrito
    montoCarrito = (montoCarrito + renglonNew.subtotal);

    const textProduB = document.getElementById("textProdB");
    textProduB.value = 1;

    objetosDelCarrito = objetosDelCarrito + renglonNew.cantidad;
    i = i + 1;

    arrayRenglon.push (renglonNew);
    localStorage.setItem('BD', JSON.stringify(arrayRenglon))
    mostrarRenglonCarrito(renglonNew);
})

botonProduC.addEventListener("click", ()=> {

    let renglonNew = new Renglon();
    renglonNew.nroFila = i;
    renglonNew.cantidad = parseInt(document.getElementById("textProdC").value);
    renglonNew.precio = 1120;
    renglonNew.id = "CUI-4700";
    renglonNew.descripcion = "Hidratante de Manos 75g";
    renglonNew.calcularRenglon(); //Obtiene el subtotal de la compra aplicando el IVA

    //calculo el subtotal de la compra y sumo ese subtotal valorizado del carrito
    montoCarrito = (montoCarrito + renglonNew.subtotal);

    const textProduC = document.getElementById("textProdC");
    textProduC.value = 1;

    objetosDelCarrito = objetosDelCarrito + renglonNew.cantidad;
    i = i + 1;

    arrayRenglon.push (renglonNew);
    localStorage.setItem('BD', JSON.stringify(arrayRenglon))
    mostrarRenglonCarrito(renglonNew);
})

botonProduD.addEventListener("click", ()=> {

    let renglonNew = new Renglon();
    renglonNew.nroFila = i;
    renglonNew.cantidad = parseInt(document.getElementById("textProdD").value);
    renglonNew.precio = 2513;
    renglonNew.id = "PERF-4000";
    renglonNew.descripcion = "Body Splash Cereza y Avellanas";
    renglonNew.calcularRenglon(); //Obtiene el subtotal de la compra aplicando el IVA

    //calculo el subtotal de la compra y sumo ese subtotal valorizado del carrito
    montoCarrito = (montoCarrito + renglonNew.subtotal);

    const textProduD = document.getElementById("textProdD");
    textProduD.value = 1;

    objetosDelCarrito = objetosDelCarrito + renglonNew.cantidad;
    i = i + 1;

    arrayRenglon.push (renglonNew);
    localStorage.setItem('BD', JSON.stringify(arrayRenglon))
    mostrarRenglonCarrito(renglonNew);
})

botonFinalizar.addEventListener("click", ()=> {
//Aca utilizo DOM para informar que la compra a finalizado, mostrando un resumen de lo comprado

    const productosHTML = document.getElementById("listadoProdu");
    productosHTML.innerHTML = `<h2> Ud. ha comprado los siguientes productos </h2>`;

        // const divContenedorRdoN = document.getElementById("divContenedorResultado");
        // divContenedorRdoN.innerHTML = ``;
        // arrayRenglon.forEach((renglonNew)=>{
        //     divContenedorRdoN.innerHTML = divContenedorRdoN.innerHTML +
        // ` <p> Nº ${renglonNew.nroFila} <br> Producto: ${renglonNew.id} <br> ${renglonNew.descripcion} ` +
        // ` <br> Precio Unitario: $ ${renglonNew.precio} <br> Cantidad: ${renglonNew.cantidad} <br> Subtotal con IVA: ` +
        // ` $ ${renglonNew.subtotal.toFixed(2)}<p> `;
        // });

    const divContenedorRdoN = document.getElementById("divContenedorResultado");
    divContenedorRdoN.innerHTML = divContenedorRdoN.innerHTML + `<br> <h2> TOTAL: $ ${montoCarrito.toFixed(2)} `

    const divbotonFin = document.getElementById("regionBotonFinalizar");
    divbotonFin.innerHTML = `<p> </p> `
})


// if (comprar==true) { /*mientras quiera seguir comprando */

//     let renglonNew = new Renglon();

//     //obtengo todos los valores, despues los tomaré de un control o componente
//     renglonNew.id = 1;//prompt ("Ingrese el PRODUCTO (ID) que desea comprar: (Ejemplo: AB-5003)");

//     //obtengo el precio del html seleccionado
//     renglonNew.precio = 600; //valorProducto.toFixed(2); //asigno el valor a la propiedad recien cdo me asegure que es un valor correcto

//     renglonNew.cantidad = 3; //lo obtengo del textbox, implementar

//     cantidad = cantidad + 1; /*al ingresar un producto al carrito incremento el contador de productos */

//     renglonNew.calcularRenglon(); //Obtiene el subtotal de la compra aplicando el IVA

//     renglonNew.nroFila = i;

//     //calculo el subtotal de la compra y sumo ese subtotal valorizado del carrito
//     montoCarrito = (montoCarrito + renglonNew.subtotal);

//     arrayRenglon.push (renglonNew);
//     i = i + 1;

//     //Muestro el renglon completo del carrito de compras, como si fuera el registro de una factura
//     //console.log("ID:(" + renglonNew.id + ")-Descripcion Producto " + cantidad + "-Cantidad:" + renglonNew.cantidad + "-Precio Producto:$" + renglonNew.precio);
//     //ACA TENGO QUE HACER UNA FUNCION PARA AGREGAR UN RENGLON EN EL HTML CON EL NUEVO PRODUCTO DEL CARRITO

// } else {

//     //informo el subtotal de la compra hasta el momento, despues lo mostraría en un componente
//     alert("Hasta ahora el monto de su carrito de compras es $" + montoCarrito.toFixed(2));

//     //pregunto si quiero seguir comprando
//     opcion = prompt ("Desea seguir comprando? (S/N)");

//     switch (opcion){
//         case "S":
//             comprar = true;
//             break;

//         case "s":
//             comprar = true;
//             break;

//         case "N":
//             comprar = false; /*e informa el monto de la compra total */
//             alert("Ud. compró " + cantidad + " producto/s por un valor total de $" + montoCarrito.toFixed(2) + "\n");
//             console.log(arrayRenglon);

//             //Uso Funciones de Orden Superior para recorrer el arreglo/carrito para mostrarselo al usuario
//             arrayRenglon.forEach((renglonNew)=>{
//                 alert("Nº " + renglonNew.nroFila + "\n" +
//                 "Producto: " + renglonNew.id + "\n" +
//                 "Precio Unitario: $" + renglonNew.precio + "\n" +
//                 "Cantidad: " + renglonNew.cantidad + "\n" +
//                 "Subtotal con IVA: $" + renglonNew.subtotal.toFixed(2));
//             });

//             //Aca utilizo DOM para informar que la compra a finalizado, mostrando un resumen de lo comprado
//             const tituloPrincipalHTML = document.getElementById("tituloPrincipal");
//             tituloPrincipalHTML.innerText = "GRACIAS POR SU COMPRA";

//             const divContenedorRdoN = document.getElementById("divContenedorResultado");
//             arrayRenglon.forEach((renglonNew)=>{
//                 divContenedorRdoN.innerHTML = divContenedorRdoN.innerHTML +
//                 ` <p> Nº ${renglonNew.nroFila} <br> Producto: ${renglonNew.id} <br> Precio Unitario: $ ${renglonNew.precio} <br> Cantidad: ${renglonNew.cantidad} <br> Subtotal con IVA: $ ${renglonNew.subtotal.toFixed(2)}<p> `
//             });

//             break;

//         case "n":
//             comprar = false; /*e informa el monto de la compra total */
//             alert("Ud. compró " + cantidad + " producto/s por un valor total de $" + montoCarrito.toFixed(2) + "\n");
//             console.log(arrayRenglon);

//             //Uso Funciones de Orden Superior para recorrer el arreglo/carrito para mostrarselo al usuario
//             arrayRenglon.forEach((renglonNew)=>{
//                 alert("Nº " + renglonNew.nroFila + "\n" +
//                 "Producto: " + renglonNew.id + "\n" +
//                 "Precio Unitario: $" + renglonNew.precio + "\n" +
//                 "Cantidad: " + renglonNew.cantidad + "\n" +
//                 "Subtotal con IVA: $" + renglonNew.subtotal.toFixed(2));
//             });

//             //Aca utilizo DOM para informar que la compra a finalizado, mostrando un resumen de lo comprado
//             const tituloPrincipalHTMLn = document.getElementById("tituloPrincipal");
//             tituloPrincipalHTMLn.innerText = "GRACIAS POR SU COMPRA";

//             const divContenedorRdon = document.getElementById("divContenedorResultado");

//             arrayRenglon.forEach((renglonNew)=>{
//                 divContenedorRdon.innerHTML = divContenedorRdon.innerHTML +
//                 ` <p> Nº ${renglonNew.nroFila} <br> Producto: ${renglonNew.id} <br> Precio Unitario: $ ${renglonNew.precio} <br> Cantidad: ${renglonNew.cantidad} <br> Subtotal con IVA: $ ${renglonNew.subtotal.toFixed(2)}<p> `
//             });

//             break;

//         default:
//             do { opcion = prompt ("Ha ingresado una opción inválida. Desea seguir comprando? (S/N)");
//             } while (opcion != "S" && opcion != "s" && opcion != "N" && opcion != "n");
//             if (opcion=="S" || opcion == "s") {
//                 comprar = true;
//             } else {
//                 comprar= false;
//             }
//     }

//}
