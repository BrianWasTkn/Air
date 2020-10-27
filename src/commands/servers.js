module.exports.run = async (bot, message, args) => {
    message.channel.send(`Servers amount: **${bot.guilds.cache.size.toLocaleString()}**\nUsers amount: **${bot.users.cache.size}**`);
}
module.exports.config = {
    name: 'servers', // Command Name
    description: 'See amount of bot\'s servers', // Description
    usage: 'air servers', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: [], // Aliases 
    bankSpace: 5, // Amount of bank space to give when command is used.
    cooldown: 5 // Command Cooldown
}