const main = document.querySelector('main');
const form = document.querySelector('#create-post');

export async function createPost(event) {
    const formData = new FormData(form);

    const { topicName, username, postText } = Object.fromEntries(formData.entries());

    if (topicName == '' || username == '' || postText == '') {
        return alert('All fields are required');
    }

    const url = 'http://localhost:3030/jsonstore/collections/myboard/posts';

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ topicName, username, postText })
    };

    try {
        const response = await fetch(url, options);

        if (response.ok == false) {
            const error = await response.json();
            throw error;
        }

        const data = await response.json();

        // console.log(data);

        main.appendChild(postToDOM(data));

        form.reset();
    } catch (error) {
        alert(error.message);
    }
}

function postToDOM(post) {
    const element = document.createElement('div');
    element.className = 'topic-container';

    element.innerHTML = `
        <div class="topic-name-wrapper" data-id="${post._id}">
            <div class="topic-name">
                <a href="#" class="normal">
                    <h2>${post.topicName}</h2>
                </a>
                <div class="columns">
                    <div>
                        <p>Date: <time>2020-10-10T12:08:28.451Z</time></p>
                        <div class="nick-name">
                            <p>Username: <span>${post.username}</span></p>
                        </div>
                    </div>
    
    
                </div>
            </div>
        </div>
    `;
    
    return element;
}