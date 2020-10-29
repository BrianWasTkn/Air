const { request } = require("express")

const { Message, Client } = require('discord.js');
/**
 * 
 * @param {Client} bot 
 * @param {Message} message 
 * @param {Array} args 
 */
module.exports.run = async (bot, message, args) => {
    const author = await bot.fetchUser(message.author.id);
    if (author.coinsInWallet < 200) return message.channel.send(`You need atleast **200** coins to use this command.`);
    if (message.guild.members.cache == undefined) return message.channel.send(`Seems like members here aren't cached.`);
    if (message.guild.memberCount < 5) return message.channel.send(`This server has less than 5 members, you can't use this command.`);
    const members = message.guild.members.cache.filter(x => x.user.id != message.author.id && !x.user.bot).array();
    const random = Math.floor(Math.random() * members.length);
    const memberPicked = members[random];
    const target = await bot.fetchUser(memberPicked.user.id);
    const randomNumber = Math.floor(Math.random() * 100) + 100;

    const msg = await message.channel.send(`**Searching for a target to hack...**`);

    setTimeout(async () => {
        if (target.coinsInWallet < randomNumber) {
            author.coinsInWallet -= randomNumber;
            target.coinsInWallet += randomNumber;

            await author.save();
            await target.save();
            msg.delete();
            message.channel.send(`Turns out **${memberPicked.user.tag}** Didn't have much coins so you end up paying them **${randomNumber}** coins...`);
        } else {
            author.coinsInWallet += randomNumber;
            target.coinsInWallet -= randomNumber;

            await author.save();
            await target.save();
            msg.delete();
            message.channel.send(`You hacked **${memberPicked.user.tag}** and gained **${randomNumber}** coins.`);
        }
    }, 5000);
    return true;
}

module.exports.config = {
    name: 'hack', // Command Name
    description: 'Hack a random member.', // Description
    usage: 'air hack', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: [], // Aliases 
    bankSpace: 5, // Amount of bank space to give when command is used.
    cooldown: 60 // Command Cooldown
}