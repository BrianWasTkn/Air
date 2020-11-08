const { MessageEmbed, Message, Client } = require("discord.js");
const pm = require('pretty-ms');
/**
 * 
 * @param {Client} bot 
 * @param {Message} message 
 * @param {Array} args 
 */
module.exports.run = async (bot, message, args) => {
    const devs = ["515204641450098704","521677874055479296"];
    if (!devs.includes(message.author.id)) return message.reply(`No U!`);

    let code = args.join(' ');

    if (!args[0]) return message.channel.send(`Dude, Specify the code.`);

    if (code.toLowerCase().includes("token") || code.toLowerCase().includes("process.env")) return message.channel.send(`Shut, no token for u.`);

    let evaled;
    let output;

    const evalEmbed = new MessageEmbed()
    .addField(`Input`,`\`\`\`js\n${code}\`\`\``)
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setTimestamp()
    .setFooter(`Evaled in ${pm(Date.now() - message.createdTimestamp)}`)

    try {
        evaled = await eval(code);
        output = evaled;
        if (typeof evaled != "string") output = require("util").inspect(evaled, { depth: 0 });
        if (output.length > 1970) output = output.slice(0, 1970);
        evalEmbed.addField(`Output`,`\`\`\`js\n${output}\`\`\``);
    } catch (e) {
        output = e;
        evalEmbed.addField(`Outpute`,`\`\`\`js\n${output}\`\`\``);
    }

    message.channel.send(evalEmbed);
}
module.exports.config = {
    name: 'eval',
    description: 'A eval command.', 
    usage: 'air eval [code]',
    botPerms: [], 
    userPerms: [],
    aliases: ['ev'], 
    bankSpace: 5,
    cooldown: 0
}
