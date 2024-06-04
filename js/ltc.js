document.getElementById('ltcForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const numProyectos = parseInt(document.getElementById('proyectos').value);
    const costos = document.getElementById('costos').value.split(',').map(Number);
    const tiempos = document.getElementById('tiempos').value.split(',').map(Number);

    if (costos.length !== numProyectos || tiempos.length !== numProyectos) {
        alert('El número de costos y tiempos debe coincidir con el número de proyectos');
        return;
    }

    // Aquí se debe implementar el algoritmo del método LTC.
    const resultados = calcularLTC(numProyectos, costos, tiempos);

    mostrarResultados(resultados);
});

function calcularLTC(numProyectos, costos, tiempos) {
    // Implementar el algoritmo del método LTC.
    // Este es solo un ejemplo simplificado, deberás ajustarlo según el método exacto.
    let resultado = [];
    for (let i = 0; i < numProyectos; i++) {
        resultado.push(`Proyecto ${i+1}: Costo - ${costos[i]}, Tiempo - ${tiempos[i]}`);
    }
    return resultado;
}

function mostrarResultados(resultados) {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = '';
    resultados.forEach(res => {
        const p = document.createElement('p');
        p.textContent = res;
        resultadosDiv.appendChild(p);
    });
}
