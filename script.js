const games = [
    "Super Mario Bros",
    "The Legend of Zelda",
    "Minecraft",
    "Fortnite",
    "Stardew Valley",
    "Among Us",
    "Hollow Knight",
    "Celeste",
    "Terraria",
    "Hades",
];

const searchInput = document.getElementById('search');
const gameList = document.getElementById('game-list');
const loginContainer = document.getElementById('login-container');
const gameContainer = document.getElementById('game-container');
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');

// Simple user authentication (for demonstration)
const validUsername = "user";
const validPassword = "password";

function filterGames() {
    const query = searchInput.value.toLowerCase();
    gameList.innerHTML = '';
    const filteredGames = games.filter(game => game.toLowerCase().includes(query));
    
    filteredGames.forEach(game => {
        const li = document.createElement('li');
        li.textContent = game;
        gameList.appendChild(li);
    });
}

function handleLogin() {
    const username = usernameInput.value;
    const password = passwordInput.value;

    if (username === validUsername && password === validPassword) {
        loginContainer.style.display = 'none';
        gameContainer.style.display = 'block';
        errorMessage.textContent = '';
    } else {
        errorMessage.textContent = 'Invalid username or password.';
    }
}

function handleLogout() {
    loginContainer.style.display = 'block';
    gameContainer.style.display = 'none';
    usernameInput.value = '';
    passwordInput.value = '';
}

searchInput.addEventListener('input', filterGames);
loginButton.addEventListener('click', handleLogin);
logoutButton.addEventListener('click', handleLogout);
