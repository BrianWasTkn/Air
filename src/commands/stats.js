const { Client, Message, MessageEmbed } = require("discord.js")
const pm = require('pretty-ms');
/**
 * 
 * @param {Client} bot 
 * @param {Message} message 
 * @param {String} args 
 */
module.exports.run = async (bot, message, args) => {
    const statsEmbed = new MessageEmbed()
    .setAuthor(bot.user.tag, bot.user.displayAvatarURL())
    .addField(`Cached Users`,`${bot.users.cache.size}`, true)
    .addField(`Cached Servers`, `${bot.guilds.cache.size}`, true)
    .addField(`Used Commands`, `${bot.commandsUsed.toLocaleString()}`, true)
    .addField(`Uptime`,`${pm(bot.uptime)}`, true)
    .addField(`Ping`,`${Math.floor(bot.ws.ping)}`, true)
    .addField(`Developers`,`Gav#5315, Crazy Shooting#7097`, true)
    .setColor('#81bcfc')
    .setTimestamp()
    message.channel.send(statsEmbed);
}
module.exports.config = {
    name: 'stats',
    description: 'See the bot\'s statisctics',
    usage: 'air stats',
    botPerms: [],
    userPerms: [],
    aliases: ['servers','users'],
    bankSpace: 5,
    cooldown: 5
}