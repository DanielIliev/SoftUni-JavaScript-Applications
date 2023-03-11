function attachEvents() {
    // URLs
    // http://localhost:3030/jsonstore/forecaster/locations
    // http://localhost:3030/jsonstore/forecaster/today/:code
    // http://localhost:3030/jsonstore/forecaster/upcoming/:code
    // ---------------------------------------------------------------------

    const locationInput = document.getElementById('location');
    const submitBtn = document.getElementById('submit');
    const forecast = document.getElementById('forecast');
    const current = document.getElementById('current');
    const upcomingForecast = document.getElementById('upcoming');
    const weatherSymbols = {
        'Sunny': '&#x2600;',
        'Partly sunny': '&#x26C5;',
        'Overcast': '&#x2601;',
        'Rain': '&#x2614;',
    }

    submitBtn.addEventListener('click', () => fetchForecastData());

    function fetchForecastData() {
        fetch('http://localhost:3030/jsonstore/forecaster/locations')
            .then(response => response.json())
            .then(data => {
                const cityIndex = data.findIndex((el) => el.name === locationInput.value);

                forecast.style.display = 'block';

                if (cityIndex === -1) {
                    throw new Error();
                }

                let cityCode = data[cityIndex].code;

                // Current weather
                fetch(`http://localhost:3030/jsonstore/forecaster/today/${cityCode}`)
                    .then(response => response.json())
                    .then(data => {
                        const forecasts = document.createElement('div');
                        forecasts.className = 'forecasts';

                        // Condition info span
                        let condition = document.createElement('span');
                        condition.className = 'condition';

                        // Condition symbol span
                        const symbolSpan = document.createElement('span');
                        symbolSpan.className = 'condition symbol';
                        symbolSpan.innerHTML = weatherSymbols[data.forecast.condition];
                        condition.appendChild(symbolSpan);

                        // Span 1
                        const span1 = document.createElement('span');
                        span1.className = 'forecast-data';
                        span1.textContent = data.name;
                        condition.appendChild(span1);

                        // Span 1
                        const span2 = document.createElement('span');
                        span2.className = 'forecast-data';
                        span2.innerHTML = `${data.forecast.low}&#176;/${data.forecast.high}&#176;`;
                        condition.appendChild(span2);

                        // Span 1
                        const span3 = document.createElement('span');
                        span3.className = 'forecast-data';
                        span3.textContent = data.forecast.condition;
                        condition.appendChild(span3);

                        forecasts.appendChild(condition);
                        current.appendChild(forecasts);
                    });

                // Upcoming weather
                fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${cityCode}`)
                    .then(response => response.json())
                    .then(data => {
                        // Main div
                        const fcInfo = document.createElement('div');
                        fcInfo.className = 'forecast-info';

                        // Each day from the array spans
                        data.forecast.forEach((el) => {
                            // Main span
                            const upcoming = document.createElement('span');
                            upcoming.className = 'upcoming';

                            // Symbol span
                            let symbol = document.createElement('span');
                            symbol.className = 'symbol';
                            symbol.innerHTML = weatherSymbols[el.condition];
                            upcoming.appendChild(symbol);

                            // Forecast info span 1
                            let span1 = document.createElement('span');
                            span1.className = 'forecast-data';
                            span1.innerHTML = `${el.low}&#176;/${el.high}&#176;`;
                            upcoming.appendChild(span1);

                            // Forecast info span 1
                            let span2 = document.createElement('span');
                            span2.className = 'forecast-data';
                            span2.innerHTML = `${el.condition}`;
                            upcoming.appendChild(span2);

                            fcInfo.appendChild(upcoming);
                            upcomingForecast.appendChild(fcInfo);
                        });
                    });

            }).catch(() => { forecast.textContent = 'Error'; });
    }
}

attachEvents();