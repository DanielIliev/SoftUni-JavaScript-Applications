import { html } from '../../node_modules/lit-html/lit-html.js';
import { editAlbum, getAlbum } from '../data/albums.js';
import { createSubmitHandler } from '../data/util.js';

const editTemplate = (album, onEdit) => html`
    <section id="edit">
        <div class="form">
            <h2>Edit Album</h2>
            <form class="edit-form" @submit="${onEdit}">
                <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" .value="${album.singer}" />
                <input type="text" name="album" id="album-album" placeholder="Album" .value="${album.album}" />
                <input type="text" name="imageUrl" id="album-img" placeholder="Image url" .value="${album.imageUrl}" />
                <input type="text" name="release" id="album-release" placeholder="Release date" .value="${album.release}" />
                <input type="text" name="label" id="album-label" placeholder="Label" .value="${album.label}" />
                <input type="text" name="sales" id="album-sales" placeholder="Sales" .value="${album.sales}" />

                <button type="submit">post</button>
            </form>
        </div>
    </section>
`;

export async function editView(ctx) {
    const id = ctx.params.id;
    const album = await getAlbum(id);

    ctx.render(editTemplate(album, createSubmitHandler(onEdit)));

    async function onEdit(
        {
            singer,
            album,
            imageUrl,
            release,
            label,
            sales
        },
        form
    ) {
        if (singer == '' || album == '' || imageUrl == '' || release == '' || label == '' || sales == '') {
            return window.alert('All fields are required!');
        }

        await editAlbum(id, {singer, album, imageUrl, release, label, sales});

        form.reset();
        ctx.page.redirect('/details/' + id);
    }
}