document.addEventListener('DOMContentLoaded', function () {
    const numComponentesInput = document.getElementById('num-componentes');
    const tablaInventarioBody = document.querySelector('#tabla-inventario tbody');
    const crearTablaBtn = document.getElementById('crear-tabla-btn');
    const eliminarTablaBtn = document.getElementById('eliminar-tabla-btn');
    const tipoAlmacenajeSelect = document.getElementById('tipo-almacenaje');
    const tipoSSSelect = document.getElementById('tipo-ss');
    const calcularBtn = document.getElementById('calcular-btn');
    const kanbanColumnHeader = document.querySelector('.kanban-th'); // Selecciona el encabezado de la columna Kanbanes
    const totalKanbanTd = document.getElementById('total-kanbanes'); // Selecciona la celda para el total de Kanbanes

    let tablaGenerada = false;

    // Función para generar la tabla según el número de componentes
    function generarTabla(numComponentes) {
        // Limpiamos el contenido actual de tbody
        tablaInventarioBody.innerHTML = '';

        // Generamos las filas según el número de componentes
        for (let i = 0; i < numComponentes; i++) {
            let newRow = `
                <tr>
                    <td contenteditable="true"></td>
                    <td><input type="number" min="0" step="1"></td>
                    <td><input type="number" min="0" step="1"></td>
                    <td><input type="number" min="0" step="1"></td>
                    <td><input type="number" min="0" step="1"></td>
                    <td class="kanban-td" style="display: none;"></td> <!-- Celda oculta para los Kanbanes -->
                </tr>
            `;
            tablaInventarioBody.insertAdjacentHTML('beforeend', newRow);
        }

        // Mostrar la columna de kanbanes
        kanbanColumnHeader.style.display = 'table-cell';

        tablaGenerada = true;
    }

    // Función para eliminar la tabla
    function eliminarTabla() {
        tablaInventarioBody.innerHTML = '';
        // Ocultar la columna de kanbanes al eliminar la tabla
        kanbanColumnHeader.style.display = 'none';
        tablaGenerada = false;
    }

    // Evento click para crear tabla
    crearTablaBtn.addEventListener('click', function () {
        let numComponentes = parseInt(numComponentesInput.value);

        if (numComponentes < 1) {
            numComponentes = 1;
        }

        generarTabla(numComponentes);
    });

    // Evento click para eliminar tabla
    eliminarTablaBtn.addEventListener('click', function () {
        if (tablaGenerada) {
            eliminarTabla();
        } else {
            alert('No hay tabla generada para eliminar.');
        }
    });

    // Evento change para tipo de almacenaje
    tipoAlmacenajeSelect.addEventListener('change', function () {
        const inputs = document.querySelectorAll('#tabla-inventario input[type="number"]');
        if (tipoAlmacenajeSelect.value === 'procentual') {
            inputs.forEach(input => {
                input.setAttribute('min', '0');
                input.removeAttribute('max');
                input.setAttribute('step', '1');
            });
        } else if (tipoAlmacenajeSelect.value === 'entero') {
            inputs.forEach(input => {
                input.setAttribute('min', '0');
                input.setAttribute('max', '');
                input.setAttribute('step', 'any');
            });
        }
    });

    // Evento change para tipo de stock de seguridad
    tipoSSSelect.addEventListener('change', function () {
        const inputs = document.querySelectorAll('#tabla-inventario input[type="number"]');
        if (tipoSSSelect.value === 'procentual') {
            inputs.forEach(input => {
                input.setAttribute('min', '0');
                input.removeAttribute('max');
                input.setAttribute('step', '1');
            });
        } else if (tipoSSSelect.value === 'entero') {
            inputs.forEach(input => {
                input.setAttribute('min', '0');
                input.setAttribute('max', '');
                input.setAttribute('step', 'any');
            });
        }
    });

    // Función para calcular los kanbanes
    function calcularKanbanes() {
        const filas = tablaInventarioBody.querySelectorAll('tr');
        let totalKanbanes = 0;

        filas.forEach(fila => {
            const demanda = parseFloat(fila.querySelector('td:nth-child(2) input').value) || 0;
            const tiempoEntrega = parseFloat(fila.querySelector('td:nth-child(3) input').value) || 0;
            const stockSeguridad = parseFloat(fila.querySelector('td:nth-child(4) input').value) || 0;
            const capacidadAlmacenaje = parseFloat(fila.querySelector('td:nth-child(5) input').value) || 0;
            const tipoAlmacenaje = tipoAlmacenajeSelect.value;
            const tipoSS = tipoSSSelect.value;

            let almacenajeCalculado = 0;
            let ssCalculado = 0;

            if (tipoAlmacenaje === 'procentual') {
                // Calcular almacenaje en porcentaje
                almacenajeCalculado = demanda * (capacidadAlmacenaje / 100);
            } else if (tipoAlmacenaje === 'entero') {
                // Tomar el valor entero directamente
                almacenajeCalculado = capacidadAlmacenaje;
            }

            if (tipoSS === 'procentual') {
                // Dividir el stock de seguridad entre 100
                ssCalculado = stockSeguridad / 100;
            } else if (tipoSS === 'entero') {
                // Tomar el valor entero directamente
                ssCalculado = stockSeguridad;
            }

            // Calcular kanbanes según la fórmula
            let kanbanes = (demanda * tiempoEntrega * (1 + ssCalculado)) / almacenajeCalculado;

            // Redondear kanbanes y convertir a entero
            kanbanes = Math.round(kanbanes);

            // Mostrar el resultado en la última celda de cada fila
            const kanbanTd = fila.querySelector('.kanban-td');
            kanbanTd.textContent = kanbanes;

            // Sumar al total de kanbanes
            totalKanbanes += kanbanes;
        });

        // Mostrar la columna de kanbanes y el total
        mostrarColumnaKanbanes(totalKanbanes);
    }

    // Función para mostrar la columna de kanbanes y el total
    function mostrarColumnaKanbanes(total) {
        const kanbanHeaders = document.querySelectorAll('.kanban-th'); // Selecciona todos los encabezados de columna Kanbanes
        kanbanHeaders.forEach(header => {
            header.style.display = 'table-cell';
        });

        const filas = tablaInventarioBody.querySelectorAll('tr');
        filas.forEach(fila => {
            const kanbanTd = fila.querySelector('.kanban-td');
            kanbanTd.style.display = 'table-cell';
        });

        totalKanbanTd.textContent = total;
        totalKanbanTd.style.display = 'table-cell'; // Mostrar la celda del total de Kanbanes
    }

    // Evento click para calcular kanbanes
    calcularBtn.addEventListener('click', function () {
        calcularKanbanes();
    });

});
