async function getInfo() {
    // Note: The service will respond with valid data to IDs 1287, 1308, 1327 and 2334.
    const httpReq = new XMLHttpRequest();
    const stopId = document.getElementById('stopId');
    const stopName = document.getElementById('stopName');
    const buses = document.getElementById('buses');
    let station = {};

    clearValues();
    try {
        const response = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopId.value}`);
        const data = await response.json();
        document.getElementById('stopName').textContent = data.name;
        Object.entries(data.buses).forEach(([busId, time]) => {
            const liElement = document.createElement('li');
            liElement.textContent = `Bus ${busId} arrives in ${time} minutes`;
            buses.appendChild(liElement);
        });
    } catch (err) {
        document.getElementById('stopName').textContent = 'Error';
    }

    function clearValues() {
        let lastChild = buses.lastChild;

        while (buses.lastChild) {
            lastChild.remove();
            lastChild = buses.lastChild;
        }
    }
}