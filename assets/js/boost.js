const docBody = document.body;
let coins = Number(localStorage.getItem('coins'));
let total = Number(localStorage.getItem('total'));
let sec_recharg = Number(localStorage.getItem('sec_recharg'));
let count = Number(localStorage.getItem('count'));
let userId = localStorage.getItem('userId');
// Обновляем текстовое содержание элемента с балансом
docBody.querySelector('#balance').textContent = coins.toLocaleString();

// Функция для обновления баланса на странице
function updateBalance() {
    coins = Number(localStorage.getItem('coins'));
    docBody.querySelector('#balance').textContent = coins.toLocaleString();
}
updateBalance();

// Функция для получения текущей лиги
function getCurrentLeague(coins) {
    const leagueGoals = {
        'Bronze': 100000,
        'Silver': 500000,
        'Gold': 2500000,
        'Platinum': 10000000,
        'Diamond': 100000000,
        'Legendary': Infinity
    };

    if (balance >= leagueGoals['Diamond']) {
        return 'Legendary';
    } else if (balance >= leagueGoals['Platinum']) {
        return 'Diamond';
    } else if (balance >= leagueGoals['Gold']) {
        return 'Platinum';
    } else if (balance >= leagueGoals['Silver']) {
        return 'Gold';
    } else if (balance >= leagueGoals['Bronze']) {
        return 'Silver';
    } else {
        return 'Bronze';
    }
}
// Определение функции для форматирования даты
function formatDateForServer(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Функция для обновления данных на сервере
function updateServerData() {
    const currentCoins = localStorage.getItem('coins');
    const currentPower = localStorage.getItem('power');
    const currentTotal = localStorage.getItem('total');
    const currentCount = localStorage.getItem('count');
    const secRecharg = localStorage.getItem('sec_recharg');
    const currentLeague = getCurrentLeague(currentCoins);
    const currentDate = new Date().toISOString();
    const formattedDate = formatDateForServer(currentDate);

    const data = {
        ID: userId, // Передаем ID пользователя
        balance: currentCoins,
        max_energy: currentTotal,
        energy: currentPower,
        one_tap: currentCount,
        sec_recharg: secRecharg,
        league: currentLeague,
        last_visit: formattedDate
    };

    console.log('Отправка данных на сервер:', data);

    fetch('https://nebulacoindatabase.site/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Ответ сервера:', data);
    })
    .catch((error) => {
        console.error('Ошибка при обновлении базы данных:', error);
    });
}

// Функция для обновления уровня и стоимости
function updateBoosters() {
    localStorage.removeItem('multiTapLevel');
    localStorage.removeItem('multiTapCost');
    localStorage.removeItem('energyLimitLevel');
    localStorage.removeItem('energyLimitCost');
    localStorage.removeItem('rechargeLevel');
    localStorage.removeItem('rechargeCost');
    let multiTapLevel = Number(localStorage.getItem('multiTapLevel'));
    let multiTapCost = Number(localStorage.getItem('multiTapCost'));
    let energyLimitLevel = Number(localStorage.getItem('energyLimitLevel'));
    let energyLimitCost = Number(localStorage.getItem('energyLimitCost'));
    let rechargeLevel = Number(localStorage.getItem('rechargeLevel'));
    let rechargeCost = Number(localStorage.getItem('rechargeCost'));

    if (!multiTapLevel) {
        if (count === 1) {
            multiTapCost = 100;
            multiTapLevel = 1;
        } else if (count === 2) {
            multiTapCost = 200;
            multiTapLevel = 2;
        } else if (count === 3) {
            multiTapCost = 400;
            multiTapLevel = 3;
        } else if (count === 4) {
            multiTapCost = 800;
            multiTapLevel = 4;
        } else if (count === 5) {
            multiTapCost = 1600;
            multiTapLevel = 5;
        } else if (count === 6) {
            multiTapCost = 3200;
            multiTapLevel = 6;
        } else if (count === 7) {
            multiTapCost = 6400;
            multiTapLevel = 7;
        } else if (count === 8) {
            multiTapCost = 12800;
            multiTapLevel = 8;
        } else if (count === 9) {
            multiTapCost = 25600;
            multiTapLevel = 9;
        } else if (count === 10) {
            multiTapCost = 51200;
            multiTapLevel = 10;
        } else if (count === 11) {
            multiTapCost = 102400;
            multiTapLevel = 11;
        } else if (count === 12) {
            multiTapCost = 204800;
            multiTapLevel = 12;
        } else if (count === 13) {
            multiTapCost = 409600;
            multiTapLevel = 13;
        } else if (count === 14) {
            multiTapCost = 819200;
            multiTapLevel = 14;
        } else if (count === 15) {
            multiTapCost = 1638400;
            multiTapLevel = 15;
        } else if (count === 16) {
            multiTapCost = 3276800;
            multiTapLevel = 16;
        } else if (count === 17) {
            multiTapCost = 6553600;
            multiTapLevel = 17;
        } else if (count === 18) {
            multiTapCost = 13107200;
            multiTapLevel = 18;
        } else if (count === 19) {
            multiTapCost = 26214400;
            multiTapLevel = 19;
        } else if (count === 20) {
            multiTapCost = 52428800;
            multiTapLevel = 20;
        } else if (count === 21) {
            multiTapCost = 104857600;
            multiTapLevel = 21;
        } else if (count === 22) {
            multiTapCost = 209715200;
            multiTapLevel = 22;
        } else if (count === 23) {
            multiTapCost = 419430400;
            multiTapLevel = 23;
        } else if (count === 24) {
            multiTapCost = 838860800;
            multiTapLevel = 24;
        } else if (count === 25) {
            multiTapCost = 1677721600;
            multiTapLevel = 25;
        } else if (count === 26) {
            multiTapCost = 3355443200;
            multiTapLevel = 26;
        } else if (count === 27) {
            multiTapCost = 6710886400;
            multiTapLevel = 27;
        } else if (count === 28) {
            multiTapCost = 13421772800;
            multiTapLevel = 28;
        } else if (count === 29) {
            multiTapCost = 26843545600;
            multiTapLevel = 29;
        } else if (count === 30) {
            multiTapCost = 53687091200;
            multiTapLevel = 30;
        } else if (count === 31) {
            multiTapCost = 107374182400;
            multiTapLevel = 31;
        } else if (count === 32) {
            multiTapCost = 214748364800;
            multiTapLevel = 32;
        } else if (count === 33) {
            multiTapCost = 429496729600;
            multiTapLevel = 33;
        } else if (count === 34) {
            multiTapCost = 858993459200;
            multiTapLevel = 34;
        } else if (count === 35) {
            multiTapCost = 1717986918400;
            multiTapLevel = 35;
        } else if (count === 36) {
            multiTapCost = 3435973836800;
            multiTapLevel = 36;
        } else if (count === 37) {
            multiTapCost = 6871947673600;
            multiTapLevel = 37;
        } else if (count === 38) {
            multiTapCost = 13743895347200;
            multiTapLevel = 38;
        } else if (count === 39) {
            multiTapCost = 27487790694400;
            multiTapLevel = 39;
        } else if (count === 40) {
            multiTapCost = 54975581388800;
            multiTapLevel = 40;
        } else if (count === 41) {
            multiTapCost = 109951162777600;
            multiTapLevel = 41;
        } else if (count === 42) {
            multiTapCost = 219902325555200;
            multiTapLevel = 42;
        } else if (count === 43) {
            multiTapCost = 439804651110400;
            multiTapLevel = 43;
        } else if (count === 44) {
            multiTapCost = 879609302220800;
            multiTapLevel = 44;
        } else if (count === 45) {
            multiTapCost = 1759218604441600;
            multiTapLevel = 45;
        } else if (count === 46) {
            multiTapCost = 3518437208883200;
            multiTapLevel = 46;
        } else if (count === 47) {
            multiTapCost = 7036874417766400;
            multiTapLevel = 47;
        } else if (count === 48) {
            multiTapCost = 14073748835532800;
            multiTapLevel = 48;
        } else if (count === 49) {
            multiTapCost = 28147497671065600;
            multiTapLevel = 49;
        } else if (count === 50) {
            multiTapCost = "Max";
            multiTapLevel = 50;
        }
        localStorage.setItem('multiTapLevel', multiTapLevel);
        localStorage.setItem('multiTapCost', multiTapCost);
    }

    if (!energyLimitLevel) {
        if (total === 500) {
            energyLimitCost = 100;
            energyLimitLevel = 1;
        } else if (total === 1000) {
            energyLimitCost = 200;
            energyLimitLevel = 2;
        } else if (total === 1500) {
            energyLimitCost = 400;
            energyLimitLevel = 3;
        } else if (total === 2000) {
            energyLimitCost = 800;
            energyLimitLevel = 4;
        } else if (total === 2500) {
            energyLimitCost = 1600;
            energyLimitLevel = 5;
        } else if (total === 3000) {
            energyLimitCost = 3200;
            energyLimitLevel = 6;
        } else if (total === 3500) {
            energyLimitCost = 6400;
            energyLimitLevel = 7;
        } else if (total === 4000) {
            energyLimitCost = 12800;
            energyLimitLevel = 8;
        } else if (total === 4500) {
            energyLimitCost = 25600;
            energyLimitLevel = 9;
        } else if (total === 5000) {
            energyLimitCost = 51200;
            energyLimitLevel = 10;
        } else if (total === 5500) {
            energyLimitCost = 102400;
            energyLimitLevel = 11;
        } else if (total === 6000) {
            energyLimitCost = 204800;
            energyLimitLevel = 12;
        } else if (total === 6500) {
            energyLimitCost = 409600;
            energyLimitLevel = 13;
        } else if (total === 7000) {
            energyLimitCost = 819200;
            energyLimitLevel = 14;
        } else if (total === 7500) {
            energyLimitCost = 1638400;
            energyLimitLevel = 15;
        } else if (total === 8000) {
            energyLimitCost = 3276800;
            energyLimitLevel = 16;
        } else if (total === 8500) {
            energyLimitCost = 6553600;
            energyLimitLevel = 17;
        } else if (total === 9000) {
            energyLimitCost = 13107200;
            energyLimitLevel = 18;
        } else if (total === 9500) {
            energyLimitCost = 26214400;
            energyLimitLevel = 19;
        } else if (total === 10000) {
            energyLimitCost = 52428800;
            energyLimitLevel = 20;
        } else if (total === 10500) {
            energyLimitCost = 104857600;
            energyLimitLevel = 21;
        } else if (total === 11000) {
            energyLimitCost = 209715200;
            energyLimitLevel = 22;
        } else if (total === 11500) {
            energyLimitCost = 419430400;
            energyLimitLevel = 23;
        } else if (total === 12000) {
            energyLimitCost = 838860800;
            energyLimitLevel = 24;
        } else if (total === 12500) {
            energyLimitCost = 1677721600;
            energyLimitLevel = 25;
        } else if (total === 13000) {
            energyLimitCost = 3355443200;
            energyLimitLevel = 26;
        } else if (total === 13500) {
            energyLimitCost = 6710886400;
            energyLimitLevel = 27;
        } else if (total === 14000) {
            energyLimitCost = 13421772800;
            energyLimitLevel = 28;
        } else if (total === 14500) {
            energyLimitCost = 26843545600;
            energyLimitLevel = 29;
        } else if (total === 15000) {
            energyLimitCost = 53687091200;
            energyLimitLevel = 30;
        } else if (total === 15500) {
            energyLimitCost = 107374182400;
            energyLimitLevel = 31;
        } else if (total === 16000) {
            energyLimitCost = 214748364800;
            energyLimitLevel = 32;
        } else if (total === 16500) {
            energyLimitCost = 429496729600;
            energyLimitLevel = 33;
        } else if (total === 17000) {
            energyLimitCost = 858993459200;
            energyLimitLevel = 34;
        } else if (total === 17500) {
            energyLimitCost = 1717986918400;
            energyLimitLevel = 35;
        } else if (total === 18000) {
            energyLimitCost = 3435973836800;
            energyLimitLevel = 36;
        } else if (total === 18500) {
            energyLimitCost = 6871947673600;
            energyLimitLevel = 37;
        } else if (total === 19000) {
            energyLimitCost = 13743895347200;
            energyLimitLevel = 38;
        } else if (total === 19500) {
            energyLimitCost = 27487790694400;
            energyLimitLevel = 39;
        } else if (total === 20000) {
            energyLimitCost = 54975581388800;
            energyLimitLevel = 40;
        } else if (total === 20500) {
            energyLimitCost = 109951162777600;
            energyLimitLevel = 41;
        } else if (total === 21000) {
            energyLimitCost = 219902325555200;
            energyLimitLevel = 42;
        } else if (total === 21500) {
            energyLimitCost = 439804651110400;
            energyLimitLevel = 43;
        } else if (total === 22000) {
            energyLimitCost = 879609302220800;
            energyLimitLevel = 44;
        } else if (total === 22500) {
            energyLimitCost = 1759218604441600;
            energyLimitLevel = 45;
        } else if (total === 23000) {
            energyLimitCost = 3518437208883200;
            energyLimitLevel = 46;
        } else if (total === 23500) {
            energyLimitCost = 7036874417766400;
            energyLimitLevel = 47;
        } else if (total === 24000) {
            energyLimitCost = 14073748835532800;
            energyLimitLevel = 48;
        } else if (total === 24500) {
            energyLimitCost = 28147497671065600;
            energyLimitLevel = 49;
        } else if (total === 25000) {
            energyLimitCost = "Max";
            energyLimitLevel = 50;
        }
        localStorage.setItem('energyLimitLevel', energyLimitLevel);
        localStorage.setItem('energyLimitCost', energyLimitCost);
    }

    if (!rechargeCost) {
        if (sec_recharg === 1) {
            rechargeCost = 1000;
            rechargeLevel = 1;
        } else if (sec_recharg === 2) {
            rechargeCost = 2000;
            rechargeLevel = 2;
        } else if (sec_recharg === 3) {
            rechargeCost = 4000;
            rechargeLevel = 3;
        } else if (sec_recharg === 4) {
            rechargeCost = 8000;
            rechargeLevel = 4;
        } else if (sec_recharg === 5) {
            rechargeCost = 16000;
            rechargeLevel = 5;
        } else if (sec_recharg === 6) {
            rechargeCost = 32000;
            rechargeLevel = 6;
        } else if (sec_recharg === 7) {
            rechargeCost = 64000;
            rechargeLevel = 7;
        } else if (sec_recharg === 8) {
            rechargeCost = 128000;
            rechargeLevel = 8;
        } else if (sec_recharg === 9) {
            rechargeCost = 256000;
            rechargeLevel = 9;
        } else if (sec_recharg === 10) {
            rechargeCost = 'Max';
            rechargeLevel = 10;
        } 
        localStorage.setItem('rechargeCost', rechargeCost);
        localStorage.setItem('rechargeLevel', rechargeLevel);
    }

    docBody.querySelector('#multiTapLevel').textContent = `${multiTapLevel} lvl`;
    docBody.querySelector('#multiTapCost').textContent = multiTapCost.toLocaleString();
    docBody.querySelector('#energyLimitLevel').textContent = `${energyLimitLevel} lvl`;
    docBody.querySelector('#energyLimitCost').textContent = energyLimitCost.toLocaleString();
    docBody.querySelector('#rechargeLevel').textContent = `${rechargeLevel} lvl`;
    docBody.querySelector('#rechargeCost').textContent = rechargeCost.toLocaleString();
    updateServerData();
}
updateBoosters();

const turbo = docBody.querySelector('#turbo');
const charge = docBody.querySelector('#charge');
const multiTap = docBody.querySelector('#multiTap');
const energyLimit = docBody.querySelector('#energyLimit');
const recharge = docBody.querySelector('#recharge');

function activateTurbo() {
    let count = Number(localStorage.getItem('count')) || 0;
    count *= 10;
    localStorage.setItem('count', count);
    console.log(`Активирован режим Турбо\nTap = ${count}`);

    setTimeout(() => {
        let count = Number(localStorage.getItem('count')) || 0;
        count = count / 10;
        localStorage.setItem('count', count);
        console.log(`Режим турбо деактивирован\nTap = ${count}`);
    }, 5000);
}

// Переменная для отслеживания оставшихся попыток
let remainingAttempts = Number(localStorage.getItem('remainingAttempts'));
if (isNaN(remainingAttempts)) {
    remainingAttempts = 3;
}
let lastResetDate = localStorage.getItem('lastResetDate') || '';

// Функция для обновления отображения количества оставшихся попыток
function updateAttemptsDisplay() {
    document.querySelector('#charge .available').textContent = `${remainingAttempts}/3 available`;
}

// Функция для проверки и сброса попыток в 01:00
function checkAndResetAttempts() {
    const now = new Date();
    const currentDateString = now.toISOString().split('T')[0];

    // Проверка, если дата последнего сброса не совпадает с текущей датой
    if (lastResetDate !== currentDateString) {
        console.log(`Дата последнего сброса (${lastResetDate}) не совпадает с текущей (${currentDateString}), сброс попыток`);
        remainingAttempts = 3;
        lastResetDate = currentDateString;
        localStorage.setItem('remainingAttempts', remainingAttempts);
        localStorage.setItem('lastResetDate', lastResetDate);
    } else {
        console.log(`Дата последнего сброса (${lastResetDate}) совпадает с текущей (${currentDateString}), попытки не сброшены`);
    }
    updateAttemptsDisplay();
}

// Обработчик нажатия на кнопку "Full Energy"
document.querySelector('#charge').addEventListener('touchstart', () => {
    if (remainingAttempts > 0) {
        let total = localStorage.getItem('total');
        localStorage.setItem('power', total);
        remainingAttempts -= 1;
        localStorage.setItem('remainingAttempts', remainingAttempts);
        updateAttemptsDisplay();
        console.log('Power set to', total);
    } else {
        console.log('No attempts left for today');
    }
});

// Установка таймера на сброс попыток в 01:00
function setResetTimer() {
    const now = new Date();
    let nextReset = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);

    // Если текущее время уже после следующего сброса на следующий день
    if (now.getTime() > nextReset.getTime()) {
        nextReset = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 0, 0, 0);
    }

    const timeUntilNextReset = nextReset - now;

    console.log(`Текущая дата и время: ${now}`);
    console.log(`Время следующего сброса: ${nextReset}`);
    console.log(`Время до следующего сброса: ${timeUntilNextReset} миллисекунд`);

    setTimeout(() => {
        remainingAttempts = 3;
        lastResetDate = new Date().toISOString().split('T')[0];
        localStorage.setItem('remainingAttempts', remainingAttempts);
        localStorage.setItem('lastResetDate', lastResetDate);
        updateAttemptsDisplay();
        setResetTimer(); // Устанавливаем таймер снова для следующего дня
    }, timeUntilNextReset);
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    checkAndResetAttempts();
    setResetTimer();
});

let currentButton = null; // Объявляем переменную в глобальной области видимости

function handlePurchase() {
    if (currentButton) {
        const id = currentButton.getAttribute('data-id');
        const costElement = document.getElementById(id + 'Cost');
        if (!costElement) {
            console.error(`Element with id "${id}Cost" not found`);
            return;
        }
        let cost = parseInt(costElement.innerText.replace(/\D/g, ''), 10) || 100; // Убираем все нецифровые символы
        if (isNaN(cost)) {
            cost = 100; // Если стоимость не определена, устанавливаем по умолчанию
        }

        if (coins >= cost) {
            coins -= cost;
            localStorage.setItem('coins', coins.toString());
            docBody.querySelector('#balance').innerText = coins.toLocaleString();

            // Обновляем уровень и стоимость
            const levelElement = document.getElementById(id + 'Level');
            const newCostElement = document.getElementById(id + 'Cost');
            let count = Number(localStorage.getItem('count'));
            if (levelElement && newCostElement) {
                let currentLevel = parseInt(levelElement.innerText, 10) || 1;
                let currentCost = parseInt(newCostElement.innerText.replace(/\D/g, ''), 10) || 100;

                currentLevel += 1;
                if (id === 'multiTap') {
                    if (currentLevel < 50) {
                        count += 1;
                        currentCost *= 2;
                        levelElement.innerText = `${currentLevel} lvl`;
                        newCostElement.innerText = currentCost.toLocaleString();
                        localStorage.setItem(id + 'Level', currentLevel.toString());
                        localStorage.setItem(id + 'Cost', currentCost.toString());
                        localStorage.setItem('count', count);
                    } else {
                        levelElement.innerText = '50 lvl';
                        newCostElement.innerText = 'Max';
                    }
                } else if (id === 'energyLimit') {
                    if (currentLevel < 50) {
                        total += 500;
                    currentCost *= 2;
                    levelElement.innerText = `${currentLevel} lvl`;
                    newCostElement.innerText = currentCost.toLocaleString();
                    localStorage.setItem(id + 'Level', currentLevel.toString());
                    localStorage.setItem(id + 'Cost', currentCost.toString());
                    localStorage.setItem('total', total);
                    } else {
                        levelElement.innerText = '50 lvl';
                        newCostElement.innerText = 'Max';
                    }
                } else if (id === 'recharge') {
                    if (currentLevel >= 10) {
                        levelElement.innerText = '10 lvl';
                        newCostElement.innerText = 'Max';
                    } else {
                        currentCost *= 2;
                        sec_recharg += 1;
                        levelElement.innerText = `${currentLevel} lvl`;
                        newCostElement.innerText = currentCost.toLocaleString();
                        localStorage.setItem(id + 'Level', currentLevel.toString());
                        localStorage.setItem(id + 'Cost', currentCost.toString());
                        localStorage.setItem('sec_recharg', sec_recharg);
                        
                    }
                }
            }

            // Обновляем UI и localStorage
            updateBoosters();

            // Закрываем модальное окно
            if (window.modal) {
                window.modal.style.display = 'none';
            }
            location.reload();
        } else {
            const actionButton = document.getElementById('task-action-button');
            actionButton.innerText = 'Not enough coins';
            setTimeout(() => {
                actionButton.innerText = 'GET';
            }, 2000);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const balanceElement = document.getElementById('balance');
    coins = parseInt(localStorage.getItem('coins') || '0', 10);
    balanceElement.innerText = coins.toLocaleString();

    const buttons = document.querySelectorAll('.boosters-button[data-id]');
    window.modal = document.getElementById('task-modal'); // Объявляем переменную modal в глобальной области видимости
    const closeBtn = document.getElementById('task-close');
    const actionButton = document.getElementById('task-action-button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            currentButton = button;
            const id = button.getAttribute('data-id');
            const imgSrc = button.querySelector('.boosters-button-image img').src;
            const title = button.querySelector('h4').innerText;
            const reward = button.querySelector('h5').innerText;

            document.getElementById('task-image').src = imgSrc;
            document.getElementById('task-title').innerText = title;
            document.getElementById('task-reward').innerText = reward;

            const costElement = document.getElementById(id + 'Cost');
            if (costElement) {
                const cost = parseInt(costElement.innerText.replace(/\D/g, ''), 10);
                document.getElementById('task-action-button').innerText = coins >= cost ? 'GET' : 'Not enough coins';
            }

            modal.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    actionButton.addEventListener('click', () => {
        handlePurchase();
    });

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});
