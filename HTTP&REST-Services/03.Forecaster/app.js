function attachEvents() {
    // Addresses
    // http://localhost:3030/jsonstore/forecaster/locations
    // http://localhost:3030/jsonstore/forecaster/today/:code
    // http://localhost:3030/jsonstore/forecaster/upcoming/:code
    // ---------------------------------------------------------------------

    const locationId = document.getElementById('location');
    const submitBtn = document.getElementById('submit');
    const forecast = document.getElementById('forecast');
    const current = document.getElementById('current');
    const upcoming = document.getElementById('upcoming');
    const baseUrl = 'http://localhost:3030/jsonstore/forecaster/';

    submitBtn.addEventListener('click', () => fetchForecastData(locationId.value));

    async function fetchForecastData(locId) {
        try {
            const response = await fetch('http://localhost:3030/jsonstore/forecaster/locations');

            if (!response.ok) {
                let error = new Error();
                error.status = response.status;
                error.statusText = response.statusText;
                throw error;
            }

            const data = response.json();
            console.log(data);
        } catch (error) {
            console.warn('Error');
            console.log(error);
        }
    }


    // function generateDOM(todayForecast, threeDaysForecast) {
    //     console.log(threeDaysForecast);

    //     // Today
    //     const today = createElement('div', '', current, ['forecasts']);
    //     createElement('span', `${fetchConditionSymbol(todayForecast.forecast.condition)}`, today, ['condition', 'symbol']);
    //     const todayData = createElement('span', '', today, ['condition']);
    //     createElement('span', `${todayForecast.name}`, todayData, ['forecast-data']);
    //     createElement('span', `${todayForecast.forecast.high}&#176;/${todayForecast.forecast.low}&#176;`, todayData, ['forecast-data']);
    //     createElement('span', `${todayForecast.forecast.condition}`, todayData, ['forecast-data']);

    //     // Three days
    //     const threeDays = createElement('div', '', upcoming, ['forecast-info']);

    //     for (const elem of threeDaysForecast.forecast) {
    //         const dayBlock = createElement('span', '', threeDays, ['upcoming']);

    //         createElement('span', `${fetchConditionSymbol(elem.condition)}`, dayBlock, ['symbol']);
    //         createElement('span', `${elem.high}&#176;/${elem.low}&#176;`, dayBlock, ['forecast-data']);
    //         createElement('span', `${elem.condition}`, dayBlock, ['forecast-data']);
    //     }
    //     // const firstDay = createElement('span', '', threeDays, ['upcoming']);
    //     // const secondDay = createElement('span', '', threeDays, ['upcoming']);
    //     // const thirdDay = createElement('span', '', threeDays, ['upcoming']);


    // }

    function createElement(type, content, parent, classNamesArray) {
        const element = document.createElement(type);

        element.innerHTML = content;

        if (classNamesArray) {
            for (const name of classNamesArray) {
                element.classList.add(name);
            }
        }

        if (parent) parent.appendChild(element);

        return element;
    }

    function fetchConditionSymbol(condition) {
        let symbol = '';
        switch (condition) {
            case 'Sunny':
                symbol = '&#x2600;';
                break;
            case 'Partly sunny':
                symbol = '&#x26C5;';
                break;
            case 'Overcast':
                symbol = '&#x2601;';
                break;
            case 'Rain':
                symbol = '&#x2614;';
                break;

            default:
                break;
        }

        return symbol;
    }

    function clearSearchResults() {
        let lastChild = forecast.lastChild;

        while (forecast.lastChild) {
            lastChild.remove();
            lastChild = forecast.lastChild;
        }
    }
}

attachEvents();