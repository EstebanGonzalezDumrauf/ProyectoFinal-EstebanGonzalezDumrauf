//Inicializo todas las variables necesarias
let comprar = true;
let opcion;
let idProducto;
let valorProducto;
let cantidadProdu;
let montoCarrito = 0;
let cantidad = 0;
let i = 1;
let fila = 0;
let final = true;
let objetosDelCarrito = 0;
let arrayRenglon = [];
const iva = 1.21; /*defino al IVA como constante */

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

function vaciarCarrito (){
    localStorage.removeItem("BD");
    objetosDelCarrito = 0;
    arrayRenglon = [];
    mostrarCantiCarrito(arrayRenglon);
    refreshRenglonesCarrito(arrayRenglon);
    mostrarMensajeVacio();

    const divbotonFin = document.getElementById("regionBotonFinalizar");
    divbotonFin.innerHTML = `<a href="index.html" id="botonFinalizar" class="btn btn-primary">VOLVER A PRODUCTOS</a>`
    
}

function finalizarCompra (){
    const cuerpoDelCarrito = document.getElementById("bodyDelCarrito");
    cuerpoDelCarrito.innerHTML= ``;

    const encabezadoDeTabla = document.getElementById("encabezadoTabla");
    encabezadoDeTabla.innerHTML= `<th scope="col">#</th><th scope="col">Codigo</th><th scope="col">Descripción</th><th scope="col">Precio</th><th scope="col">Cantidad</th><th scope="col">Subtotal c/IVA</th>`;

    arrayRenglon.forEach(element => {

        cuerpoDelCarrito.innerHTML = cuerpoDelCarrito.innerHTML + `<tr> <th scope="row" style="width: 20px;"><img src=".${element.img}" alt="miniatura" width="42" height="42"/></th> <td style="width: 100px;">${element.id}</td>` + `<td>${element.descripcion}</td> <td>$${element.precio}</td> <td style="width: 10px;"><input value=${element.cantidad} ` + `disabled style="margin-bottom: 15px; width: 50px;"></input></td> <td>$${element.subtotal.toFixed(2)}</td></th></tr> `;

    });
    localStorage.removeItem("BD");
    arrayRenglon = [];
    mostrarCantiCarrito(arrayRenglon);
}

function sumarElementoAlCarrito (nroFila){
    arrayRenglon[nroFila - 1].cantidad++;

    const cantidadEnCarrito = document.getElementById("cantidadProdu");
    objetosDelCarrito++;
    cantidadEnCarrito.innerHTML = objetosDelCarrito;

    const cantidadDelRenglon = document.getElementById("cant" + nroFila);
    cantidadDelRenglon.value = arrayRenglon[nroFila - 1].cantidad;

    arrayRenglon[nroFila - 1].subtotal = (arrayRenglon[nroFila - 1].precio * arrayRenglon[nroFila - 1].cantidad) *iva;

    montoCarrito = (montoCarrito + (arrayRenglon[nroFila - 1].precio * iva));


    const textSub = document.getElementById("sub" + nroFila);
    textSub.innerHTML = "$" + arrayRenglon[nroFila - 1].subtotal.toFixed(2);

    mostrarTotalCompra();

    localStorage.setItem('BD', JSON.stringify(arrayRenglon))
}

function restarElementoAlCarrito (nroFila){

    if (arrayRenglon[nroFila - 1].cantidad > 1) {
        arrayRenglon[nroFila - 1].cantidad--;

        const cantidadEnCarrito = document.getElementById("cantidadProdu");
        objetosDelCarrito--;
        cantidadEnCarrito.innerHTML = objetosDelCarrito;

        const cantidadDelRenglon = document.getElementById("cant" + nroFila);
        cantidadDelRenglon.value = arrayRenglon[nroFila - 1].cantidad;

        arrayRenglon[nroFila - 1].subtotal = (arrayRenglon[nroFila - 1].precio * arrayRenglon[nroFila - 1].cantidad) *iva;

        montoCarrito = (montoCarrito - (arrayRenglon[nroFila - 1].precio * iva));

        console.log(arrayRenglon[nroFila - 1].subtotal);
        const textSub = document.getElementById("sub" + nroFila);
        textSub.innerHTML = "$" + arrayRenglon[nroFila - 1].subtotal.toFixed(2);

        mostrarTotalCompra();

        localStorage.setItem('BD', JSON.stringify(arrayRenglon))
    }

}

function eliminarRenglonCarrito (nroFila){

    montoCarrito = 0;

    arrayRenglon.splice(nroFila - 1, 1);

    const cantidadEnCarrito = document.getElementById("cantidadProdu");

    cantidadEnCarrito.innerHTML = objetosDelCarrito;

    objetosDelCarrito = 0;

    const cuerpoDelCarrito = document.getElementById("bodyDelCarrito");

    cuerpoDelCarrito.innerHTML = ``;

    fila = 0;
    montoCarrito = 0;

    final = false;

    arrayRenglon.forEach(element => {

        objetosDelCarrito += element.cantidad;

        montoCarrito += element.subtotal;

        mostrarRenglonCarrito(element);
    });

    final = true;

    mostrarTotalCompra();
    localStorage.setItem('BD', JSON.stringify(arrayRenglon))
}

function agregarAlCarrito (prod){
    let renglonNew = new Renglon();
    renglonNew.nroFila = i;

    //buscar si ya existe el renglon ***************************
    let existe = arrayRenglon.some(element=>element.id === prod.id)

    if (existe === false) {
        renglonNew.precio = prod.precio;
        renglonNew.id = prod.id;
        renglonNew.img = prod.img;
        renglonNew.cantidad = parseInt(document.getElementById("textProd" + prod.id).value);
        renglonNew.descripcion = prod.descripcion;
        renglonNew.calcularRenglon(); //Obtiene el subtotal de la compra aplicando el IVA

        //calculo el subtotal de la compra y sumo ese subtotal valorizado del carrito
        montoCarrito = (montoCarrito + renglonNew.subtotal);

        const textProdu = document.getElementById("textProd" + prod.id);
        textProdu.value = 1;

        i++; // i = i + 1;

        objetosDelCarrito = objetosDelCarrito + renglonNew.cantidad;

        arrayRenglon.push (renglonNew);
        localStorage.setItem('BD', JSON.stringify(arrayRenglon))
        mostrarRenglonCarrito(renglonNew);
    } else {
        let myProdu = arrayRenglon.find((element)=> element.id === prod.id);

        let indiceExist = arrayRenglon.indexOf(myProdu);

        indiceExist++;

        arrayRenglon[indiceExist - 1].cantidad += parseInt(document.getElementById("textProd" + myProdu.id).value);

        arrayRenglon[indiceExist - 1].subtotal = (arrayRenglon[indiceExist - 1].precio * arrayRenglon[indiceExist - 1].cantidad) *iva;

        const textProdu = document.getElementById("textProd" + prod.id);

        textProdu.value = 1;

        localStorage.setItem('BD', JSON.stringify(arrayRenglon))
        refreshRenglonesCarrito(arrayRenglon);
    }

}

function mostrarRenglonCarrito(renglon) {

    const cantidadEnCarrito = document.getElementById("cantidadProdu");

    cantidadEnCarrito.innerHTML = objetosDelCarrito;

    const cuerpoDelCarrito = document.getElementById("bodyDelCarrito");

    fila++;

    if (final == false) { //${fila}

        cuerpoDelCarrito.innerHTML = `<tr> <th scope="row" style="width: 20px;"><img src=".${renglon.img}" alt="miniatura" width="42" height="42"/></th> <td style="width: 100px;">${renglon.id}</td>` +
        `<td>${renglon.descripcion}</td> <td>$${renglon.precio}</td> <td style="width: 10px;"><input value=${renglon.cantidad} id="cant${fila}" ` +
        `disabled style="margin-bottom: 15px; width: 50px;"></input></td> <td id="sub${fila}">$${renglon.subtotal.toFixed(2)}</td> ` +
        `<td style="width: 50px;"><a id="botonModMas${fila}" class="btn btn-warning" onclick="sumarElementoAlCarrito(${fila});">+</a></td> ` +
        `<td style="width: 50px;"><a id="botonModMenos${fila}" class="btn btn-warning" onclick="restarElementoAlCarrito(${fila});">-</a></td> ` +
        `<td style="width: 50px;"> <a id="botonElim${fila}" class="btn btn-danger" onclick="eliminarRenglonCarrito(${fila});">Eliminar</a></td></tr>`;
        final = true;
    } else {
        cuerpoDelCarrito.innerHTML = cuerpoDelCarrito.innerHTML + `<tr> <th scope="row" style="width: 20px; d-flex align-items-center justify-content-center"><img src=".${renglon.img}" alt="miniatura" width="42" height="42"/></th> <td style="width: 100px;">${renglon.id}</td>` +
        `<td>${renglon.descripcion}</td> <td>$${renglon.precio}</td> <td style="width: 10px;"><input value=${renglon.cantidad} id="cant${fila}" ` +
        `disabled style="margin-bottom: 15px; width: 50px;"></input></td> <td id="sub${fila}">$${renglon.subtotal.toFixed(2)}</td> ` +
        `<td style="width: 50px;"><a id="botonModMas${fila}" class="btn btn-warning" onclick="sumarElementoAlCarrito(${fila});">+</a></td> ` +
        `<td style="width: 50px;"><a id="botonModMenos${fila}" class="btn btn-warning" onclick="restarElementoAlCarrito(${fila});">-</a></td> ` +
        `<td style="width: 50px;"> <a id="botonElim${fila}" class="btn btn-danger" onclick="eliminarRenglonCarrito(${fila});">Eliminar</a></td></tr>`;

    }
}

function mostrarCantiCarrito(renglon) {

    const cantidadEnCarrito = document.getElementById("cantidadProdu");

    cantidadEnCarrito.innerHTML = objetosDelCarrito;
}

function mostrarMensajeVacio(){
    console.log(objetosDelCarrito);
    if (objetosDelCarrito == 0) {
        const tablaDelCarrito = document.getElementById("tablaCarrito");

        tablaDelCarrito.innerHTML = ``;

        const mensajeAlerta = document.getElementById("regionMensajeAlerta");

        mensajeAlerta.innerHTML = `<div class="alert alert-warning" role="alert">Carrito Vacío. No tiene productos seleccionados.</div>`;

        montoCarrito = 0;
        const divContenedorRdoN = document.getElementById("divContenedorResultado");
        divContenedorRdoN.innerHTML = ``;

        const divbotonFin = document.getElementById("regionBotonFinalizar");
        divbotonFin.innerHTML = `<a href="index.html" id="botonFinalizar" class="btn btn-primary">VOLVER A PRODUCTOS</a>`
    }
}

function mostrarTotalCompra(){
    if (objetosDelCarrito != 0) {
    const divContenedorRdoN = document.getElementById("divContenedorResultado");
    divContenedorRdoN.innerHTML = `<br> <h2> TOTAL: $ ${montoCarrito.toFixed(2)} <br><br>`
    }
}

function refreshRenglonesCarrito(carrito){
    // console.log(objetosDelCarrito);
    if (objetosDelCarrito == 0) {
        const tablaDelCarrito = document.getElementById("tablaCarrito");

        tablaDelCarrito.innerHTML = ``;

        const mensajeAlerta = document.getElementById("regionMensajeAlerta");

        mensajeAlerta.innerHTML = `<div class="alert alert-warning" role="alert">Carrito Vacío. No tiene productos seleccionados.</div>`;

        mostrarMensajeVacio();
    } else {
        const cantidadEnCarrito = document.getElementById("cantidadProdu");

        cantidadEnCarrito.innerHTML = objetosDelCarrito;

        objetosDelCarrito = 0;

        const cuerpoDelCarrito = document.getElementById("bodyDelCarrito");

        cuerpoDelCarrito.innerHTML = ``;

        fila = 0;

        final = false;

        carrito.forEach(element => {
            objetosDelCarrito += element.cantidad;

            montoCarrito += element.subtotal;

            mostrarCantiCarrito(element);
        });

        final = true;
    }
}



arrayRenglon = JSON.parse(localStorage.getItem('BD')) || [];
for (let j = 0; j <= arrayRenglon.length - 1; j++) {

    objetosDelCarrito = objetosDelCarrito + arrayRenglon[j].cantidad;

    montoCarrito = (montoCarrito + arrayRenglon[j].subtotal);

    mostrarRenglonCarrito(arrayRenglon[j]);

    i++;
}
mostrarMensajeVacio();
mostrarTotalCompra();


botonFinalizar.addEventListener("click", ()=> {
//Aca utilizo DOM para informar que la compra a finalizado, mostrando un resumen de lo comprado
const productosHTML = document.getElementById("listadoProdu");
productosHTML.innerHTML = `<h2> Ud. ha comprado los siguientes productos </h2> <br>`;

// const divContenedorRdoN = document.getElementById("divContenedorResultado");
// divContenedorRdoN.innerHTML = divContenedorRdoN.innerHTML + `<br> <h2> TOTAL: $ ${montoCarrito.toFixed(2)} `

const divbotonFin = document.getElementById("regionBotonFinalizar");
divbotonFin.innerHTML = `<p> </p> `

finalizarCompra();

Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Pedido Realizado. <br>Muchas gracias!!',
    showConfirmButton: false,
    timer: 3500
})
})
