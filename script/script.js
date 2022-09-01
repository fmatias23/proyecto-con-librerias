const botonClick = document.querySelectorAll(".button");
const tbody = document.querySelector(".tbody");

let carrito = [];

botonClick.forEach(btn => {
    btn.addEventListener("click", addCarrito)
    
})

function addCarrito(e) {
    const button = e.target
    const item = button.closest(".card")
    const tituloItem = item.querySelector(".card-title").textContent;
    const itemPrice = item.querySelector(".precio").textContent;
    const imgItem = item.querySelector(".card-img-top").src;

    const nuevoItem = {
        title: tituloItem,
        precio: itemPrice,
        imagen: imgItem,
        cantidad: 1
    }

    addItemCarrito(nuevoItem)
}

function addItemCarrito(nuevoItem) {

    const inputElemento = tbody.getElementsByClassName("input__elment")
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].title.trim() === nuevoItem.title.trim()) {
            carrito[i].cantidad++;
            const inputValue = inputElemento[i]
            inputValue.value++;
            totalCarrito()
            return null;
        }
    }


    
    carrito.push(nuevoItem)


// INCORPORANDO LIBRERIAS *          (acomodar segun el producto de id) 

    Toastify({

        text: "Producto agregado",
        
        duration: 2000
        
        }).showToast()
    mostrarCarrito();

    
}

function mostrarCarrito() {
    tbody.innerHTML = ''
    carrito.map(item => {
        const tr = document.createElement("tr")
        tr.classList.add("itemCarrito")
        const content = `
                   
                    <td class="table__Productos">
                      <img src=${item.imagen} alt="">
                      <h6 class="titulo">${item.title}</h6>
                    </td>
                    <td class="table__precio"><span>${item.precio}</span></td>
                    <td class="table__cantidad">
                      <input type="number" min="1" value=${item.cantidad} class="input__elment">
                      <button class="delete btn btn-danger">X</button>
                    </td>`
        tr.innerHTML = content;
        tbody.append(tr)


        tr.querySelector(".delete").addEventListener("click", removeCarrito)
        tr.querySelector(".input__elment").addEventListener("change", sumarCantidad)
    })
    
    totalCarrito()
}

function totalCarrito() {
    let total = 0;
    const totalItems = document.querySelector(".totalItems")
    carrito.forEach((item) => {
        const precio = Number(item.precio.replace("$", ''))
        total = total + precio * item.cantidad
    })

    totalItems.innerHTML = `total $${total}`
    addStorage()
}

function removeCarrito(e) {
    const botonBorrar = e.target
    const tr = botonBorrar.closest(".itemCarrito")
    const title = tr.querySelector(".titulo").textContent;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].title.trim() === title.trim()) {
            carrito.splice(i, 1)
        }
    }
    tr.remove()
    totalCarrito()
}

function sumarCantidad(e) {
    const suma = e.target
    const tr = suma.closest(".itemCarrito")
    const title = tr.querySelector(".titulo").textContent;
    carrito.forEach(item => {
        if (item.title.trim() === title) {
            suma.value < 1 ? (suma.value = 1) : suma.value;    // usando operador ternario
            item.cantidad = suma.value;
            totalCarrito()
        }
    })
}



// LOCALSTORAGE 

function addStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

window.onload = function () {
    const lstorage = JSON.parse(localStorage.getItem("carrito"));
    if (lstorage) {
        carrito = lstorage;
        mostrarCarrito()
    }
}