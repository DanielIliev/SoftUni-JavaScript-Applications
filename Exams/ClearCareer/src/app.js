import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { layoutTemplate } from './views/layout.js';
import { getUserData } from './data/util.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { logout } from './data/auth.js';
import { dashboardView } from './views/dashboard.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { deleteOffer } from './data/delete.js';

// import * as api from './data/offers.js';

// window.api = api;

const root = document.getElementById('wrapper');

page (decorateContext);
page('/index.html', () => {
    page.redirect('/');
});
page('/', homeView);
page('/dashboard', dashboardView);
page('/details/:id', detailsView);
page('/create', createView);
page('/edit/:id', editView);
page('/delete/:id', deleteOffer);
page('/apply', applyAction);
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
    ctx.page.redirect('/dashboard');
}

function applyAction(ctx) {
    console.log(ctx);
    console.log('Apply Me');
}