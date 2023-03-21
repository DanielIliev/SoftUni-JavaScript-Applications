function solve() {
    // URLs
    // http://localhost:3030/jsonstore/collections/students

    const studentDBUrl = 'http://localhost:3030/jsonstore/collections/students';
    const studentsTable = document.querySelector('#results > tbody');

    // <input type="text" name="firstName" placeholder="First Name...">
    // <input type="text" name="lastName" placeholder="Last Name...">
    // <input type="text" name="facultyNumber" placeholder="Faculty Number...">
    // <input type="text" name="grade"  placeholder="Grade..."></input>

    const firstNameField = document.querySelector('.inputs > input[name="firstName"]');
    const lastNameField = document.querySelector('.inputs > input[name="lastName"]');
    const facultyNumberField = document.querySelector('.inputs > input[name="facultyNumber"]');
    const gradeField = document.querySelector('.inputs > input[name="grade"]');

    // Fetch all students in the database
    fetch(studentDBUrl)
        .then(response => response.json())
        .then(data => {
            Object.values(data).forEach((student) => {
                const tr = createElement('tr', '', studentsTable);

                createElement('td', student.firstName, tr);
                createElement('td', student.lastName, tr);
                createElement('td', student.facultyNumber, tr);
                createElement('td', student.grade, tr);

            });
        });

    document.getElementById('submit').addEventListener('click', (e) => {
        e.preventDefault();

        if (firstNameField.value && lastNameField.value && facultyNumberField.value && gradeField.value) {
            const studentCollection = {
                'firstName': firstNameField.value,
                'lastName': lastNameField.value,
                'facultyNumber': facultyNumberField.value,
                'grade': gradeField.value,
            }

            const options = {
                'method': 'POST',
                'Content-Type': 'application/json',
                'body': JSON.stringify(studentCollection)
            }

            fetch(studentDBUrl, options);
        }
    })

    // Helper function for generating table row
    function createElement(type, content, parent) {
        const element = document.createElement(type);

        element.textContent = content;

        if (parent) parent.appendChild(element);

        return element;
    }
}
solve();