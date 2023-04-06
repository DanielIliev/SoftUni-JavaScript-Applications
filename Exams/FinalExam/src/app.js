import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { layoutTemplate } from './views/layout.js';
import { clearUserData, getUserData } from './data/util.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { logout } from './data/auth.js';
import { dashboardView } from './views/dashboard.js';
import { detailsView } from './views/details.js';
import { createView } from './views/create.js';
import { editView } from './views/edit.js';
import { removeFruit } from './data/delete.js';
import { searchView } from './views/search.js';

// Change render root depending on project HTML structure (e.g. main)
const root = document.getElementById('wrapper');

page (decorateContext);
page('/index.html', () => {
    page.redirect('/');
});
page('/', homeView);
page('/fruits', dashboardView);
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page('/delete/:id', removeFruit);
page('/search', searchView);
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

function logoutAction(ctx) {
    logout();
    ctx.page.redirect('/');
}