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

        arrayRenglon[myProdu.nroFila - 1].cantidad += parseInt(document.getElementById("textProd" + myProdu.id).value);

        arrayRenglon[myProdu.nroFila - 1].subtotal = (arrayRenglon[myProdu.nroFila - 1].precio * arrayRenglon[myProdu.nroFila - 1].cantidad) *iva;

        const textProdu = document.getElementById("textProd" + prod.id);
        console.log(textProdu);
        textProdu.value = 1;

        localStorage.setItem('BD', JSON.stringify(arrayRenglon))
        refreshRenglonesCarrito(arrayRenglon);
    }

}

function mostrarRenglonCarrito(renglon) {
    
    const cantidadEnCarrito = document.getElementById("cantidadProdu");

    cantidadEnCarrito.innerHTML = objetosDelCarrito;

    const cuerpoDelCarrito = document.getElementById("bodyDelCarrito");

    cuerpoDelCarrito.innerHTML = cuerpoDelCarrito.innerHTML + `<tr> <th scope="row">${renglon.nroFila}</th> <td>${renglon.id}</td>` +
    `<td>${renglon.descripcion}</td> <td>$${renglon.precio}</td> <td>${renglon.cantidad}</td> <td>$${renglon.subtotal.toFixed(2)}</td> </tr>`
}

function refreshRenglonesCarrito(carrito){
    const cantidadEnCarrito = document.getElementById("cantidadProdu");

    cantidadEnCarrito.innerHTML = objetosDelCarrito;

    objetosDelCarrito = 0;

    const cuerpoDelCarrito = document.getElementById("bodyDelCarrito");

    cuerpoDelCarrito.innerHTML = ``;

    carrito.forEach(element => {
        objetosDelCarrito += element.cantidad;

        //element.calcularRenglon(); //Obtiene el subtotal de la compra aplicando el IVA

        montoCarrito += element.subtotal;

        mostrarRenglonCarrito(element);
    });
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
