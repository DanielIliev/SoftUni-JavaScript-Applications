import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { layoutTemplate } from './views/layout.js';
import { getUserData } from './data/util.js';
import { dashboardView } from './views/dashboard.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { logout } from './data/auth.js';
import { detailsView } from './views/details.js';
import { createView } from './views/create.js';
import { editView } from './views/edit.js';
import { deleteBook } from './data/books.js';
import { myBooksView } from './views/mybooks.js';

// Change render root depending on project HTML structure (e.g. main)
const root = document.getElementById('container');

page (decorateContext);
page('/index.html', () => {
    page.redirect('/dashboard');
});
page('/', () => {
    page.redirect('/dashboard');
});
page('/dashboard', dashboardView);
page('/mybooks', myBooksView);
page('/create', createView);
page('/edit/:id', editView);
page('/details/:id', detailsView);
page('/delete/:id', removeBook);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutAction);

page.start();

function decorateContext(ctx, next){
    ctx.render = renderView;
    next();
}

function renderView(content) {
    const userData = getUserData();
    render(layoutTemplate(userData, content), root);
}

async function logoutAction(ctx) {
    await logout();
    ctx.page.redirect('/');
}

async function removeBook(ctx) {
    await deleteBook(ctx.params.id);

    ctx.page.redirect('/dashboard');
}