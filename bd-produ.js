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
    
}

crearCards ();