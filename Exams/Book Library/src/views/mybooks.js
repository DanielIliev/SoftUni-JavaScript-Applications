import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyBooks } from '../data/books.js';

const myBooksTemplate = (books) => html`
    <section id="my-books-page" class="my-books">
        <h1>My Books</h1>
        <!-- Display ul: with list-items for every user's books (if any) -->
        <ul class="my-books-list">
            ${books.length !== 0 ? html`
                    ${books.map((book) => 
                        html`
                        <li class="otherBooks">
                            <h3>${book.title}</h3>
                            <p>Type: ${book.type}</p>
                            <p class="img"><img src="${book.imageUrl}"></p>
                            <a class="button" href="/details/${book._id}">Details</a>
                        </li>
                        `
                    )}
                ` :
                html`<p class="no-books">No books in database!</p>`
            }
        </ul>
    </section>
`;

export async function myBooksView(ctx) {
    const userId = JSON.parse(localStorage.getItem('userData'))._id;
    const books = await getMyBooks(userId);

    ctx.render(myBooksTemplate(books));
}