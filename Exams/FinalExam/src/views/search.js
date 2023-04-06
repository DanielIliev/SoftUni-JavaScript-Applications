import { html } from '../../node_modules/lit-html/lit-html.js';
import { searchFruit } from '../data/fruits.js';
import { createSubmitHandler } from '../data/util.js';

const searchTemplate = (onSearch, results, userSearched) => html`
    <section id="search">
        ${
            userSearched === false ? html`
                <div class="form">
                    <h2>Search</h2>
                    <form class="search-form" @submit="${onSearch}">
                        <input type="text" name="search" id="search-input" />
                        <button class="button-list">Search</button>
                    </form>
                </div>
                <h4>Results:</h4>
            ` : html`
                <div class="form">
                    <h2>Search</h2>
                    <form class="search-form" @submit="${onSearch}">
                        <input type="text" name="search" id="search-input" />
                        <button class="button-list">Search</button>
                    </form>
                </div>
                    <h4>Results:</h4>
                    ${results.length !== 0 ? html`
                            <div class="search-result">
                                ${results.map((result) => html`
                                    <div class="fruit">
                                        <img src="${result.imageUrl}" alt="example1" />
                                        <h3 class="title">${result.name}</h3>
                                        <p class="description">${result.description}</p>
                                        <a class="details-btn" href="/details/${result._id}">More Info</a>
                                    </div>
                                `)}
                            </div>
                        ` : html`
                            <p class="no-result">No result.</p>
                        `
                    }
                `
        }
    </section>
`;

export async function searchView(ctx) {
    let userSearched = false;

    ctx.render(searchTemplate(createSubmitHandler(onSearch), []), userSearched);
    
    async function onSearch({ search }, form) {
        if (search == '') {
            return window.alert('All fields are required!');
        }

        userSearched = true;

        const data = await searchFruit(search);

        ctx.render(searchTemplate(createSubmitHandler(onSearch), data));
        
        form.reset();

    }
}