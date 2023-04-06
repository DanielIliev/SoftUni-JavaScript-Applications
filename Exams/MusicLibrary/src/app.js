import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { layoutTemplate } from './views/layout.js';
import { getUserData } from './data/util.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { logout } from './data/auth.js';
import { dashboardView } from './views/dashboard.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { removeAlbum } from './views/delete.js';
import { createView } from './views/create.js';

// Change render root depending on project HTML structure (e.g. main)
const root = document.getElementById('wrapper');

page (decorateContext);
page('/index.html', () => {
    page.redirect('/');
});
page('/', homeView);
page('/dashboard', dashboardView);
page('/details/:id', detailsView);
page('/create', createView);
page('/details/edit/:id', editView);
page('/details/delete/:id', removeAlbum);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutAction);

page.start();

function decorateContext(ctx, next){
    ctx.render = renderView;
    next();
}

// TODO inject dependencies
function renderView(content) {
    const userData = getUserData();
    render(layoutTemplate(userData, content), root);
}

function logoutAction(ctx) {
    logout();
    ctx.page.redirect('/');
}