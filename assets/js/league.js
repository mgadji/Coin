//localStorage.clear();
const leagueGoals = {
    'Bronze': 0,
    'Silver': 100000,
    'Gold': 500000,
    'Platinum': 2500000,
    'Diamond': 10000000,
    'Legendary': 100000000
};

let userBalance = localStorage.getItem('coins');

const leagues = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Legendary'];
let currentLeagueIndex = leagues.indexOf(getCurrentLeague(userBalance));

function updateLeagueDisplay() {
    const leagueNameElement = document.getElementById('league-name');
    const leagueGoalElement = document.getElementById('league-goal');
    const leftArrow = document.querySelector('.league-h a:first-child');
    const rightArrow = document.querySelector('.league-h a:last-child');

    leagueNameElement.innerText = leagues[currentLeagueIndex];

    if (currentLeagueIndex === 0) {
        leftArrow.classList.add('hidden');
    } else {
        leftArrow.classList.remove('hidden');
    }

    if (currentLeagueIndex === leagues.length - 1) {
        rightArrow.classList.add('hidden');
    } else {
        rightArrow.classList.remove('hidden');
    }

    const currentLeague = leagues[currentLeagueIndex];
    const nextLeague = leagues[currentLeagueIndex + 1];

    // Форматирование чисел с разделителями тысяч
    const formatter = new Intl.NumberFormat('ru-RU');

    if (currentLeague === 'Legendary') {
        leagueGoalElement.innerText = `from 10 000 000+`;
    } else if (userBalance >= leagueGoals[nextLeague]) {
        leagueGoalElement.innerText = `from ${formatter.format(leagueGoals[currentLeague])}`;
    } else {
        leagueGoalElement.innerText = `${formatter.format(userBalance)} / ${formatter.format(leagueGoals[nextLeague])}`;
    }
}


function nextLeague() {
    if (currentLeagueIndex < leagues.length - 1) {
        currentLeagueIndex++;
        updateLeagueDisplay();
    }
}

function previousLeague() {
    if (currentLeagueIndex > 0) {
        currentLeagueIndex--;
        updateLeagueDisplay();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("Document loaded");
    userBalance = localStorage.getItem('coins') || 0; // Инициализируем userBalance значением 0, если localStorage пуст
    currentLeagueIndex = leagues.indexOf(getCurrentLeague(userBalance)); // Устанавливаем начальный индекс лиги
    updateProgressBar(userBalance);
    updateLeagueDisplay(); // Вызываем обновление отображения лиги
});


function getCurrentLeague(balance) {
    for (let i = leagues.length - 1; i >= 0; i--) {
        if (balance >= leagueGoals[leagues[i]]) {
            return leagues[i];
        }
    }
}


function updateProgressBar(balance) {
    let currentLeague = getCurrentLeague(balance);
    let currentLeagueGoal = leagueGoals[currentLeague];
    let nextLeague = leagues[currentLeagueIndex + 1];
    let nextLeagueGoal = leagueGoals[nextLeague];

    // Рассчитываем прогресс в процентах
    let progressToNextLeague = ((balance - currentLeagueGoal) / (nextLeagueGoal - currentLeagueGoal)) * 100;

    // Если прогресс меньше 0%, устанавливаем его на 0%
    if (progressToNextLeague < 0) {
        progressToNextLeague = 0;
    }
    // Если прогресс больше 100%, устанавливаем его на 100%
    else if (progressToNextLeague > 100) {
        progressToNextLeague = 100;
    }

    // Обновляем стиль прогресс-бара
    document.getElementById('progress-bar').style.width = progressToNextLeague + '%';

    // Форматируем числа с разделителями тысяч для отображения
    const formatter = new Intl.NumberFormat('ru-RU');
    document.getElementById('progress-text').innerText = `${formatter.format(balance)} / ${formatter.format(nextLeagueGoal)} (${progressToNextLeague.toFixed(2)}%)`;

    // Обновляем текущую и следующую лигу
    document.getElementById('current-league').innerText = currentLeague;
    document.getElementById('next-league').innerText = nextLeague;
}
