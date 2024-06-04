function calculate() {
    var productName = document.getElementById('product-name').value;
    var demandRate = parseFloat(document.getElementById('demand-rate').value);
    var containerTurnaroundTime = parseFloat(document.getElementById('container-turnaround-time').value);
    var containerSize = parseFloat(document.getElementById('container-size').value);

    var N = Math.round((demandRate * containerTurnaroundTime) / (60 * containerSize));
    var maxInventory = Math.round(N * containerSize);

    var results = document.getElementById('results');
    results.innerHTML = `
        <p>¿Cuantos recipientes se necesitan para operar en el sistema?</p>
        <p>Se necesitan ${N} recipientes.</p>
        <p>¿Cuanto inventario se deberia de acumular?</p>
        <p>Se necesitan acumular un total de ${maxInventory} unidades.</p>
        <p>¿Cuantas tarjetas de Kanban se necesitan?</p>
        <p>Se necesitan 1 tarjeta de Kanban para un stock de ${maxInventory} unidades para el producto ${productName}.</p>
    `;
}
