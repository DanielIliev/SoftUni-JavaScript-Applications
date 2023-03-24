const main = document.querySelector('main');

export async function fetchPosts() {
    const url = 'http://localhost:3030/jsonstore/collections/myboard/posts';

    try {
        const response = await fetch(url);

        if (response.ok == false) {
            const error = await response.json();
            throw error;
        }

        const data = await response.json();

        // console.log(data);

        Object.values(data).forEach((e) => main.appendChild(generatePost(e)));
    } catch (error) {
        alert(error.message);
    }
}

function generatePost(post) {
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