function attachEvents() {
    // URLs
    // For GET & POST -> http://localhost:3030/jsonstore/phonebook
    // For DELETE -> http://localhost:3030/jsonstore/phonebook/:key
    const phonebookList = document.getElementById('phonebook');
    const personField = document.getElementById('person');
    const phoneField = document.getElementById('phone');

    document.getElementById('btnLoad').addEventListener('click', () => {
        fetch('http://localhost:3030/jsonstore/phonebook')
            .then(response => response.json())
            .then(data => {
                for (const contactKey in data) {
                    if (data.hasOwnProperty(contactKey)) {
                        const contactItem = document.createElement('li');

                        contactItem.textContent = `${data[contactKey].person}: ${data[contactKey].phone}`;

                        const deleteBtn = document.createElement('button');
                        deleteBtn.textContent = 'Delete';
                        deleteBtn.setAttribute('id', `${contactKey}`);

                        deleteBtn.addEventListener('click', (e) => {
                            const contactId = e.target.getAttribute('id');

                            const options = {
                                'method': 'DELETE',
                                'Content-Type': 'application/json'
                            };

                            fetch(`http://localhost:3030/jsonstore/phonebook/${contactId}`, options);

                            e.target.parentNode.remove();
                        });

                        contactItem.appendChild(deleteBtn);
                        phonebookList.appendChild(contactItem);
                    }
                }
            });
    });

    document.getElementById('btnCreate').addEventListener('click', () => {
        if (personField.value && phoneField.value) {
            const contactInfo = { 'person': personField.value, 'phone': phoneField.value };

            const options = {
                'method': 'POST',
                'Content-Type': 'application/json',
                'body': JSON.stringify(contactInfo)
            }

            fetch('http://localhost:3030/jsonstore/phonebook', options);
        }
    });
}

attachEvents();