require('dotenv').config();
const { Collection } = require('discord.js');
const MongoClient = require('./utils/MongoClient');
const DBL = require("dblapi.js");
const bot = new MongoClient();
/*const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);*/

const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc1MjA2MTMyNDY4MjQ2MTI1NSIsImJvdCI6dHJ1ZSwiaWF0IjoxNjAzNzM1OTUzfQ.p4A4LAJ3BF-BxGBU_OYvpf7gg2e2w8ja9yuu_eDtahk', { webhookAuth: '69420gamersdashcruftgavcs', webhookPort: 5000 }, bot);

bot.login(process.env.TOKEN);

bot.commands = new Collection();
bot.aliases = new Collection();
bot.cooldowns = new Collection();
bot.dbl = dbl;

require('./utils/handlers/command')(bot);
require('./utils/handlers/event')(bot);

dbl.webhook.on('vote', async (vote) => {
    const user = await bot.fetchUser(vote.user);

    console.log(user.coinsInWallet);

    user.coinsInWallet += 4000;
    await user.save();
})