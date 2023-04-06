import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAlbum } from '../data/albums.js';
import { getUserData } from '../data/util.js';

const detailsTemplate = (album, actionsData) => html`
    <section id="details">
        <div id="details-wrapper">
            <p id="details-title">Album Details</p>
            <div id="img-wrapper">
                <img src="${album.imageUrl}" alt="example1" />
            </div>
            <div id="info-wrapper">
                <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
                <p>
                <strong>Album name:</strong><span id="details-album">${album.album}</span>
                </p>
                <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
                <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
                <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
            </div>
            <div id="likes">Likes: <span id="likes-count">0</span></div>

            <div id="action-buttons">
                ${actionsData}
            </div>
        </div>
    </section>
`;

export async function detailsView(ctx) {
    const album = await getAlbum(ctx.params.id);

    function actionsTemplate() {
        let actions;

        if (localStorage.getItem('userData') !== null) {
            const userId = JSON.parse(localStorage.getItem('userData'))._id;

            if (userId === album._ownerId) {
                actions = html`
                    <a href="/details/edit/${album._id}" id="edit-btn">Edit</a>
                    <a href="/details/delete/${album._id}" id="delete-btn">Delete</a>
                `;

                return actions;
            }
            if (userId !== album.ownerId) {
                actions = html`
                    <a href="" id="like-btn">Like</a>
                `;
                return actions;
            }
        }
    }

    ctx.render(detailsTemplate(album, actionsTemplate()));
}