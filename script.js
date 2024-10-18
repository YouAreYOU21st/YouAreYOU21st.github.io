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
