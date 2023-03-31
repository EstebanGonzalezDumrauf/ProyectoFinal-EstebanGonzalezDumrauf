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

// -------------------- LISTADO DE PRODUCTOS DEL CARRITO -----------------------------------------------------------
let productos = [
    {
        id: 'AB-5001',
        descripcion: 'Labial Matte Instranferible',
        precio: 3338,
        img: './img/productos/belleza/bell3.jpeg'
    },

    {
        id: 'AC-5005',
        descripcion: 'Iluminador Dúo Super Brillo',
        precio: 2645,
        img: './img/productos/belleza/bell1.jpeg'
    },

    {
        id: 'DB-7110',
        descripcion: 'Hidratante de Manos 75g',
        precio: 1120,
        img: './img/productos/cuidados/cui1.jpeg'
    }, 

    {
        id: 'CT-2350',
        descripcion: 'Body Splash Cereza',
        precio: 3513,
        img: './img/productos/perfumeria/perf5.jpeg'
    }
]

let main = document.getElementById("bolsaProductos");

function crearCards (){
    productos.forEach(prod=>{
        main.innerHTML += ` <div class="col-lg-3 col-md-6 col-sm-12">
                <div class="card justify-content-center align-items-center" style="width: 18rem; margin: auto auto; align-items: center; margin-bottom: 15px; " >
                    <div>
                        <img class= "produ" src="${prod.img}" alt="Producto mas vendido" width="250" height="250"/>
                    </div>
                    <div class="card-body text-center">
                        <div>
                            <img src="img/pie/1er.png" alt="Logo de Medalla de Oro" width="40" height="40"/>
                        </div> 
                        <h5 class="card-title">${prod.descripcion}</h5>
                        <h2 class="card-text">$ ${prod.precio}</h2>
                        <div>
                            <label for="">Cantidad:</label>
                            <input type="text" value= 1 id="textProd${prod.id}" style="margin-bottom: 15px; width: 50px; ">
                        </div>
                        <a id="botonProd${prod.id}" class="btn btn-primary">Comprar</a>
                    </div>
                </div>
            </div> `
    })
    darFuncionalidadCarrito ();
}

function darFuncionalidadCarrito (){
    productos.forEach((prod)=> {
        document.getElementById(`botonProd${prod.id}`).addEventListener('click', () =>{
            agregarAlCarrito(prod);
        })
    })
}

// function modificarRenglonCarrito (nroFila){

//     let cantidadLinea = document.getElementById("cant" + nroFila).disabled = false;
//     const botonModi = document.getElementById("botonMod" + nroFila);
//     console.log(botonModi.text);

//     if (botonModi.text=="Modificar"){
//         botonModi.innerHTML = `<a id="botonMod${nroFila}" class="btn btn-success";">Aceptar</a>`;//"Aceptar";
//         botonModi.class = "btn-success";

//     } else {
//         botonModi.innerHTML = "Modificar";
//         botonModi.innerHTML = `<a id="botonMod${nroFila}" class="btn btn-warning";">Modificar</a>`;//"Aceptar";
//         cantidadLinea = document.getElementById("cant" + nroFila).disabled = true;
//     }    
// }

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
    
        localStorage.setItem('BD', JSON.stringify(arrayRenglon))
    }

}


function eliminarRenglonCarrito (nroFila){

    montoCarrito = 0;

    arrayRenglon.splice(nroFila - 1, 1);
    //console.log(arrayRenglon);

    const cantidadEnCarrito = document.getElementById("cantidadProdu");

    cantidadEnCarrito.innerHTML = objetosDelCarrito;

    objetosDelCarrito = 0;

    const cuerpoDelCarrito = document.getElementById("bodyDelCarrito");

    cuerpoDelCarrito.innerHTML = ``;

    fila = 0;

    final = false;

    arrayRenglon.forEach(element => {

        objetosDelCarrito += element.cantidad;

        montoCarrito += element.subtotal;

        mostrarRenglonCarrito(element);
    });

    final = true;
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

    if (final == false) {

        cuerpoDelCarrito.innerHTML = `<tr> <th scope="row" style="width: 20px;">${fila}</th> <td style="width: 100px;">${renglon.id}</td>` +
        `<td>${renglon.descripcion}</td> <td>$${renglon.precio}</td> <td style="width: 10px;"><input value=${renglon.cantidad} id="cant${fila}" ` + 
        `disabled style="margin-bottom: 15px; width: 50px;"></input></td> <td id="sub${fila}">$${renglon.subtotal.toFixed(2)}</td> ` +
        `<td style="width: 50px;"><a id="botonModMas${fila}" class="btn btn-warning" onclick="sumarElementoAlCarrito(${fila});">+</a></td> ` +
        `<td style="width: 50px;"><a id="botonModMenos${fila}" class="btn btn-warning" onclick="restarElementoAlCarrito(${fila});">-</a></td> ` +
        `<td style="width: 50px;"> <a id="botonElim${fila}" class="btn btn-danger" onclick="eliminarRenglonCarrito(${fila});">Eliminar</a></td></tr>`;
        final = true;
    } else {
        cuerpoDelCarrito.innerHTML = cuerpoDelCarrito.innerHTML + `<tr> <th scope="row" style="width: 20px;">${fila}</th> <td style="width: 100px;">${renglon.id}</td>` +
        `<td>${renglon.descripcion}</td> <td>$${renglon.precio}</td> <td style="width: 10px;"><input value=${renglon.cantidad} id="cant${fila}" ` + 
        `disabled style="margin-bottom: 15px; width: 50px;"></input></td> <td id="sub${fila}">$${renglon.subtotal.toFixed(2)}</td> ` +
        `<td style="width: 50px;"><a id="botonModMas${fila}" class="btn btn-warning" onclick="sumarElementoAlCarrito(${fila});">+</a></td> ` +
        `<td style="width: 50px;"><a id="botonModMenos${fila}" class="btn btn-warning" onclick="restarElementoAlCarrito(${fila});">-</a></td> ` +
        `<td style="width: 50px;"> <a id="botonElim${fila}" class="btn btn-danger" onclick="eliminarRenglonCarrito(${fila});">Eliminar</a></td></tr>`;

    }
    
}

function refreshRenglonesCarrito(carrito){
    const cantidadEnCarrito = document.getElementById("cantidadProdu");

    cantidadEnCarrito.innerHTML = objetosDelCarrito;

    objetosDelCarrito = 0;

    const cuerpoDelCarrito = document.getElementById("bodyDelCarrito");

    cuerpoDelCarrito.innerHTML = ``;

    fila = 0;

    final = false;

    carrito.forEach(element => {
        objetosDelCarrito += element.cantidad;

        //element.calcularRenglon(); //Obtiene el subtotal de la compra aplicando el IVA

        montoCarrito += element.subtotal;

        mostrarRenglonCarrito(element);
    });

    final = true;
}



arrayRenglon = JSON.parse(localStorage.getItem('BD')) || [];
for (let j = 0; j <= arrayRenglon.length - 1; j++) {

    objetosDelCarrito = objetosDelCarrito + arrayRenglon[j].cantidad;

    montoCarrito = (montoCarrito + arrayRenglon[j].subtotal);

    mostrarRenglonCarrito(arrayRenglon[j]);

    i++; 
}

botonFinalizar.addEventListener("click", ()=> {
//Aca utilizo DOM para informar que la compra a finalizado, mostrando un resumen de lo comprado
const productosHTML = document.getElementById("listadoProdu");
productosHTML.innerHTML = `<h2> Ud. ha comprado los siguientes productos </h2>`;

const divContenedorRdoN = document.getElementById("divContenedorResultado");
divContenedorRdoN.innerHTML = divContenedorRdoN.innerHTML + `<br> <h2> TOTAL: $ ${montoCarrito.toFixed(2)} `

const divbotonFin = document.getElementById("regionBotonFinalizar");
divbotonFin.innerHTML = `<p> </p> `
})

crearCards ();