import { del } from "./api.js";

export async function deleteOffer(ctx) {
    const offerId = ctx.params.id;

    console.log(offerId);

    await del('/data/offers/' + offerId);

    ctx.page.redirect('/dashboard');
}