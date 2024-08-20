//localStorage.clear();
const body = document.body;
const image = body.querySelector('#coin');
const h1 = body.querySelector('h1');
const touchContainer = body.querySelector('#touch-container');

// Получаем параметры из URL
const urlParams = new URLSearchParams(window.location.search);
const user = urlParams.get('id'); //urlParams.get('id')
const baseUrl = 'https://nebulacoindatabase.site';
let userId = localStorage.getItem('userId');
if (userId === null) {
    localStorage.setItem('userId', `${user}`);
    userId = `${user}`;
}
console.log(`${userId}`)

// Функция для установки значений по умолчанию
function setDefaultValues() {
    fetch(`${baseUrl}/getData?userId=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        localStorage.removeItem('coins');
        localStorage.removeItem('total');
        localStorage.removeItem('count');
        localStorage.removeItem('sec_recharg');
        localStorage.removeItem('date');

        let coins = localStorage.getItem('coins');
        let power = localStorage.getItem('power');
        let total = localStorage.getItem('total');
        let count = localStorage.getItem('count');
        let sec_recharg = localStorage.getItem('sec_recharg');
        let date = localStorage.getItem('date');

        // Проверка и установка значений в localStorage, если они отсутствуют
        if (coins === null) {
            localStorage.setItem('coins', data.balance);
            coins = data.balance || 0;
        }
        if (total === null) {
            localStorage.setItem('total', data.max_energy);
            total = data.max_energy || 500;
        }
        if (power === null) {
            localStorage.setItem('power', data.energy);
            power = data.energy || 500;
        }
        if (count === null) {
            localStorage.setItem('count', data.one_tap);
            count = data.one_tap || 1;
        }
        if (sec_recharg === null) {
            localStorage.setItem('sec_recharg', data.sec_recharg);
            sec_recharg = data.sec_recharg || 1;
        }
        if (date === null) {
            localStorage.setItem('date', data.date);
            date = data.date;
        }

        // Обновление значений на странице
        const h1 = document.querySelector('h1'); // Обновите селектор для выбора нужного элемента
        if (h1) {
            h1.textContent = Number(coins).toLocaleString();
        }

        const totalElement = document.querySelector('#total'); // Убедитесь, что элемент существует
        if (totalElement) {
            totalElement.textContent = `/${total}`;
        }

        const powerElement = document.querySelector('#power'); // Убедитесь, что элемент существует
        if (powerElement) {
            powerElement.textContent = power;
        }

        const tapElement = document.querySelector('#tap'); // Убедитесь, что элемент существует
        if (tapElement) {
            tapElement.textContent = count;
        }

        console.log('Данные успешно сохранены в localStorage');
    })
    .catch((error) => {
        console.error('Ошибка при получении данных с сервера:', error);
    });
}

// Функция для получения текущей лиги
function getCurrentLeague(balance) {
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

// Функция для обновления прогресс-бара
function updateProgressBar(balance) {
    const leagueGoals = {
        'Bronze': 10000,
        'Silver': 50000,
        'Gold': 250000,
        'Platinum': 1000000,
        'Diamond': 10000000,
        'Legendary': Infinity
    };

    let currentLeague = getCurrentLeague(balance);
    let nextLeague = Object.keys(leagueGoals).find(league => leagueGoals[league] > balance);
    let progressToNextLeague = (balance / leagueGoals[nextLeague]) * 100;

    let progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        progressBar.style.width = progressToNextLeague + '%';
    }

    let progressText = document.getElementById('progress-text');
    if (progressText) {
        progressText.innerText = `${balance.toLocaleString()} / ${leagueGoals[nextLeague].toLocaleString()} (${progressToNextLeague.toFixed(2)}%)`;
    }

    let currentLeagueElement = document.getElementById('current-league');
    if (currentLeagueElement) {
        currentLeagueElement.innerText = currentLeague;
    }

    let nextLeagueElement = document.getElementById('next-league');
    if (nextLeagueElement) {
        nextLeagueElement.innerText = nextLeague;
    }
}

// Функция для активации таймера на сброс значения
function activateTurbo() {
    let count = Number(localStorage.getItem('count'));
    count *= 10;
    localStorage.setItem('count', count);
    console.log(`Активирован режим Турбо\nTap = ${count}`);

    // Устанавливаем таймер
    setTimeout(() => {
        let count = Number(localStorage.getItem('count'));
        count = count / 10;
        localStorage.setItem('count', count);
        console.log(`Режим турбо деактивирован\nTap = ${count}`);
    }, 5000);
}

// Проверяем, был ли активирован режим Turbo на странице index.html
document.addEventListener('DOMContentLoaded', () => {
    let turboActivated = localStorage.getItem('turboActivated');
    let turboActivationTime = Number(localStorage.getItem('turboActivationTime'));
    let currentTime = Date.now();
    let turboDuration = 5000; // Продолжительность активации турбо (5 секунд)

    if (turboActivated === 'true' && (currentTime - turboActivationTime) < turboDuration) {
        activateTurbo();
        localStorage.removeItem('turboActivated'); // Удаляем флаг после активации
        localStorage.removeItem('turboActivationTime'); // Удаляем время активации
    } else {
        localStorage.removeItem('turboActivated'); // Удаляем флаг, если время истекло
        localStorage.removeItem('turboActivationTime'); // Удаляем время активации
    }

    // Устанавливаем значения по умолчанию
    setDefaultValues();


    // Обновление интерфейса значениями из localStorage
    let coins = Number(localStorage.getItem('coins'));
    let power = Number(localStorage.getItem('power'));
    let total = Number(localStorage.getItem('total'));
    let count = Number(localStorage.getItem('count'))

    h1.textContent = coins.toLocaleString();
    body.querySelector('#power').textContent = power;
    body.querySelector('#total').textContent = `/${total}`;
    body.querySelector('#tap').textContent = count;
    body.querySelector('.progress').style.width = `${(100 * power) / total}%`;

    updateProgressBar(coins);
});

// Обработка события touchstart
touchContainer.addEventListener('touchstart', (e) => {
    e.preventDefault();
    let imageRect = image.getBoundingClientRect(); // Получаем размер и позицию изображения
    let touchContainerRect = touchContainer.getBoundingClientRect(); // Получаем размер и позицию контейнера

    let totalCoinsAdded = 0;
    let totalPowerConsumed = 0;

    for (let i = 0; i < e.touches.length; i++) {
        let touch = e.touches[i];
        let x = touch.clientX - touchContainerRect.left; // Рассчитываем координаты касания относительно контейнера
        let y = touch.clientY - touchContainerRect.top;

        // Проверяем, попадает ли касание в область изображения
        if (x >= imageRect.left - touchContainerRect.left &&
            x <= imageRect.right - touchContainerRect.left &&
            y >= imageRect.top - touchContainerRect.top &&
            y <= imageRect.bottom - touchContainerRect.top) {

            if (navigator.vibrate) {
                navigator.vibrate(5); // вызов вибрации после первого касания
            }

            let coins = Number(localStorage.getItem('coins'));
            let power = Number(localStorage.getItem('power'));
            let total = Number(localStorage.getItem('total'));
            let count = Number(localStorage.getItem('count')); // Получаем значение из localStorage

            if (power > count) {
                let touchCount = Number(localStorage.getItem('count')) * e.touches.length;

                // Увеличиваем количество монет и потребляемую энергию на основании количества касаний
                totalCoinsAdded += touchCount;
                totalPowerConsumed += touchCount;

                localStorage.setItem('coins', `${coins + totalCoinsAdded}`);
                h1.textContent = `${(coins + totalCoinsAdded).toLocaleString()}`;

                let newPower = power - totalPowerConsumed;
                if (newPower < 0) {
                    newPower = 0;
                }
                localStorage.setItem('power', `${newPower}`);
                body.querySelector('#power').textContent = `${newPower}`;
                body.querySelector('#tap').textContent = count;
                if (newPower > total) { // Проверка, чтобы энергия не превышала максимальное значение
                    newPower = total;
                    localStorage.setItem('power', `${newPower}`);
                }

                // Обновляем прогресс-бар
                body.querySelector('.progress').style.width = `${(100 * newPower) / total}%`;

                // Создание и добавление элемента +1 для каждого касания
                for (let j = 0; j < e.touches.length; j++) {
                    let touch = e.touches[j];
                    let x = touch.clientX - touchContainerRect.left;
                    let y = touch.clientY - touchContainerRect.top;

                    const plusOne = document.createElement('div');
                    plusOne.className = 'plus-one';
                    plusOne.textContent = `+${count}`;
                    plusOne.style.position = 'absolute';
                    plusOne.style.left = `${x}px`;
                    plusOne.style.top = `${y}px`;
                    plusOne.style.transform = 'translate(-50%, -50%)'; // Центрирование текста
                    touchContainer.appendChild(plusOne);

                    // Удаляем элемент через 1 секунду
                    setTimeout(() => {
                        plusOne.remove();
                    }, 1000);
                }

                // Анимация изображения
                if (x < 150 && y < 150) {
                    image.style.transform = 'translate(-0.25rem, -0.25rem) skewY(-10deg) skewX(5deg)';
                } else if (x < 150 && y > 150) {
                    image.style.transform = 'translate(-0.25rem, 0.25rem) skewY(-10deg) skewX(5deg)';
                } else if (x > 150 && y > 150) {
                    image.style.transform = 'translate(0.25rem, 0.25rem) skewY(10deg) skewX(-5deg)';
                } else if (x > 150 && y < 150) {
                    image.style.transform = 'translate(0.25rem, -0.25rem) skewY(10deg) skewX(-5deg)';
                }

                // Сброс анимации изображения через 100 мс
                setTimeout(() => {
                    image.style.transform = 'translate(0px, 0px)';
                }, 100);
                updateServerData();

                updateProgressBar(Number(localStorage.getItem('coins'))); // Обновление прогресс-бара
            }
        }
    }
});

function updateEnergyOnLoad() {
    const power = Number(localStorage.getItem('power'));
    const total = Number(localStorage.getItem('total'));
    const sec_recharg = Number(localStorage.getItem('sec_recharg'));
    const lastUpdate = Number(localStorage.getItem('lastUpdate')) || Date.now();

    const now = Date.now();
    const elapsedSeconds = Math.floor((now - lastUpdate) / 1000); // прошедшее время в секундах

    let newPower = power + elapsedSeconds * sec_recharg;
    if (newPower > total) {
        newPower = total;
    }

    localStorage.setItem('power', newPower);
    localStorage.setItem('lastUpdate', now);

    // Обновление интерфейса
    const powerElement = document.querySelector('#power');
    if (powerElement) {
        powerElement.textContent = newPower;
    }
    const progressElement = document.querySelector('.progress');
    if (progressElement) {
        progressElement.style.width = `${(100 * newPower) / total}%`;
    }
}

setInterval(() => {
    let sec_recharg = Number(localStorage.getItem('sec_recharg'));
    let power = Number(localStorage.getItem('power'));
    let total = Number(localStorage.getItem('total'));
    let count = Number(localStorage.getItem('count'));
    if (total > power) {
        let newPower = power + sec_recharg;
        if (newPower > total) { // Проверка, чтобы энергия не превышала максимальное значение
            newPower = total;
        }
        localStorage.setItem('power', `${newPower}`);
        body.querySelector('#power').textContent = `${newPower}`;
        body.querySelector('#tap').textContent = count;
        body.querySelector('.progress').style.width = `${(100 * newPower) / total}%`;
    }
}, 1000);

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

    fetch(`${baseUrl}/update`, {
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

window.addEventListener('beforeunload', () => {
    updateServerData();
    updateEnergyOnLoad();
});

window.addEventListener('unload', () => {
    updateServerData();
});