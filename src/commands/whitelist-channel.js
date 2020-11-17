const { Client, Message } = require("discord.js")

/**
 * 
 * @param {Client} bot 
 * @param {Message} message 
 * @param {Array} args 
 */
module.exports.run = async (bot, message, args) => {
    let channels = message.mentions.channels;
    const data = await bot.fetchGuild(message.guild.id);
    if (!data) return;

    if (args[0] == "add") {
        if (channels.size == 0) return message.channel.send(`Specify channel(s) to whitelist.`);
        
        for (let i = 0; i < channels.size; i++) {
            data.whitelistedChannels.push(channels.array()[i].id);
        }
        await data.save();

        message.channel.send(`Added ${channels.map(x => `<#${x.id}> `)} to whitelist.`);
    } else if (args[0] == "remove") {
        if (channels.size == 0) return message.channel.send(`Specify channel(s) to remove from whitelist.`);

        data.whitelistedChannels = data.whitelistedChannels.filter(x => channels.find(c => c.id != x));
        await data.save();
        
        message.channel.send(`Removed ${channels.map(x => `<#${x.id}> `)} from whitelist.`);
    } else {
        message.channel.send(`Specify an option \`add\`/\`remove\``);
    }
}
module.exports.config = {
    name: 'whitelist', // Command Name
    description: 'Make the work respond to commands in specific channel(s', // Description
    usage: 'air whitelist [#Channel(s)]', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: ['MANAGE_GUILD'], // User permissions needed to run command. Leave empty if nothing.
    aliases: [], // Aliases 
    bankSpace: 5, // Amount of bank space to give when command is used.
    cooldown: 5 // Command Cooldown
}