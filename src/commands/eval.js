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

    if (code.toLowerCase().includes("token") || code.toLowerCase().includes("process.env")) return message.reply(`Shut, no token for u.`);

    let evaled;
    let output;

    const evalEmbed = new MessageEmbed()
    .addField(`Input`,`\`\`\`\`${code}\`\``)
    .setAuthor(message.author.tag, message.author.diplayAvatarURL())
    .setTimestamp()
    .setFooter(`Evaled in ${pm(message.createdTimestamp - Date.now())}`)

    try {
        evaled = await eval(code);
        output = evaled;
        if (typeof evaled != "string") output = require("util").inspect(evaled, { depth: 0 });
        if (output.length > 1970) output = output.slice(0, 1970);
        evalEmbed.addField(`Output`,`\`\`\`js${output}\`\`\``);
    } catch (e) {
        output = e;
        evalEmbed.addField(`Outpute`,`\`\`\`js${output}\`\`\``);
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
