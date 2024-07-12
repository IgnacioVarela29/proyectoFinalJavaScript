//Creo links para las páginas
const seleccioneSuOpcion = document.getElementById('barraDeOpciones');
const ul = document.createElement('ul');
seleccioneSuOpcion.appendChild(ul);

const links = ["Billeteras", "GestorDeTransacciones"];

for (const link of links) {
    const li = document.createElement('li');
    if (link == "Billeteras") {
        li.innerHTML = `<a href="../billeteras/${link}.html" > ${link} </a>`
        ul.appendChild(li);
    } else {
        li.innerHTML = `<a href="../gestorDeTransacciones/${link}.html" > ${link} </a>`
        ul.appendChild(li);
    }
}

//Fetch para mostrar cotizaiones actualizadas de dolar oficial y blue desde una API.
const datosDolarOficial = 'https://dolarapi.com/v1/dolares/oficial';
fetch(datosDolarOficial)
    .then(response => response.json())
    .then(datosDolarOficial => mostrarDatosDolarOficial(datosDolarOficial))

function mostrarDatosDolarOficial(datosDolarOficial) {
    document.getElementById('compra-dolar-oficial').textContent = datosDolarOficial.compra;
    document.getElementById('venta-dolar-oficial').textContent = datosDolarOficial.venta;

}

const urlEuro = 'https://dolarapi.com/v1/dolares/blue'

fetch(urlEuro)
    .then(response => response.json())
    .then(datosDolarBlue => mostrarDatosDolarBlue(datosDolarBlue))

function mostrarDatosDolarBlue(datosDolarBlue) {
    document.getElementById('compra-dolar-blue').textContent = datosDolarBlue.compra;
    document.getElementById('venta-dolar-blue').textContent = datosDolarBlue.venta;
};

//Funcion para ver la fecha de hoy.

function fechaDeHoy() {
    let fecha = new Date();
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let anio = fecha.getFullYear();
    let horas = fecha.getHours();
    let minutos = fecha.getMinutes();
    let segundos = fecha.getSeconds();
    //Doy formato al horario
    horas = (horas <= 9) ? ("0" + horas) : horas;
    minutos = (minutos <= 9) ? ("0" + minutos) : minutos;
    segundos = (segundos <= 9) ? ("0" + segundos) : segundos;

    return `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;
}
//Actualizo la fecha de hoy cada 1 segundo
setInterval(() => {
    document.getElementById('fecha-actual').textContent = fechaDeHoy()
}, 1000);
