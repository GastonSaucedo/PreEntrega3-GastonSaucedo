fetch("./json/info.json")
    .then(respuesta => respuesta.json())
    .then(productos => principal(productos))
    .catch(error =>
        Swal.fire({
            icon: 'error',
            title: 'Lo sentimos',
            text: 'Algo salio mal al intentar cargar la página',
            color: '#ffffff',
            background: '#2b2a2a',

        }
        ).then((result) => {
            if (result.isConfirmed) {
                location.reload()
            }
        }))




function principal(productos) {

    let carrito = []
    let carritoRecuperado = localStorage.getItem("carrito")
    if (carritoRecuperado) {
        carrito = JSON.parse(carritoRecuperado)
    }

    /* MOSTRAR PRODUCTOS */
    renderizarCarrito(carrito)
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
            localStorage.setItem("carrito", JSON.stringify(carrito))

            Toastify({
                text: "Producto agregado al carrito",
                duration: 1500,
                className: "tostada",
            }).showToast();

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos',
                text: 'no contamos con mas Stock del producto seleccionado',
                color: '#ffffff',
                background: '#2b2a2a',
            })
        }
        renderizarCarrito(carrito)
    }




    /* AGREGAR AL CARRITO */


    /* MOSTRAR CARRITO */


    let botonVerOcultar = document.getElementById("mostrarCarrito")
    botonVerOcultar.addEventListener("click", mostrarOcultarCarrito)

    function mostrarOcultarCarrito() {
        if (carrito.length > 0) {
            let contenedorCarrito = document.getElementById("contenedorCarrito")
            let botonMostrarCarrito = document.getElementById("botonMostrarCarrito")

            botonMostrarCarrito.classList.toggle("fa-x")
            botonMostrarCarrito.classList.toggle("fa-cart-shopping")
            contenedorCarrito.classList.toggle("oculta")
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Carrito vacio',
                text: 'Agregue algun producto para continuar',
                color: '#ffffff',
                background: '#2b2a2a',
            })
        }
    }

    function renderizarCarrito(productosEnCarrito) {
        let divCarrito = document.getElementById("carrito")
        divCarrito.innerHTML = ""

        productosEnCarrito.forEach(producto => {
            let tarjetaProductoCarrito = document.createElement("div")
            tarjetaProductoCarrito.innerHTML = `
            <p>- ${producto.nombre}: </p>
            <span>${producto.unidades} unidad - </span>
            <span>Subtotal: $${producto.subTotal}</span> <br>
            <br>
            `
            divCarrito.appendChild(tarjetaProductoCarrito)
        })



        let comprarCarrito = document.getElementById("comprarCarrito")
        let vaciarCarrito = document.getElementById("vaciarCarrito")

        comprarCarrito.addEventListener("click", () => finalizarCompra(carrito))
        vaciarCarrito.addEventListener("click", () => vaciarElCarrito(carrito))
    }

    /* MOSTRAR CARRITO */

    /* FINALIZAR COMPRA */

    function finalizarCompra(carrito) {
        if (carrito.length > 0) {
            carrito = []
            localStorage.removeItem("carrito")
            renderizarCarrito([])
            Swal.fire({
                icon: 'success',
                title: 'Compra realizada',
                text: 'Muchas gracias por preferirnos',
                color: '#ffffff',
                background: '#2b2a2a',
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload()
                }
            })
        }
    }

    /* FINALIZAR COMPRA */

    /* VACIAR CARRITO */

    function vaciarElCarrito(carrito) {
        if (carrito.length > 0) {
            Swal.fire({
                title: '¿Vaciar el Carrito?',
                text: "NO PODRAS REVERTIR ESTA ACCIÓN",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'cancelar',
                confirmButtonText: 'Si, vaciar el carrito',
                color: '#ffffff',
                background: '#2b2a2a',
            }).then((result) => {
                if (result.isConfirmed) {
                    carrito = []
                    localStorage.removeItem("carrito")
                    renderizarCarrito([])
                    Swal.fire(
                        'El carrito fue vaciado',
                        '',
                        'success',
                    ).then((result) => {
                        if (result.isConfirmed) {
                            location.reload()
                        }
                    })
                }
            })
        }
    }

    /* VACIAR CARRITO */
}
