async function solution() {
    const articlesListUrl = 'http://localhost:3030/jsonstore/advanced/articles/list';
    const main = document.getElementById('main');
    let articleTitles = {};

    try {
        const articlesResponse = await fetch(articlesListUrl);

        if (!articlesResponse.ok) {
            let error = new Error();
            error.status = articlesResponse.status;
            error.statusText = articlesResponse.statusText;

            throw error;
        }

        const data = await articlesResponse.json();
        articleTitles = data;

        generateDOM();

    } catch (error) {
        console.log(error);
    }

    function generateDOM() {
        Object.entries(articleTitles).forEach(element => {
            const data = element[1];

            main.innerHTML += `<div class="accordion">
                <div class="head">
                    <span>${data.title}</span>
                    <button class="button" id="${data._id}">More</button>
                </div>
                <div class="extra ${data._id}">
                    <p></p>
                </div>
            </div>`;

            console.log(data._id);

            document.getElementById(`${data._id}`).addEventListener('click', () => {
                console.log('hello');
            })
        });
    }
}
solution();