function attachEvents() {
    // URLs
    // http://localhost:3030/jsonstore/messenger
    // -------------------------------------------
    const url = 'http://localhost:3030/jsonstore/messenger';
    const messagesArea = document.getElementById('messages');
    const authorField = document.querySelector('input[name="author"]');
    const contentField = document.querySelector('input[name="content"]');

    document.getElementById('submit').addEventListener('click', () => {
        let msgObj = { 'author': authorField.value, 'content': contentField.value };

        const options = {
            'method': 'POST',
            'Content-Type': 'application/json',
            'body': JSON.stringify(msgObj)
        }

        fetch(url, options);
    });

    document.getElementById('refresh').addEventListener('click', () => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                Object.values(data).forEach(message => {
                    messagesArea.value += `${message.author}: ${message.content}\n`;
                });
            })
    });
}

attachEvents();