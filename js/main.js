let productos = [
    { id: 1, nombre: "Equipo AMD Ryzen 5 4500 GTX1650 Pro Gamer", marca: "AMD", categoria: "armados", stock: 10, precio: 650, rutaImagen: "Equipo_AMD_Ryzen_5_4500_GTX1650_ProGamer.png" },
    { id: 2, nombre: "Equipo Intel Core I3 10100f RX6400 Pro Gamer", marca: "Intel", categoria: "armados", stock: 10, precio: 600, rutaImagen: "Equipo_Intel_Core_I3_10100f_RX6400_ProGamer.png" },
    { id: 3, nombre: "Equipo Intel Core I3 10100f RX550 Pro Gamer", marca: "Intel", categoria: "armados", stock: 10, precio: 490, rutaImagen: "Equipo_Intel_Core_I3_10100f_RX550_ProGamer.png" },
    { id: 4, nombre: "Equipo AMD Ryzen 3 3200G Radeon Graphics Pro Gamer", marca: "AMD", categoria: "armados", stock: 10, precio: 350, rutaImagen: "Equipo_AMD_Ryzen_3_3200G_RadeonGraphics_ProGamer.png" },
    { id: 5, nombre: "Nintendo Switch Lite Blue", marca: "Nintendo", categoria: "consola", stock: 1, precio: 325, rutaImagen: "Nintendo_Switch_Lite_Blue.png" },
    { id: 6, nombre: "Nintendo Switch Sports Edition", marca: "Nintendo", categoria: "consola", stock: 2, precio: 525, rutaImagen: "Nintendo_Switch_Sports_Edition.png" },
    { id: 7, nombre: "Sony PlayStation 5 Digital Edition", marca: "Sony", categoria: "consola", stock: 1, precio: 800, rutaImagen: "Sony_PlayStation_5_Digital_Edition.png" },
    { id: 8, nombre: "Microsoft Xbox Serie X", marca: "Microsoft", categoria: "consola", stock: 3, precio: 950, rutaImagen: "Microsoft_Xbox_Serie_X.png" },
]

let carrito = []


/* MOSTRAR PRODUCTOS */

renderizarProductos(productos, carrito)

function renderizarProductos(productos, carrito) {
    let contenedor = document.getElementById("contenedorProductos")
    contenedor.innerHTML = ""

    productos.forEach(producto => {
        let tarjeta = document.createElement("div")
        tarjeta.className = "contenedorProductos"

        tarjeta.innerHTML = `
        <img src= ./media/shop/${producto.rutaImagen} />
        <h5> ${producto.nombre} </h5>
        <p>$${producto.precio} </p>
        <button id=${producto.id}>Agregar</button>
        `

        contenedor.appendChild(tarjeta)
        
        let botonAgregarAlCarrito = document.getElementById(producto.id)
        botonAgregarAlCarrito.addEventListener("click", (e) => agregarProductoAlCarrito(productos, carrito, e))
    })
}

/* MOSTRAR PRODUCTOS */


/* BUSCADOR */

let buscador = document.getElementById("buscadorProductos")
buscador.addEventListener("keyup", () => filtrarProductos(productos))

function filtrarProductos(productos) {
    let productosFiltrados = productos.filter(producto => producto.nombre.includes(buscador.value))
    renderizarProductos(productosFiltrados)
}

/* BUSCADOR */

/* AGREGAR AL CARRITO */

function agregarProductoAlCarrito(productos, carrito, e) {
    let productoEnCarrito
    let productoBuscado
        

            productoBuscado = productos.find(producto => producto.id == Number(e.target.id))
            productoEnCarrito = carrito.find(producto => producto.id == productoBuscado.id)

            if (productoBuscado.stock > 0) {
                if (productoEnCarrito) {
                    productoEnCarrito.unidades++
                    productoEnCarrito.subTotal = productoEnCarrito.unidades * productoEnCarrito.precioUnitario
                } else {
                    carrito.push({
                        id: productoBuscado.id,
                        nombre: productoBuscado.nombre,
                        precioUnitario: productoBuscado.precio,
                        unidades: 1,
                        subTotal: productoBuscado.precio,
                    })
                }
                productoBuscado.stock--
                alert("el producto se agregó al carrito")
            } else {
                alert("Lo sentimos, el producto seleccionado no está disponible.")
            }
            renderizarCarrito(carrito)
        }


/* AGREGAR AL CARRITO */


/* MOSTRAR CARRITO */


let botonVerOcultar = document.getElementById("mostrarCarrito")
botonVerOcultar.addEventListener("click", mostrarOcultarCarrito)

function mostrarOcultarCarrito() {
    let contenedorCarrito = document.getElementById("contenedorCarrito")
    contenedorCarrito.classList.toggle("oculta")
}

function renderizarCarrito(productosEnCarrito) {
    let costoTotalCarrito = carrito.reduce((acum, producto) => acum + producto.subTotal, 0)

    let divCarrito = document.getElementById("carrito")
    divCarrito.innerHTML = ""

    productosEnCarrito.forEach(producto => {
        let tarjetaProductoCarrito = document.createElement("div")
        tarjetaProductoCarrito.innerHTML = `
        <span>- ${producto.nombre}: <br></span>
        <span>${producto.unidades} unidad - </span>
        <span>Subtotal: $${producto.subTotal}</span> 
        
        `
        
        divCarrito.appendChild(tarjetaProductoCarrito)
    })
}

/* MOSTRAR CARRITO */