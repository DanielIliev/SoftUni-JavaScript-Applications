import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../data/auth.js';
import { createSubmitHandler } from '../data/util.js';

// Replace with actual view
const registerTemplate = (onRegister) => html`
    <section id="register-page" class="register">
    <form id="register-form" action="" method="" @submit="${onRegister}">
        <fieldset>
            <legend>Register Form</legend>
            <p class="field">
                <label for="email">Email</label>
                <span class="input">
                    <input type="text" name="email" id="email" placeholder="Email">
                </span>
            </p>
            <p class="field">
                <label for="password">Password</label>
                <span class="input">
                    <input type="password" name="password" id="password" placeholder="Password">
                </span>
            </p>
            <p class="field">
                <label for="repeat-pass">Repeat Password</label>
                <span class="input">
                    <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Register">
        </fieldset>
    </form>
    </section>
`;

export function registerView(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(onRegister)));

    async function onRegister({ email, password, 'confirm-pass': repass }, form) {
        if (password !== repass) {
            return window.alert('Passwords must match!');
        }
        if (email == '' || password == '') {
            return window.alert('All fields are required!');
        }

        await register(email, password);
        form.reset();
        
        ctx.page.redirect('/dashboard');
    }
}