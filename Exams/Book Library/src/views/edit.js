import { html } from '../../node_modules/lit-html/lit-html.js';
import { getBook, updateBook } from '../data/books.js';
import { createSubmitHandler } from '../data/util.js';

const editTemplate = (book, onEdit) => html`
    <section id="edit-page" class="edit">
        <form id="edit-form" action="#" method="" @submit="${onEdit}">
            <fieldset>
                <legend>Edit my Book</legend>
                <p class="field">
                    <label for="title">Title</label>
                    <span class="input">
                        <input type="text" name="title" id="title" .value="${book.title}">
                    </span>
                </p>
                <p class="field">
                    <label for="description">Description</label>
                    <span class="input">
                        <textarea name="description" id="description" .value="${book.description}"></textarea>
                    </span>
                </p>
                <p class="field">
                    <label for="image">Image</label>
                    <span class="input">
                        <input type="text" name="imageUrl" id="image" .value="${book.imageUrl}">
                    </span>
                </p>
                <p class="field">
                    <label for="type">Type</label>
                    <span class="input">
                        <select id="type" name="type" value="Fiction">
                            <option .value="${book.type}" selected>Fiction</option>
                            <option value="Romance">Romance</option>
                            <option value="Mistery">Mistery</option>
                            <option value="Classic">Clasic</option>
                            <option value="Other">Other</option>
                        </select>
                    </span>
                </p>
                <input class="button submit" type="submit" value="Save">
            </fieldset>
        </form>
    </section>
`;

export async function editView(ctx) {
    const book = await getBook(ctx.params.id);

    ctx.render(editTemplate(book, createSubmitHandler(onEdit)));

    async function onEdit(
        {
            title,
            description,
            imageUrl,
            type
        }, form
    ) {
        if (title == '' || description == '' || imageUrl == '' || type == '') {
            return window.alert('All fields are required!');
        }

        await updateBook(book._id, {title, description, imageUrl, type});

        form.reset();

        ctx.page.redirect('/details/' + book._id);
    }
}