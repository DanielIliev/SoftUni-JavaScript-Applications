import { html } from '../../node_modules/lit-html/lit-html.js';
import { get } from '../data/api.js';

// Replace with actual view
const detailsTemplate = (offerData, actionsTemplate) => html`
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src="../${offerData.imageUrl}" alt="example1" />
            <p id="details-title">${offerData.title}</p>
            <p id="details-category">
                Category: <span id="categories">${offerData.category}</span>
            </p>
            <p id="details-salary">
                Salary: <span id="salary-number">${offerData.salary}</span>
            </p>
            <div id="info-wrapper">
                <div id="details-description">
                <h4>Description</h4>
                <span>${offerData.description}</span>
                </div>
                <div id="details-requirements">
                <h4>Requirements</h4>
                <span>${offerData.requirements}</span>
                </div>
            </div>
            <p>Applications: <strong id="applications">1</strong></p>

            <!--Edit and Delete are only for creator-->
            <div id="action-buttons">
                ${actionsTemplate}
            </div>
        </div>
    </section>
`;

export async function detailsView(ctx) {
    const offerData = await get('/data/offers/' + ctx.params.id);
    
    ctx.render(detailsTemplate(offerData, offerActions()));

    function offerActions() {
        // Storage for logged user actions view
        let conditionalTemplate;

        if (localStorage.getItem('userData') !== null) {
            const ownerId = JSON.parse(localStorage.getItem('userData'))._id;
            if (ownerId === offerData._ownerId) {
                conditionalTemplate = html`
                    <a href="/edit/${offerData._id}" id="edit-btn">Edit</a>
                    <a href="/delete/${offerData._id}" id="delete-btn">Delete</a>
                `;
            } else {
                conditionalTemplate = html`
                    <a href="/apply" id="apply-btn">Apply</a>
                `
            }

            return conditionalTemplate;
        }
    }
}