import TelegramBot from 'node-telegram-bot-api';
import mightyape from './checks/mightyape';
import noelleeming from './checks/noelleeming';
import warehouse from './checks/warehouse';

const token = ''; // Telegram API Key, request from @Botfather
const chatId = 000 // Chat id where you want the alert to go to (i.e. Telegram Group chat)

const bot = new TelegramBot(token, {polling: true});

// Helper to get the chat id of your group chat
// Invite the bot into your group chat and send `/id` in the chat
bot.onText(/\id/, (msg) => {
  const chatId = msg.chat.id;

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, `Chat ID: ${chatId}`);
});

let lastCheck = undefined;

bot.onText(/\/check/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `I\'m running! Will try my best to notify you when stocks are available. 👀
Last check: ${lastCheck}`);
});

const CHECK_INTERVAL = 5 // in minutes

const checkFuncs = [ mightyape, warehouse, noelleeming ];

const check = async () => {
  lastCheck = new Date().toLocaleString();
  console.log('=========================');
  console.log(`Checks started [${lastCheck}]`);
  console.log('...');

  const promises = checkFuncs.map(func => func());
  const result = (await Promise.all(promises)).filter(res => res);

  result.forEach(message => {
    bot.sendMessage(chatId, message, {disable_web_page_preview: true });
  });

  console.log('...');
  console.log('Checks completed.');
  console.log('=========================');
  // Check again in given interval
  setTimeout(async () => check(), CHECK_INTERVAL * 1000 * 60);
}

check();
