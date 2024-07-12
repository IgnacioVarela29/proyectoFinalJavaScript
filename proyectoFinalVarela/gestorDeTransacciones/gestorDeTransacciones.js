    let saldoUsuario = 0;
    let cantidadDeMovimientos = 0;

    //Intento cargar de datos de LocalStorage. Si no hay nada es objeto vacio o 0.
    const datosLocal = JSON.parse(localStorage.getItem('gestionSaldo')) || {};
    cantidadDeMovimientos = datosLocal.cantidadDeMovimientos || 0;
    saldoUsuario = datosLocal.saldoUsuario || 0;

    datosLocal.movimientos = datosLocal.movimientos || [];
    datosLocal.movimientos.forEach(mov => muestroMovimiento(mov.text));//Cada movimiento guardado local lo muestra.

    
    mostrarSaldoUsuario();
    
    document.getElementById('formulario-operacion').addEventListener('submit', function (validoFormulario) {
        validoFormulario.preventDefault(); //Permito la validacion de los datos del forms.
        
        // INGRESOS Y SUS VALIDACIONES:
        const tipoDeOperacion = document.querySelector('input[name="tipo-operacion"]:checked');
        if (!tipoDeOperacion) {
            Swal.fire({
                icon: 'question',
                title: '¿Qué operación desea realizar?',
                text: 'Debe seleccionar una opción (Ingreso de dinero o Gasto) para continuar.',
                position: 'center'
            });
            return;
        }
        
        const monto = parseFloat(document.getElementById('monto').value);
        const tipoTransaccion = document.getElementById('nombre-operacion').value;
        
        if (!tipoTransaccion || isNaN(monto) || monto <= 0) {
            Swal.fire({
                icon: 'info',
                title: 'Campos vacíos',
                text: 'Debe ingresar el nombre del movimiento y un monto válido.',
                position: 'center'
            });
            return;
        }
        
        let textoDeTransaccion = '';
        
        if (tipoDeOperacion.value == 1) {
            saldoUsuario += monto;
            textoDeTransaccion = `Ingreso por ${tipoTransaccion}: + $${monto}`;
        } else if (tipoDeOperacion.value == 2) {
            if (monto > saldoUsuario) {
                Swal.fire({
                    icon: 'error',
                    title: 'No se pudo realizar la operación',
                    text: 'No tiene suficiente saldo para realizar este gasto.',
                    position: 'center'
                });
                return;
            }
            saldoUsuario -= monto;
            textoDeTransaccion = `Gasto en ${tipoTransaccion}: - $${monto}`;
        }
        
        cantidadDeMovimientos++;
        
        mostrarSaldoUsuario();
        
        muestroMovimiento(textoDeTransaccion);
        guardarEnLocalStorage();
        
        Swal.fire({
            icon: 'success',
            title: 'Movimiento registrado',
            text: textoDeTransaccion,
            position: 'center'
        });
        
        limpiarInputs();
    });
    
    //funcion para limpiar inputs
    function limpiarInputs() {
        document.getElementById('nombre-operacion').value = '';
        document.getElementById('monto').value = '';
    };

    //funcion para imprimir el saldo del user
    function mostrarSaldoUsuario(){
        document.getElementById('saldo').textContent = saldoUsuario;
    };

    //Funcion que imprime cada movimiento en HTML
    function muestroMovimiento(text) {
        const movimiento = document.createElement('li');
        const linea = document.createElement('hr');
        movimiento.textContent = text;
        document.getElementById('lista-movimientos').appendChild(movimiento);
        document.getElementById('lista-movimientos').appendChild(linea);
    };
    
    //Funcion para guardar datos en LocalStorage
    function guardarEnLocalStorage() {
        const listaMovimientos = document.querySelectorAll('#lista-movimientos li');
        const movimientos = [];

        listaMovimientos.forEach(movimiento => {
            movimientos.push({ text: movimiento.innerText });
        });

        const datosLocal = {
            cantidadDeMovimientos,
            movimientos,
            saldoUsuario // Guardar todos estos datos en LocalStorage
        };

        localStorage.setItem('gestionSaldo', JSON.stringify(datosLocal));
    }

    //funcion para mostrar resumen en el HTML
    function mostrarResumen() {
        document.getElementById('resumen-parcial')
        const resumenParcial = `Usted tiene: $${saldoUsuario} actualmente y realizó: ${cantidadDeMovimientos} movimientos.`;
        document.getElementById('resumen').textContent = resumenParcial;
    }

    //Muestro resumen de transacciones automáticamente cada 10 segundos 
    setInterval(function () {
        setTimeout(mostrarResumen(), 10000);
    })

    // Boton de reinicio total
    document.getElementById('reiniciar').addEventListener('click', function () {
        //Reinicia valores
        cantidadDeMovimientos = 0;
        saldoUsuario = 0;
        document.getElementById('saldo').textContent = saldoUsuario;
        document.getElementById('lista-movimientos').innerHTML = '';
        document.getElementById('resumen').textContent = '';

        // Limpio LocalStorage
        localStorage.removeItem('gestionSaldo');
    });