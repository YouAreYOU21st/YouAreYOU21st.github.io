const startButton = document.getElementById('start-button');
const difficultyButton = document.getElementById('difficulty-button');
const gameModeButton = document.getElementById('game-mode-button');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const levelDisplay = document.getElementById('level');
const targetsContainer = document.getElementById('targets');
const gameOverDisplay = document.getElementById('game-over');
const finalScoreDisplay = document.getElementById('final-score');
const playerNameInput = document.getElementById('player-name');
const submitScoreButton = document.getElementById('submit-score-button');
const highScoresButton = document.getElementById('high-scores-button');
const highScoresDisplay = document.getElementById('high-scores');
const scoreList = document.getElementById('score-list');
const closeHighScoresButton = document.getElementById('close-high-scores');
const powerUp = document.getElementById('power-up');
const backgroundMusic = document.getElementById('background-music');

let score = 0;
let gameActive = false;
let timer = 30;
let timerInterval;
let level = 1;
let targetsToSpawn = 5;
let difficulty = 'easy'; // Default difficulty
let gameMode = 'timed'; // Default game mode

const targetTypes = [
    { color: '#ff4757', points: 1, image: 'target1.png' }, // Regular target
    { color: '#fffa65', points: 2, image: 'target2.png' }, // Double points target
    { color: '#1e90ff', points: 3, image: 'target3.png' }, // Triple points target
];

function startGame() {
    score = 0;
    timer = (gameMode === 'timed') ? 30 : 0; // Set timer based on game mode
    level = 1;
    targetsToSpawn = 5;
    gameActive = true;
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time: ${timer}`;
    levelDisplay.textContent = `Level: ${level}`;
    gameOverDisplay.style.display = 'none';
    highScoresDisplay.style.display = 'none';
    targetsContainer.innerHTML = '';
    backgroundMusic.play();
    spawnTargets();

    if (gameMode === 'timed') {
        timerInterval = setInterval(() => {
            timer--;
            timerDisplay.textContent = `Time: ${timer}`;
            if (timer <= 0) {
                endGame();
            }
        }, 1000);
    } else {
        // Unlimited mode - continuously spawn targets
        setInterval(spawnTargets, 2000); // Spawn new targets every 2 seconds
    }
}

function spawnTargets() {
    for (let i = 0; i < targetsToSpawn; i++) {
        const target = document.createElement('div');
        const targetType = getRandomTargetType();
        
        target.classList.add('target');
        target.style.backgroundColor = targetType.color;
        target.style.backgroundImage = `url(${targetType.image})`;
        target.style.backgroundSize = 'cover';
        target.setAttribute('data-points', targetType.points);
        moveTarget(target);
        targetsContainer.appendChild(target);
        
        target.addEventListener('click', () => {
            if (!gameActive) return;
            const points = parseInt(target.getAttribute('data-points'));
            score += points;
            hitSound.play();
            scoreDisplay.textContent = `Score: ${score}`;
            animateHit(target);
            moveTarget(target);
            if (score % 10 === 0) {
                levelUp();
            }
        });
    }
}

function getRandomTargetType() {
    return targetTypes[Math.floor(Math.random() * targetTypes.length)];
}

function moveTarget(target) {
    const gameContainer = document.getElementById('game-container');
    const containerWidth = gameContainer.clientWidth - 50;
    const containerHeight = gameContainer.clientHeight - 50;

    const randomX = Math.floor(Math.random() * containerWidth);
    const randomY = Math.floor(Math.random() * containerHeight);

    target.style.left = `${randomX}px`;
    target.style.top = `${randomY}px`;
    target.style.display = 'block';
    
    // Randomly move targets every second
    setInterval(() => {
        const moveX = Math.floor(Math.random() * 100 - 50); // Random move left/right
        const moveY = Math.floor(Math.random() * 100 - 50); // Random move up/down
        const currentLeft = parseInt(target.style.left);
        const currentTop = parseInt(target.style.top);

        const newLeft = Math.min(containerWidth, Math.max(0, currentLeft + moveX));
        const newTop = Math.min(containerHeight, Math.max(0, currentTop + moveY));

        target.style.left = `${newLeft}px`;
        target.style.top = `${newTop}px`;
    }, 1000);
}

function animateHit(target) {
    target.style.transform = 'scale(1.2)';
    setTimeout(() => {
        target.style.transform = 'scale(1)';
    }, 100);
}

function levelUp() {
    level++;
    levelDisplay.textContent = `Level: ${level}`;
    targetsToSpawn += 2; // Increase targets for next level
    spawnPowerUp();
}

function spawnPowerUp() {
    const randomTime = Math.random() * 5000 + 3000; // 3 to 8 seconds
    setTimeout(() => {
        if (gameActive) {
            powerUp.style.display = 'block';
            movePowerUp();
        }
    }, randomTime);
}

function movePowerUp() {
    const gameContainer = document.getElementById('game-container');
    const containerWidth = gameContainer.clientWidth - 50;
    const containerHeight = gameContainer.clientHeight - 50;

    const randomX = Math.floor(Math.random() * containerWidth);
    const randomY = Math.floor(Math.random() * containerHeight);

    powerUp.style.left = `${randomX}px`;
    powerUp.style.top = `${randomY}px`;

    powerUp.style.display = 'block';

    powerUp.onclick = () => {
        if (gameActive) {
            score += 5; // Power-up gives extra points
            hitSound.play();
            scoreDisplay.textContent = `Score: ${score}`;
            animateHit(powerUp);
            powerUp.style.display = 'none';
            spawnPowerUp(); // Spawn a new power-up
        }
    };
}

function endGame() {
    gameActive = false;
    clearInterval(timerInterval);
    backgroundMusic.pause();
    gameOverSound.play();
    finalScoreDisplay.textContent = score;
    gameOverDisplay.style.display = 'block';
}

submitScoreButton.addEventListener('click', () => {
    const playerName = playerNameInput.value.trim();
    if (playerName) {
        saveHighScore(playerName, score);
        playerNameInput.value = ''; // Clear input
        showHighScores();
    } else {
        alert('Please enter your name to submit your score.');
    }
});

function saveHighScore(name, newScore) {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push({ name, score: newScore });
    highScores.sort((a, b) => b.score - a.score);
    if (highScores.length > 5) highScores.pop(); // Keep top 5 scores
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

function showHighScores() {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    scoreList.innerHTML = '';
    highScores.forEach(({ name, score }) => {
        const li = document.createElement('li');
        li.textContent = `${name}: ${score}`;
        scoreList.appendChild(li);
    });
    highScoresDisplay.style.display = 'block';
}

function selectDifficulty() {
    const difficulties = ['easy', 'medium', 'hard'];
    difficulty = difficulties[(difficulties.indexOf(difficulty) + 1) % difficulties.length];
    difficultyButton.textContent = `Difficulty: ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`;
    alert(`Difficulty set to ${difficulty}`);
}

function toggleGameMode() {
    gameMode = (gameMode === 'timed') ? 'unlimited' : 'timed';
    gameModeButton.textContent = `Game Mode: ${gameMode.charAt(0).toUpperCase() + gameMode.slice(1)}`;
    alert(`Game mode set to ${gameMode}`);
}

startButton.addEventListener('click', startGame);
difficultyButton.addEventListener('click', selectDifficulty);
gameModeButton.addEventListener('click', toggleGameMode);
highScoresButton.addEventListener('click', showHighScores);
closeHighScoresButton.addEventListener('click', () => {
    highScoresDisplay.style.display = 'none';
});
document.getElementById('restart-button').addEventListener('click', startGame);
