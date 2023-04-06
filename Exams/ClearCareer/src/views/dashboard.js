import { html } from '../../node_modules/lit-html/lit-html.js';
import { get } from '../data/api.js';

const dashboardTemplate = (list) => html`
    <section id="dashboard">
        <h2>Job Offers</h2>
        ${list.length !== 0 ? html`
                ${list.map((offer) => 
                    html`
                        <div class="offer">
                            <img src="${offer.imageUrl}" alt="example1" />
                            <p>
                                <strong>Title: </strong><span class="title">${offer.title}</span>
                            </p>
                            <p><strong>Salary:</strong><span class="salary">${offer.salary}</span></p>
                            <a class="details-btn" href="/details/${offer._id}">Details</a>
                        </div>
                    `
                )}
            ` :
            html`<h2>No offers yet.</h2>`
        }
    </section>
`;

export async function dashboardView(ctx) {
    const list = await get('/data/offers?sortBy=_createdOn%20desc');
    // const list = [];
    // console.log(list);
    ctx.render(dashboardTemplate(list));
}