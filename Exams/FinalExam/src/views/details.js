import { html } from '../../node_modules/lit-html/lit-html.js';
import { getSingleFruit } from '../data/fruits.js';
import { getUserData } from '../data/util.js';

const detailsTemplate = (fruit, actions) => html`
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src="${fruit.imageUrl}" alt="example1" />
            <p id="details-title">${fruit.name}</p>
            <div id="info-wrapper">
                <div id="details-description">
                <p>
                    ${fruit.description}
                    </p>
                    <p id="nutrition">Nutrition</p>
                    <p id ="details-nutrition">${fruit.nutrition}</p>
                </div>
                <div id="action-buttons">
                    ${actions}
                </div>
            </div>
        </div>
    </section>
`;

export async function detailsView(ctx) {
    const fruit = await getSingleFruit(ctx.params.id);

    ctx.render(detailsTemplate(fruit, actionsTemp()));

    function actionsTemp() {
        let actions;

        if (getUserData() !== null) {
            const userId = getUserData()._id;

            if (userId === fruit._ownerId) {
                actions = html`
                    <a href="/edit/${fruit._id}" id="edit-btn">Edit</a>
                    <a href="/delete/${fruit._id}" id="delete-btn">Delete</a>
                `;
    
                return actions;
            }
        }
    }
}