async function solution() {
    // URLs
    // General: http://localhost:3030/jsonstore/advanced/articles/list
    // Details: http://localhost:3030/jsonstore/advanced/articles/details/:id
    const articlesListUrl = 'http://localhost:3030/jsonstore/advanced/articles/list';
    const articleDetailsBaseUrl = 'http://localhost:3030/jsonstore/advanced/articles/details/';
    const main = document.getElementById('main');

    fetch(articlesListUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                // Main div
                const accordion = document.createElement('div');
                accordion.className = 'accordion';

                // Accordion head
                const accHead = document.createElement('div');
                accHead.className = 'head';

                // Head elements
                let span = document.createElement('span');
                span.textContent = element.title;
                accHead.appendChild(span);

                let button = document.createElement('button');
                button.className = 'button';
                button.setAttribute('id', `${element._id}`);
                button.textContent = 'More';
                accHead.appendChild(button);

                // Extra content
                const accExtra = document.createElement('div');
                accExtra.className = 'extra';
                let extraParagraph = document.createElement('p');
                accExtra.appendChild(extraParagraph);

                accordion.appendChild(accHead);
                accordion.appendChild(accExtra);
                main.appendChild(accordion);

                // Button handler
                button.addEventListener('click', () => {
                    let currentState = window.getComputedStyle(accExtra).display;

                    if (currentState === 'none') {
                        accExtra.style.display = 'block';
                        button.textContent = 'Less';
                    } else if (currentState === 'block') {
                        accExtra.style.display = 'none';
                        button.textContent = 'More';
                    }
                });

                fetch(articleDetailsBaseUrl + button.getAttribute('id'))
                    .then(response => response.json())
                    .then(data => {
                        extraParagraph.textContent = data.content;
                    });

            });
        });
}
solution();