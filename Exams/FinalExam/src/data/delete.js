import { deleteFruit } from "./fruits.js";

export async function removeFruit(ctx) {
    const id = ctx.params.id;

    await deleteFruit(id);

    ctx.page.redirect('/fruits');
}