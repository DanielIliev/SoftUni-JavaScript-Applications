function attachEvents() {
    // URLs
    // For GET & POST -> http://localhost:3030/jsonstore/phonebook
    // For DELETE -> http://localhost:3030/jsonstore/phonebook/:key
    const phonebookList = document.getElementById('phonebook');

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
                // Object.values(data).forEach((contact) => {
                //     console.log(contact);
                //     const contactItem = document.createElement('li');

                //     contactItem.textContent = `${contact.person}: ${contact.phone}`;

                //     const deleteBtn = document.createElement('button');
                //     deleteBtn.textContent = 'Delete';
                //     deleteBtn.setAttribute('id', `${contact._id}`);

                //     contactItem.appendChild(deleteBtn);
                //     phonebookList.appendChild(contactItem);
                // });
            });
    });
}

attachEvents();