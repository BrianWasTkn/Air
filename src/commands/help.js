const { MessageEmbed } = require('discord.js');
const p = require('pretty-ms');

module.exports.run = async (bot, message, args) => {
    const command = bot.commands.get(args.slice(0).join(' ').toString().toLowerCase()) || bot.commands.get(bot.aliases.get(args.join(' ').toString().toLowerCase()));
    if (command) {
        const embed = new MessageEmbed()
            .addField('Name', command.config.name)
            .addField('Description', command.config.description)
            .addField('Usage', `\`${command.config.usage}\``)
            .addField('Aliases', `${command.config.aliases.join(', ') ? command.config.aliases : "No Aliases"}`)
            .addField('Cooldown', `${p(command.config.cooldown * 1000)}`)
            .setColor('RANDOM');
        return message.channel.send(embed);
    }
    let list = bot.commands.filter(x => x.config.name !== 'help' && x.config.name !== 'test' && x.config.name != "eval");
    list = list.map(x => `\`${x.config.name}\``);
    const embed = new MessageEmbed()
        .setTitle('Commands')
        .setDescription(`${list.join(', ')}`)
        .setFooter("You can get more info about a command by saying air help <command>")
        .setColor('RANDOM');
    message.channel.send(embed);
}

module.exports.config = {
    name: 'help', // Command Name
    description: 'Sends help.', // Description
    usage: 'air help [command]', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: [], // Aliases 
    bankSpace: 0, // Amount of bank space to give when command is used.
    cooldown: 5 // Command Cooldown
}