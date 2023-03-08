async function lockedProfile() {
    const requestUrl = 'http://localhost:3030/jsonstore/advanced/profiles';
    const main = document.getElementById('main');
    let profilesData = {};

    try {
        const response = await fetch(requestUrl);

        if (!response.ok) {
            let error = new Error();
            error.status = response.status;
            error.statusText = response.statusText;

            throw error;
        }

        const data = await response.json();

        profilesData = data;
        generateDOM();

    } catch (error) {
        console.warn(error);
    }

    function generateDOM() {
        let child = main.lastChild;

        while (main.lastChild) {
            child.remove();
            child = main.lastChild;
        }

        let profileCounter = 1;

        Object.entries(profilesData).forEach((el) => {
            const data = el[1];

            main.innerHTML += `<div class="profile">
				<img src="./iconProfile2.png" class="userIcon" />
				<label>Lock</label>
				<input type="radio" name="user${profileCounter}Locked" value="lock" checked>
				<label>Unlock</label>
				<input type="radio" name="user${profileCounter}Locked" value="unlock"><br>
				<hr>
				<label>Username</label>
				<input type="text" name="user${profileCounter}Username" value="${data.username}" disabled readonly />
				<div class="user${profileCounter}Username">
					<hr>
					<label>Email:</label>
					<input type="email" name="user${profileCounter}Email" value="${data.email}" disabled readonly />
					<label>Age:</label>
					<input type="text" name="user${profileCounter}Age" value="${data.age}" disabled readonly />
				</div>
				
				<button>Show more</button>
			</div>`;
            document.getElementsByClassName(`user${profileCounter}Username`).item(0).style.display = 'none';
            profileCounter++;
        });

        const showMoreButtons = Array.from(document.querySelectorAll('.profile > button'));

        for (let index = 0; index < showMoreButtons.length; index++) {
            showMoreButtons[index].addEventListener('click', (e) => {
                const [locked, unlocked] = Array.from(e.target.parentElement.querySelectorAll('input[type="radio"]'));
                const hiddenInfoArea = document.getElementsByClassName(`user${index + 1}Username`).item(0);
                let hiddenAreaStyle = window.getComputedStyle(hiddenInfoArea).display;
    
                if (locked.checked === false) {
                    if (hiddenAreaStyle === 'block') {
                        hiddenInfoArea.style.display = 'none';
                        e.target.textContent = 'Show more';
                    } else {
                        hiddenInfoArea.style.display = 'block';
                        e.target.textContent = 'Hide it';
                    }
                }
            });
        }
    }
}