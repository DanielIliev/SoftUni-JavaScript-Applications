function getInfo() {
    // Note: The service will respond with valid data to IDs 1287, 1308, 1327 and 2334.
    const httpReq = new XMLHttpRequest();
    const stopId = document.getElementById('stopId');
    const stopName = document.getElementById('stopName');
    const buses = document.getElementById('buses');
    let station = {};

    if (stopId.value) {
        clearPreviousData();
        if (!httpReq) {
            console.warn('Unable to create AJAX instance');
            return false;
        }
    
        httpReq.open('GET', `http://localhost:3030/jsonstore/bus/businfo/${stopId.value}`, true);
        httpReq.getResponseHeader('Content-type', 'application/json');

        // Validate if the received response is JSON
        try {
            JSON.parse(httpReq.responseText);
        } catch (e) {
            stopName.textContent = 'Error';
        }
    
        httpReq.onload = () => {
            if (!httpReq.responseText) {
                stopName.textContent = 'Error';
            } else {
                station = JSON.parse(httpReq.responseText);
                generateDOM();
            }
        }

        httpReq.send();
    } else {
        stopName.textContent = 'Error';
    }

    function validateJSON(str) {
        try {
            JSON.parse(str)
        } catch (e) {
            return false;
        }
    }

    function generateDOM() {
        stopName.textContent = station.name;

        let busesValues = station.buses;

        for (const bus of Object.entries(busesValues)) {
            let li = document.createElement('li');
            li.textContent = `Bus ${bus[0]} arrives in ${bus[1]} minutes`;
            buses.appendChild(li);
        }
    }
    
    function clearPreviousData() {
        let child = buses.lastChild;

        while (buses.lastChild) {
            child.remove();
            child = buses.lastChild;
        }
    }
}