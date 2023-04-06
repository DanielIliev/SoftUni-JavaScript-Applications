import { clearUserData, getUserData } from "./util.js";

const host = 'http://localhost:3030';

async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    };

    // Fetch userData (Authorization)
    const userData = getUserData();
    if (userData !== null) {
        const token = userData.accessToken;
        options.headers['X-Authorization'] = token;
    }

    // Process data
    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(host + url, options);

        let result;

        if (response.status != 204) {
            result = await response.json();
        }

        if (!response.ok) {
            // Server has been restarted, hence token is invalid
            if (response.status == 403) {
                clearUserData();
            }
            const error = result;
            throw error;
        }

        return result;

    } catch (error) {
        alert(error.message);
        // Throws the error up to prevent the other functions from working
        throw error;
    }
}

export const get = request.bind(null, 'get');
export const post = request.bind(null, 'post');
export const put = request.bind(null, 'put');
export const del = request.bind(null, 'delete');