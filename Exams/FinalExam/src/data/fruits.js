import { del, get, post, put } from "./api.js"

const endpoints = {
    all: '/data/fruits?sortBy=_createdOn%20desc',
    single: '/data/fruits/',
    add: '/data/fruits'
}

export async function getFruits() {
    return await get(endpoints.all);
}

export async function getSingleFruit(id) {
    return await get(endpoints.single + id);
}

export async function addFruit(data) {
    await post(endpoints.add, data);
}

export async function editFruit(id, data) {
    await put(endpoints.single + id, data);
}

export async function deleteFruit(id) {
    await del(endpoints.single + id);
}

export async function searchFruit(query) {
    const url = `/data/fruits?where=name%20LIKE%20%22${query}%22`;
    return await get(url);
}