import { createPost } from "./createPost.js";
import { fetchPosts } from "./fetchPosts.js";

// Fetch already existing posts from the database
fetchPosts();

// Remove initial topic element
document.querySelector('.topic-title').remove();

eventHandlers();
function eventHandlers() {
    const form = document.querySelector('#create-post');

    form.addEventListener('click', (e) => {
        e.preventDefault();

        const target = e.target;
        
        if (target.tagName == 'BUTTON') {
            if (target.textContent == 'Post') {
                createPost();
            } else if (target.textContent == 'Cancel') {
                form.reset();
            }
        }
    });
}