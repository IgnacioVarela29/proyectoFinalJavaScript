let botonAgregar = document.querySelector('#boton');
botonAgregar.addEventListener('click', agregarBilletera);

// Defino la key para las billeteras que agregue el usuario
const keyDeBilleteras = localStorage.getItem('billeteras')
let billeterasParaStorage = JSON.parse(keyDeBilleteras) || []; 

const billeterasDelUsuario = document.getElementById('listaDeBilleteras');

// Constructor de billeteras
function Billeteras(nombreDeBilletera, tipoDeMoneda, saldo) {
    this.nombreDeBilletera = nombreDeBilletera;
    this.tipoDeMoneda = tipoDeMoneda;
    this.saldo = saldo;
};

// Defino función para añadir billetera, tanto a la lista, como al storage
function agregarBilletera() {
    let nombreIngresado = document.getElementById('nombreDeWallet').value;
    let monedaIngresada = document.getElementById('moneda').value.toUpperCase();
    let saldoIngresado = document.getElementById('saldo').value;
    let nuevaBilletera = new Billeteras(nombreIngresado, monedaIngresada, saldoIngresado);

    billeterasParaStorage.push(nuevaBilletera);

    localStorage.setItem('billeteras', JSON.stringify(billeterasParaStorage));

    imprimirBilleteras(nuevaBilletera);

    limpiarInputs();

    Swal.fire({
        icon: 'success',
        title: 'Se agregó la billetera',
        text: `La billetera ${nuevaBilletera.nombreDeBilletera} se agregó correctamente.`,
        position: 'center',
    });
};

// Función para eliminar billetera del storage
function eliminarBilleteraStorage(nombre) {
    billeterasParaStorage = billeterasParaStorage.filter(billetera => billetera.nombreDeBilletera !== nombre);
    localStorage.setItem('billeteras', JSON.stringify(billeterasParaStorage));
};

// Función que limpia ingresos en input
function limpiarInputs() {
    document.getElementById('nombreDeWallet').value = '';
    document.getElementById('moneda').value = '';
    document.getElementById('saldo').value = '';
};

// Función que actualiza el saldo de una billetera en el storage
function actualizarSaldoStorage(nombre, nuevoSaldo) {
    billeterasParaStorage = billeterasParaStorage.map(billetera => {
        if (billetera.nombreDeBilletera === nombre) {
            billetera.saldo = nuevoSaldo;
        }
        return billetera;
    });
    localStorage.setItem('billeteras', JSON.stringify(billeterasParaStorage));
}

// Imprime billeteras añadidas y un botón para eliminar cada una
function imprimirBilleteras(billetera) {
    const itemBilletera = document.createElement('li');
    itemBilletera.innerHTML = `
        <div>${billetera.nombreDeBilletera} | </div>
        <div>${billetera.tipoDeMoneda} | </div>
        <div><input type="number" class="modificar-saldo" value="${billetera.saldo}"></div>`;

    const botonEliminar = document.createElement('button');
    botonEliminar.innerText = "Eliminar";
    botonEliminar.classList.add('botonEliminar');
    itemBilletera.appendChild(botonEliminar);

    botonEliminar.onclick = () => {
        itemBilletera.remove();
        eliminarBilleteraStorage(billetera.nombreDeBilletera);
        
        Swal.fire({
            icon: 'success',
            title: 'Se eliminó la billetera',
            text: `La billetera ${billetera.nombreDeBilletera} se eliminó correctamente`,
            position: 'center',
            timer: 1000
        });
    };
    //La billetera tiene un input para modificar el saldo actual. Se guarda en LocalStorage.
    const inputSaldo = itemBilletera.querySelector('.modificar-saldo');
    inputSaldo.addEventListener('change', () => {
        actualizarSaldoStorage(billetera.nombreDeBilletera, inputSaldo.value);
    });

    billeterasDelUsuario.appendChild(itemBilletera);
};

// Cuando carga la página, imprime las billeteras guardadas en el storage
document.addEventListener('DOMContentLoaded', () => {
    billeterasParaStorage.forEach(billetera => {
        imprimirBilleteras(billetera);
    });
});