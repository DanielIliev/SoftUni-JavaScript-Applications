import { del, get, post, put } from "./api.js";

const endpoints = {
    all: '/data/albums?sortBy=_createdOn%20desc',
    byId: '/data/albums/',
    add: '/data/albums'
}

export async function getAlbums() {
    return await get(endpoints.all);
}

export async function getAlbum(id) {
    return await get(endpoints.byId + id);
}

export async function addAlbum(data) {
    await post(endpoints.add, data);
}

export async function editAlbum(id, data) {
    await put(endpoints.byId + id, data);
}

export async function deleteAlbum(id){ 
    await del(endpoints.byId + id);
}