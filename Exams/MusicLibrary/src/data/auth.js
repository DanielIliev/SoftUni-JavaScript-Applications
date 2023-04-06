// Change user object based project requirements

import { get, post } from "./api.js";
import { clearUserData, setUserData } from "./util.js";

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout'
}

export async function login(email, password) {
    // This returns the password as well (use a destructure for prod. apps)
    const result = await post(endpoints.login, { email, password });
    setUserData(result);
}

export async function register(email, password) {
    const result = await post(endpoints.register, { email, password });
    setUserData(result);
}

export async function logout() {
    get(endpoints.logout);
    clearUserData();
}