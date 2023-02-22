function solve() {

    let response;

    function depart() {
        const request = new XMLHttpRequest();

        if (request) {
            request.open('GET', 'http://localhost:3030/jsonstore/bus/schedule/1567', true); // Initial, first id in the JSON file

            request.onload = () => {
                response = request.responseText;
                console.log(request.responseText);
            }

            request.send();
        }

        console.log(response);
    }

    function arrive() {
        console.log('Arrive TODO...');
    }

    return {
        depart,
        arrive
    };
}

let result = solve();