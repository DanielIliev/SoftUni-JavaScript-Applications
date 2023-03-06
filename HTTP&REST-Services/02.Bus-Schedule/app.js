function solve() {

    const info = document.querySelector('div#info span.info');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');

    let nextStop = 'depot';
    let stopName = '';

    async function depart() {
        try {
            const response = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${nextStop}`);

            if (!response.ok) {
                let error = new Error();
                error.status = response.status;
                error.statusText = response.statusText;

                throw error;
            }

            const data = await response.json();
            stopName = data.name;
            nextStop = data.next;

            arriveBtn.removeAttribute('disabled');
            departBtn.setAttribute('disabled', 'true');

            info.textContent = `Next stop ${stopName}`;
            
        } catch (err) {
            console.log(err);
        }
    }

    function arrive() {
        arriveBtn.setAttribute('disabled', 'true');
        departBtn.removeAttribute('disabled');
        info.textContent = `Arriving at ${stopName}`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();