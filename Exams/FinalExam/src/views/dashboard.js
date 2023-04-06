import { html } from '../../node_modules/lit-html/lit-html.js';
import { getFruits } from '../data/fruits.js';

const dashboardTemplate = (fruits) => html`
    <h2>Fruits</h2>
    ${
        fruits.length !== 0 ? html`
            <section id="dashboard">
                ${fruits.map((fruit) => html`
                    <div class="fruit">
                        <img src="${fruit.imageUrl}" alt="example1" />
                        <h3 class="title">${fruit.name}</h3>
                        <p class="description">${fruit.description}</p>
                        <a class="details-btn" href="/details/${fruit._id}">More Info</a>
                    </div>
                `)}
            </section>
        ` : html`
            <h2>No fruit info yet.</h2>
        `
    }
`;

// Probably no fruit info should be in the dashboard section
export async function dashboardView(ctx) {
    const fruits = await getFruits();

    ctx.render(dashboardTemplate(fruits));
}