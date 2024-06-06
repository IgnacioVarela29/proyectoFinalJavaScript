let nombreDeUser = prompt("Bienvenido!\n Ingrese un nombre:");

while (nombreDeUser === '' || nombreDeUser == " " ) {
    nombreDeUser = prompt("Debe ingresar un nombre:");
};

const mensajeAMostrar = document.createElement('div');
mensajeAMostrar.innerHTML = `Virtual Wallets de ${nombreDeUser}`
const bienvenida = document.getElementById('mensajeBienvenida');
bienvenida.appendChild(mensajeAMostrar);


let botonAgregar = document.querySelector('#boton');
botonAgregar.addEventListener('click', agregarBilletera);

const billeterasDelUsuario = document.getElementById('listaDeBilleteras');
let cantidadDeBilleteras = 0;

function Billeteras(nombreDeBilletera, tipoDeMoneda, saldo) {
    this.nombreDeBilletera = nombreDeBilletera;
    this.tipoDeMoneda = tipoDeMoneda;
    this.saldo = saldo;
}

function agregarBilletera(){
    
    let nombreIngresado = document.getElementById('nombreDeWallet').value;
    let monedaIngresada = document.getElementById('moneda').value.toUpperCase();
    let saldoIngresado = document.getElementById('saldo').value;
    let nuevaBilletera = new Billeteras(nombreIngresado, monedaIngresada, saldoIngresado);

    limpiarInputs();

    const itemBilletera = document.createElement('li');
    itemBilletera.innerHTML = `
    <div>${nombreIngresado} | </div>
    <div>${monedaIngresada} | </div>
    <div>${saldoIngresado} | </div>
    <div><input type="number" id="modificarSaldo" value="${saldoIngresado}" min="0"></div>`;
    
    //BOTON PARA BORRAR BILLETERA
    const botonEliminar = document.createElement('button');
    botonEliminar.innerText = "Eliminar";
    botonEliminar.classList.add('botonEliminar');
    itemBilletera.appendChild(botonEliminar);


    botonEliminar.onclick = () => {
        itemBilletera.remove();
        cantidadDeBilleteras--;
        alert("Se elimino correctamente la billetera.\n Usted tiene: " + cantidadDeBilleteras + " billetera/s");
    } 

    billeterasDelUsuario.appendChild(itemBilletera);

    cantidadDeBilleteras++;
    alert("Billetera agregada correctamente.\n Usted tiene: " + cantidadDeBilleteras + " billetera/s");
};

function limpiarInputs(){
    document.getElementById('nombreDeWallet').value = '';
    document.getElementById('moneda').value = '';
    document.getElementById('saldo').value = '';
}

