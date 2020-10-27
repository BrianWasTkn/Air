require('dotenv').config();
const { Collection } = require('discord.js');
const MongoClient = require('./utils/MongoClient');
const DBL = require("dblapi.js");
const bot = new MongoClient();
/*const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);*/

const dbl = new DBL(process.env.TOPGGWEBHOOK, /*{ webhookAuth: process.env.WEBHOOKAUTH, webhookPort: 5000 },*/ bot);

bot.login(process.env.TOKEN);

bot.commands = new Collection();
bot.aliases = new Collection();
bot.cooldowns = new Collection();
bot.dbl = dbl;

require('./utils/handlers/command')(bot);
require('./utils/handlers/event')(bot);

/*dbl.webhook.on('vote', async (vote) => {
    const user = await bot.fetchUser(vote.user);

    console.log(user.coinsInWallet);

    user.coinsInWallet += 4000;
    await user.save();
})*/