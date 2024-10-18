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
const registerContainer = document.getElementById('register-container');
const gameContainer = document.getElementById('game-container');
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button');
const showRegisterButton = document.getElementById('show-register-button');
const showLoginButton = document.getElementById('show-login-button');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const registerUsernameInput = document.getElementById('register-username');
const registerPasswordInput = document.getElementById('register-password');
const errorMessage = document.getElementById('error-message');
const registerErrorMessage = document.getElementById('register-error-message');

let users = []; // Array to hold registered users

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

    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'none';
        gameContainer.style.display = 'block';
        errorMessage.textContent = '';
    } else {
        errorMessage.textContent = 'Invalid username or password.';
    }
}

function handleRegister() {
    const username = registerUsernameInput.value;
    const password = registerPasswordInput.value;

    if (users.some(user => user.username === username)) {
        registerErrorMessage.textContent = 'Username already taken.';
    } else {
        users.push({ username, password });
        registerErrorMessage.textContent = '';
        alert('Registration successful! You can now log in.');
        showLoginForm();
    }
}

function handleLogout() {
    loginContainer.style.display = 'block';
    registerContainer.style.display = 'none';
    gameContainer.style.display = 'none';
    usernameInput.value = '';
    passwordInput.value = '';
}

function showRegisterForm() {
    loginContainer.style.display = 'none';
    registerContainer.style.display = 'block';
}

function showLoginForm() {
    registerContainer.style.display = 'none';
    loginContainer.style.display = 'block';
}

searchInput.addEventListener('input', filterGames);
loginButton.addEventListener('click', handleLogin);
logoutButton.addEventListener('click', handleLogout);
showRegisterButton.addEventListener('click', showRegisterForm);
showLoginButton.addEventListener('click', showLoginForm);
registerButton.addEventListener('click', handleRegister);
