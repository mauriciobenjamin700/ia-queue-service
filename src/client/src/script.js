let requestCount = 0;
let requestsThisSecond = 0;
let intervalId;

function startSimulation() {
    const limit = parseInt(document.getElementById('limit').value);
    if (isNaN(limit) || limit <= 0) {
        alert('Por favor, insira um número válido.');
        return;
    }

    requestCount = 0;
    requestsThisSecond = 0;
    document.getElementById('requestCount').innerText = requestCount;
    document.getElementById('requestsPerSecond').innerText = 0;

    // Reseta o contador de requisições por segundo a cada segundo
    resetSecondIntervalId = setInterval(() => {
        requestsThisSecond = 0;
        document.getElementById('requestsPerSecond').innerText = 0;
    }, 1000);

    // Calcula o intervalo entre as requisições para respeitar o limite
    const intervalDuration = 1000 / limit;

    intervalId = setInterval(() => {
        if (requestsThisSecond < limit) {
            // Simula o envio de uma requisição
            requestCount++;
            requestsThisSecond++;
            document.getElementById('requestCount').innerText = requestCount;
            document.getElementById('requestsPerSecond').innerText = requestsThisSecond;
            const image = `Image ${requestCount}`;
            const result = Math.random() < 0.5 ? 'Success' : 'Failure'; // Simula o resultado da requisição
            addRequestToTable(image, result);
        }
    }, intervalDuration); // Intervalo calculado para respeitar o limite
}


function stopSimulation() {
    clearInterval(intervalId);
}

function resetSimulation() {
    stopSimulation();
    requestCount = 0;
    requestsThisSecond = 0;
    document.getElementById('requestCount').innerText = requestCount;
    document.getElementById('requestsPerSecond').innerText = requestsThisSecond;
    clearTable();
}

function addRequestToTable(image, result) {
    const table = document.getElementById('requestTable');
    const row = table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);

    cell1.innerHTML = image;
    cell2.innerHTML = result;

}

function clearTable() {
    const table = document.getElementById('requestTable');
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
}