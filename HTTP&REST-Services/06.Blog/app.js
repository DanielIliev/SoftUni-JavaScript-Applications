function attachEvents() {
    // URLs
    // http://localhost:3030/jsonstore/blog/posts
    // http://localhost:3030/jsonstore/blog/comments/:id

    const loadPosts = document.getElementById('btnLoadPosts');
    const postsSelectList = document.getElementById('posts');
    const viewPostsBtn = document.getElementById('btnViewPost');
    let posts = {};

    fetch('http://localhost:3030/jsonstore/blog/posts')
    .then(response => response.json())
    .then(data => {
        posts = data;
        Object.entries(data).forEach((element) => {
            postsSelectList.innerHTML += `<option value=${element[0]}>${element[1].title}</option>`;
        });
    });

    viewPostsBtn.addEventListener('click', () => {
        console.log(`http://localhost:3030/jsonstore/blog/comments/${postsSelectList.value}`);
        // fetch(`http://localhost:3030/jsonstore/blog/comments/${postsSelectList.value}`)
        // .then(response => response)
        // .then(data => {
        //     console.log(data);
        // })
    });
}

attachEvents();