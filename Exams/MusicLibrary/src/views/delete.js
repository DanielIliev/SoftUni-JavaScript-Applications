import { deleteAlbum } from "../data/albums.js";

export async function removeAlbum(ctx) {
    const id = ctx.params.id;

    await deleteAlbum(id);

    ctx.page.redirect('/dashboard');
}