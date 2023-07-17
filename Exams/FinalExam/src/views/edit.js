import { html } from '../../node_modules/lit-html/lit-html.js';
import { editFruit, getSingleFruit } from '../data/fruits.js';
import { createSubmitHandler } from '../data/util.js';

const editTemplate = (fruit, onEdit) => html`
    <section id="edit">
        <div class="form">
            <h2>Edit Fruit</h2>
            <form class="edit-form" @submit="${onEdit}">
                <input
                type="text"
                name="name"
                id="name"
                placeholder="Fruit Name"
                .value="${fruit.name}"
                />
                <input
                type="text"
                name="imageUrl"
                id="Fruit-image"
                placeholder="Fruit Image URL"
                .value="${fruit.imageUrl}"
                />
                <textarea
                id="fruit-description"
                name="description"
                placeholder="Description"
                rows="10"
                cols="50"
                .value="${fruit.description}"
                ></textarea>
                <textarea
                id="fruit-nutrition"
                name="nutrition"
                placeholder="Nutrition"
                rows="10"
                cols="50"
                .value="${fruit.nutrition}"
                ></textarea>
                <button type="submit">post</button>
            </form>
        </div>
    </section>
`;

export async function editView(ctx) {
    const fruit = await getSingleFruit(ctx.params.id);

    ctx.render(editTemplate(fruit, createSubmitHandler(onEdit)));

    async function onEdit(
        {
            name,
            imageUrl,
            description,
            nutrition
        },
        form
    ) {
        if (name == '' || imageUrl == '' || description == '' || nutrition == '') {
            return window.alert('All fields are required!');
        }

        await editFruit(fruit._id, {name, imageUrl, description, nutrition});

        form.reset();
        ctx.page.redirect('/details/' + fruit._id);
    }
}