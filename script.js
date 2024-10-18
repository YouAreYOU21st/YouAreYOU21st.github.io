function navigate(action) {
    let message;

    switch (action) {
        case 'start':
            message = '🚀 Starting the game... Good luck!';
            break;
        case 'settings':
            message = '⚙️ Opening settings... Customize your experience.';
            break;
        case 'quit':
            message = '❌ Quitting the game... See you next time!';
            break;
        default:
            message = '⚠️ Invalid action. Please choose a valid option.';
    }

    document.getElementById('message').innerText = message;
}

function filterActions() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const buttons = document.querySelectorAll('.action-button');

    let hasVisibleButtons = false;

    buttons.forEach(button => {
        const buttonText = button.innerText.toLowerCase();
        if (buttonText.includes(searchInput)) {
            button.style.display = ''; // Show button
            hasVisibleButtons = true;
        } else {
            button.style.display = 'none'; // Hide button
        }
    });

    // Update message if no buttons are visible
    if (!hasVisibleButtons) {
        document.getElementById('message').innerText = '🔍 No actions found. Please refine your search.';
    } else {
        document.getElementById('message').innerText = 'Welcome to the game! Choose an option:';
    }
}

function filterGames() {
    const gameSearchInput = document.getElementById('gameSearch').value.toLowerCase();
    const gameItems = document.querySelectorAll('.game-item');

    let hasVisibleGames = false;

    gameItems.forEach(game => {
        const gameText = game.innerText.toLowerCase();
        if (gameText.includes(gameSearchInput)) {
            game.style.display = ''; // Show game
            hasVisibleGames = true;
        } else {
            game.style.display = 'none'; // Hide game
        }
    });

    // Optionally, you can handle messages for the game search as well
    if (!hasVisibleGames) {
        // You can update a message for games if needed
    }
}
