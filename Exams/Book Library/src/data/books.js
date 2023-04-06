import { del, get, put, post } from "./api.js";

const endpoints = {
    getBooks : '/data/books?sortBy=_createdOn%20desc',
    byId: '/data/books/'
}

export async function getBooks() {
    const data = await get(endpoints.getBooks);
    return data;
}

export async function getBook(id) {
    const data = await get(endpoints.byId + id);
    return data;
}

export async function getMyBooks(userId) {
    const url = `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`;
    const data = await get(url);

    return data;
}

export async function addBook(data) {
    await post('/data/books', data);
}

export async function updateBook(id, data) {
    await put(endpoints.byId + id, data);
}

export async function deleteBook(id) {
    await del('/data/books/' + id);
}