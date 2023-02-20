function getInfo() {
    const submitBtn = document.getElementById('submit');

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        console.log(e.target);
    });
}