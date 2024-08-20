import TelegramBot from 'node-telegram-bot-api';
import express from 'express';
import useragent from 'express-useragent';
import mysql from 'mysql2';

const token = '7179110555:AAEE6yVCO-ZhWGz3o1D6NeV1OxM8U45SUdY';
const adminChatId = '856743757';
const webAppUrl = `https://mgadji.github.io/Coinqwwiwqwiqokskjksjdsjdsd`;
const bot = new TelegramBot(token, { polling: true });
import cors from 'cors';
const app = express();

// Настройка CORS
app.use(cors({
  origin: '*', // Разрешает запросы с любого домена
  methods: ['GET', 'POST'], // Разрешенные методы
  allowedHeaders: ['Content-Type'] // Разрешенные заголовки
}));

app.use(express.json()); // Парсинг JSON данных
app.use(useragent.express());

// Подключение к MySQL базе данных
const db = mysql.createConnection({
  host: '45.91.201.68',
  port: 3306,
  user: 'mgadj',
  password: 'T3st#Passw',
  database: 'users',
  connectTimeout: 10000
});

// Подключение к базе данных
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected');
});

// Обработчик команды /start
bot.onText(/\/start(.+)?/, (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id.toString();
  const username = msg.from.username ? msg.from.username : 'пользователь';

  let inviterId = 'none';
  if (match[1]) {
    inviterId = match[1].trim();
  }

  // Проверяем наличие пользователя в базе данных по ID
  let sql = 'SELECT * FROM users WHERE ID = ?';
  db.query(sql, [userId], (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length === 0) {
      // Создаем новую запись, если пользователя нет в базе данных
      sql = 'INSERT INTO users (ID, username, balance, max_energy, energy, fren_invite, referals_count, tap_bot, tasks, last_visit, one_tap, sec_recharg, turbo_tap, full_energy, league) VALUES (?, ?, 0, 500, 500, ?, 0, "no", 0, NOW(), 1, 1, 3, 3, "bronze")';

      db.query(sql, [userId, username, inviterId], (err, result) => {
        if (err) {
          throw err;
        }
        if (inviterId !== 'none') {
          const inviteMessage = `👤 User @${username} has successfully registered!`;
          bot.sendMessage(inviterId, inviteMessage);
          // Увеличиваем количество рефералов у пригласившего
          sql = 'UPDATE users SET referals_count = referals_count + 1, balance = balance + 50000 WHERE ID = ?';
          db.query(sql, [inviterId], (err, result) => {
            if (err) {
              throw err;
            }
          });
          // Начисляем бонус пригласившему
          sql = 'UPDATE users SET balance = balance + 50000 WHERE ID = ?';
          db.query(sql, [userId], (err, result) => {
            if (err) {
              throw err;
            }
          });
        }
      });
    } else {
      // Обновляем username, если пользователь уже существует
      sql = 'UPDATE users SET username = ? WHERE ID = ?';
      db.query(sql, [username, userId], (err, result) => {
        if (err) {
          throw err;
        }
      });
    }

    // Получаем данные пользователя
    sql = 'SELECT * FROM users WHERE ID = ?';
    db.query(sql, [userId], (err, result) => {
      if (err) {
        throw err;
      }
      const userData = result[0];

      // Отправляем приветственное сообщение
      const welcomeMessage = 
        `Hello, ${username}! This is Nebulacoin 👋\n\nTap on the coin and see your balance rise.\n\nDo you have friends, relatives or colleagues?\nInvite them all to the game.\nMore friends, more coins.\n\nThat’s all you need to know to get started.`;
      const replyMarkup = {
        inline_keyboard: [
          [
            {
              text: "💰Start earning",
              web_app: { url: `${webAppUrl}?id=${userId}` },
            },
          ],
          [
            {
              text: "🤝Join Community",
              url: "https://t.me/thenebulacoin"
            }
          ],
          [
            {
              text: "💬Support",
              url: "https://t.me/nebulacoin_support_bot"
            }
          ]
        ],
      };

      bot.sendMessage(chatId, welcomeMessage, {
        reply_markup: replyMarkup,
      });
    });
  });
});

// Обработчик маршрута /redirect
app.get('/redirect', (req, res) => {
  const source = req.useragent;

  // Определение целевого URL на основе типа устройства
  let targetUrl;
  if (source.isMobile || source.isTablet) {
    targetUrl = `https://mgadji.github.io/Coinqwwiwqwiqokskjksjdsjdsd/`;
  } else {
    targetUrl = `https://9f5cac20-b607-4abc-bda9-073c9707c3e5.selstorage.ru`;
  }

  //console.log('Redirecting to:', targetUrl);
  res.redirect(targetUrl);
});



// Обработчик команды /profile
/*bot.onText(/\/profile/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id.toString();
  const username = msg.from.username ? msg.from.username : 'пользователь';
  
  let sql = 'SELECT * FROM users WHERE ID = ?';
  
  db.query(sql, [userId], (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length === 0) {
      bot.sendMessage(chatId, 'User not found in database\n\nClick on command /start');
    } else {
      const userData = result[0];
      // Создаем ссылку с параметрами
      const userParams = `?id=${userData.ID}`;
      const userWebAppUrl = `${webAppUrl}${userParams}`;
      const replyMarkup = {
        inline_keyboard: [
          [
            {
              text: `💰Start earning`,
              web_app: { url: `${userWebAppUrl}/redirect` },
            },
          ],
          [
            {
              text: "🤝Join Community",
              url: "https://t.me/thenebulacoin"
            }
          ],
          [
            {
              text: "💬Support",
              url: "https://t.me/nebulacoin_support_bot"
            }
          ]
        ],
      };
      const replyMessage = `
*${username}* profile

Balance: *${userData.balance}*
Invited friends: *${userData.referals_count}*
Energy now: *${userData.energy}*
League now: *${userData.league}*

/profile for personal stats
      `;
      bot.sendMessage(chatId, replyMessage, { parse_mode: 'Markdown', reply_markup: replyMarkup,});
    }
  });
});*/

// Обработчик команды /admin
bot.onText(/\/admin/, (msg) => {
  const chatId = msg.chat.id;

  if (chatId.toString() === adminChatId) {
    // Запрашиваем количество строк в таблице
    const countQuery = 'SELECT COUNT(*) AS totalRows FROM users';
    db.query(countQuery, (err, result) => {
      if (err) {
        bot.sendMessage(chatId, `Ошибка при выполнении запроса: ${err.message}`);
        return;
      }
      const totalRows = result[0].totalRows;

      // Запрашиваем сумму всех значений в столбце balance
      const balanceSumQuery = 'SELECT SUM(balance) AS totalBalance FROM users';
      db.query(balanceSumQuery, (err, result) => {
        if (err) {
          bot.sendMessage(chatId, `Ошибка при выполнении запроса: ${err.message}`);
          return;
        }
        const totalBalance = result[0].totalBalance;

        // Запрашиваем максимальное значение баланса и соответствующего пользователя
        const maxBalanceQuery = 'SELECT ID, username, balance FROM users ORDER BY balance DESC LIMIT 1';
        db.query(maxBalanceQuery, (err, result) => {
          if (err) {
            bot.sendMessage(chatId, `Ошибка при выполнении запроса: ${err.message}`);
            return;
          }
          const maxBalanceUser = result[0];

          // Формируем сообщение
          const adminMessage = `
*Общая информация о базе данных:*

- Количество пользователей: *${totalRows}*
- Сумма баланса всех пользователей: *${totalBalance}*
- Пользователь с максимальным балансом: ID *${maxBalanceUser.ID}* (@${maxBalanceUser.username}), Баланс *${maxBalanceUser.balance}*
`;

          bot.sendMessage(chatId, adminMessage, { parse_mode: 'Markdown' });
        });
      });
    });
  }
});

// Обработчик всех остальных сообщений
bot.on('message', (msg) => {
  const text = msg.text;

  // Исключаем обработку команд /start, /admin и /profile
  if (text.startsWith('/start') || text.startsWith('/admin')) {
    return;
  }

  const chatId = msg.chat.id;
  const userId = msg.from.id.toString();
  const username = msg.from.username ? msg.from.username : 'пользователь';
  
  let sql = 'SELECT * FROM users WHERE ID = ?';
  
  db.query(sql, [userId], (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length === 0) {
      bot.sendMessage(chatId, 'User not found in database\n\nClick on command /start');
    } else {
      const userData = result[0];
      const replyMarkup = {
        inline_keyboard: [
          [
            {
              text: `💰Start earning`,
              web_app: { url: `${webAppUrl}?id=${userId}` },
            },
          ],
          [
            {
              text: "🤝Join Community",
              url: "https://t.me/thenebulacoin"
            }
          ],
          [
            {
              text: "💬Support",
              url: "https://t.me/nebulacoin_support_bot"
            }
          ]
        ],
      };
      const replyMessage = `No need for unnecessary words, time to tap!🤪`;
      bot.sendMessage(chatId, replyMessage, { parse_mode: 'Markdown', reply_markup: replyMarkup,});
    }
  });
});

// Обработчик маршрута /update
app.post('/update', (req, res) => {
  const { ID, balance, max_energy, energy, last_visit, one_tap, sec_recharg, league } = req.body;

  // Проверьте данные
  //console.log('Полученные данные:', { ID, balance, max_energy, energy, last_visit, one_tap, sec_recharg, league });

  // Обновление данных в базе данных
  const query = `
      UPDATE users 
      SET balance = ?, max_energy = ?, energy = ?, last_visit = ?, one_tap = ?, sec_recharg = ?, league = ? 
      WHERE ID = ?
  `;
  const values = [balance, max_energy, energy, last_visit, one_tap, sec_recharg, league, ID];

  db.query(query, values, (error, results) => {
      if (error) {
          console.error('Ошибка при выполнении запроса:', error);
          return res.status(500).json({ message: 'Ошибка при обновлении базы данных' });
      }
      //console.log('Результаты запроса:', results);
      res.json({ message: 'Database update successful' });
  });
});

// Обработчик маршрута /getData
app.get('/getData', (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  // Получаем данные пользователя из базы данных
  let sql = `SELECT * FROM users WHERE ID = ?`;
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Ошибка при выполнении запроса:', err);
      return res.status(500).json({ message: 'Ошибка при получении данных пользователя' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(result[0]);
  });
});

app.get('/api/friend-count', (req, res) => {
  const userId = req.query.userId;

  const sql = 'SELECT referals_count FROM users WHERE ID = ?';
  db.query(sql, [userId], (err, result) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      if (result.length === 0) {
          return res.status(404).json({ error: 'User not found' });
      }
      res.json({ count: result[0].referals_count });
  });
});

app.get('/api/friends-list', (req, res) => {
  const userId = req.query.userId;

  const sql = 'SELECT username, balance FROM users WHERE fren_invite = ?';
  db.query(sql, [userId], (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json({ friends: results });
  });
});


// Маршрут для обновления приглашенного пользователя
app.get('/invite', (req, res) => {
  const { inviteId, newUserId } = req.query;

  // Обновляем запись с новым приглашением
  let sql = `UPDATE users SET fren_invite = ? WHERE ID = ?`;
  db.query(sql, [inviteId, newUserId], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    
    // Начисляем бонусы
    sql = `UPDATE users SET balance = balance + 50000 WHERE ID = ?`;
    db.query(sql, [newUserId], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }

      sql = `UPDATE users SET balance = balance + 50000 WHERE ID = ?`;
      db.query(sql, [inviteId], (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.send('User invited and bonuses applied');
      });
    });
  });
});

app.get('/check-ref', (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  // Получаем данные пользователя из базы данных
  let sql = `SELECT * FROM users WHERE ID = ?`;
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Ошибка при выполнении запроса:', err);
      return res.status(500).json({ message: 'Ошибка при получении данных пользователя' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(result[0]);
  });
});


// Запуск сервера
const port = 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
