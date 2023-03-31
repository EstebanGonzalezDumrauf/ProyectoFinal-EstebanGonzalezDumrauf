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
    }
]

function guardarProductosLS(productos){
    localStorage.setItem ("productos", JSON.stringify(productos));
}

function cargarProductosLS(productos){
    return JSON.parse(localStorage.getItem("productos")) || [];
}

guardarProductosLS(productos);