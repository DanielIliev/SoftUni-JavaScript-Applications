// URLs
// For GET on all books http://localhost:3030/jsonstore/collections/books
// For GET / POST / PUT on specific book http://localhost:3030/jsonstore/collections/books/:id
eventHandlers();
function eventHandlers() {
    const form = document.getElementsByTagName('form').item(0);
    form.addEventListener('submit', addBook);

    document.getElementById('loadBooks').addEventListener('click', loadAllBooks);
    document.getElementsByTagName('table').item(0).addEventListener('click', tableAction);
}

// Task 1: Load all books
async function loadAllBooks() {
    const url = 'http://localhost:3030/jsonstore/collections/books';

    const response = await fetch(url);

    const result = await response.json();

    const rows = Object.values(result).map(createRow);

    document.querySelector('table > tbody').replaceChildren(...rows);
}


// Task 2: Create a new book record and add it to the table
async function addBook(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const { author, title } = Object.fromEntries(formData.entries());

    if (author == '' || title == '') {
        return alert('All fields are required');
    }

    const url = 'http://localhost:3030/jsonstore/collections/books/';

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ author, title })
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const error = await response.json();
            throw error;
        }

        const data = await response.json();

        loadAllBooks();
        event.target.reset();

    } catch (error) {
        alert(error.message);
    }
}

function createRow(record) {
    const tr = document.createElement('tr');

    tr.innerHTML = `
        <td>${record.title}</td>
        <td>${record.author}</td>
        <td>
            <button data-id="${record._id}">Edit</button>
            <button data-id="${record._id}">Delete</button>
        </td>
    `;

    return tr;
}

// Table event delegation
function tableAction(event) {
    const target = event.target;

    if (target.tagName == 'BUTTON') {
        if (target.textContent == 'Edit') {
            getBookForEdit(target.dataset.id);
        }
        else if (target.textContent == 'Delete') {
            deleteBook(target.dataset.id);
        }
    }
}

// Task 3: Edit book
async function getBookForEdit(recordId) {
    const url = 'http://localhost:3030/jsonstore/collections/books/' + recordId;
    let data;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            const error = await response.json();
            throw error;
        }

        data = await response.json();

        
    } catch (error) {
        alert(error.message);
    }

    // const form = document.getElementsByTagName('form').item(0);
    // form.firstChild.textContent = 'Edit FORM';
    document.querySelector('form > h3').textContent = 'Edit FORM';
    document.querySelector('form > input[name="title"]').value = data.title;
    document.querySelector('form > input[name="author"]').value = data.author;
    


}

// Task 4: Delete book
async function deleteBook(recordId) {
    const url = 'http://localhost:3030/jsonstore/collections/books/' + recordId;

    const options = {
        method: 'delete'
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const error = await response.json();
            throw error;
        }

        // const data = await response.json();

        loadAllBooks();
    } catch (error) {
        alert(error.message);
    }
}