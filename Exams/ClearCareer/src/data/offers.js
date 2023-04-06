import { get, post, put, del } from "./api.js";

const endpoints = {
    offers: '/data/offers?sortBy=_createdOn%20desc',
    byId: '/data/offers/'
}

// !!! Use the links provided in the documentation as Judge will not respond to e.g. /data/offers 
export async function getAllOffers() {
    return get(endpoints.offers);
}

export async function getById(id) {
    return get(endpoints.byId + id);
}

export async function createtOffer(data) {
    return post(endpoints.offers, data);
}

export async function updateOffer(id, data) {
    return put(endpoints.byId + id, data);
}

export async function deleteOffer(id) {
    return del(endpoints.byId + id);
}