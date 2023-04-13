// -------------------- LISTADO DE PRODUCTOS DEL CARRITO -----------------------------------------------------------
const productos = [
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
    },

    {
        id: 'AT-6450',
        descripcion: 'Jabones TODO DIA',
        precio: 1700,
        img: './img/productos/cuidados/cui4.jpeg'
    },

    {
        id: 'CC-1002',
        descripcion: 'Exilir Essencial',
        precio: 12000,
        img: './img/productos/perfumeria/perf2.jpeg'
    },

    {
        id: 'DD-6110',
        descripcion: 'Kaiak Aventura',
        precio: 6584,
        img: './img/productos/perfumeria/perf10.jpeg'
    }, 

    {
        id: 'HT-2210',
        descripcion: 'Kit Completo',
        precio: 6600,
        img: './img/productos/cuidados/cui7.jpeg'
    }
]

function guardarProductosLS(productos){
    localStorage.setItem ("productos", JSON.stringify(productos));
}

function cargarProductosLS(productos){
    return JSON.parse(localStorage.getItem("productos")) || [];
}

guardarProductosLS(productos);

// -------------------------------- LISTADO DE USUARIOS -----------------------------------------------------------
const usuarios = []

function guardarUsuariosLS(usuarios){
    localStorage.setItem ("usuarios", JSON.stringify(usuarios));
}

function cargarUsuariosLS(usuarios){
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}

async function recolectarUsuariosLS(){
    const respuesta = await fetch("https://randomuser.me/api/?results=50");
    const data = await respuesta.json();   

    let miUsuario = {
        "user": "bati",
        "nomYape": "Esteban Gonzalez",
        "password": "1234"
    }
    usuarios.push (miUsuario);   
    data.results.forEach(item => {
        miUsuario = {
            "user": item.login.username,
            "nomYape": item.name.first + " " + item.name.last,
            "password": item.login.password
        }
        usuarios.push (miUsuario);   
    });

    miUsuario = {
        "user": "colo",
        "nomYape": "Liliana Mikula",
        "password": "1234"
    }
    usuarios.push (miUsuario);  
    guardarUsuariosLS(usuarios);
};

recolectarUsuariosLS();


