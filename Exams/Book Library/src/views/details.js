import { html } from '../../node_modules/lit-html/lit-html.js';
import { getBook } from "../data/books.js";

const detailsTemplate = (book, actionsTemplate) => 
    html`
        <section id="details-page" class="details">
            <div class="book-information">
                <h3>${book.title}</h3>
                <p class="type">Type: ${book.type}</p>
                <p class="img"><img src="${book.imageUrl}"></p>
                <div class="actions">
                    ${actionsTemplate}
                </div>
            </div>
            <div class="book-description">
                <h3>Description:</h3>
                <p>${book.description}</p>
            </div>
        </section>
    `;

export async function detailsView(ctx) {
    const book = await getBook(ctx.params.id);

    function actionsTemplate() {
        let actions;

        if (localStorage.getItem('userData') !== null) {
            const userId = JSON.parse(localStorage.getItem('userData'))._id;

            if (userId === book._ownerId) {
                actions = html`
                    <a class="button" href="/edit/${book._id}">Edit</a>
                    <a class="button" href="/delete/${book._id}">Delete</a>

                    <div class="likes">
                        <img class="hearts" src="/images/heart.png">
                        <span id="total-likes">Likes: 0</span>
                    </div>
                `;

                return actions;
            }
            if (userId !== book.ownerId) {
                actions = html`
                    <a class="button" href="#">Like</a>
                    <div class="likes">
                        <img class="hearts" src="/images/heart.png">
                        <span id="total-likes">Likes: 0</span>
                    </div>
                `;
                return actions;
            }
        } else {
            actions = html`
                <div class="likes">
                    <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: 0</span>
                </div>
            `;
            return actions;
        }
    }

    ctx.render(detailsTemplate(book, actionsTemplate()));
}


// <!-- Edit/Delete buttons ( Only for creator of this book )  -->
//                     <a class="button" href="#">Edit</a>
//                     <a class="button" href="#">Delete</a>

//                     <!-- Bonus -->
//                     <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
//                     <a class="button" href="#">Like</a>

//                     <!-- ( for Guests and Users )  -->
//                     <div class="likes">
//                         <img class="hearts" src="/images/heart.png">
//                         <span id="total-likes">Likes: 0</span>
//                     </div>
//                     <!-- Bonus -->