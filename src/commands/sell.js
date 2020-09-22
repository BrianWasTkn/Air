const itemss = require('../utils/items');
const { MessageEmbed } = require('discord.js');
module.exports.run = async (bot, message, args) => {
    let user = await bot.fetchUser(message.author.id);
    if (!args.join(' ')) {
        return message.channel.send("you can't sell nothing lmao");
    }
    const item = itemss.find(x => x.name.toLowerCase() === args.join(' ').toString().toLowerCase() || x.name.toLowerCase() === args[0].toString().toLowerCase() || x.name.toLowerCase() === `${args[0].toLowerCase()} ${args[1].toLowerCase()}`);
    let sellAmount = args.join(' ').toString().match(/([1-9][0-9]*)/)
    if (!sellAmount) sellAmount=1;
    else sellAmount = sellAmount[0]
    if (!item) {
        return message.channel.send("can't sell this item");
    }
    let founditem = user.items.find(x => x.name.toLowerCase() === item.name.toLowerCase());
    let array = [];
    array = user.items.filter(x => x.name !== item.name);
    if (!founditem) {
        return message.channel.send("you don't have this item");
    }
    if (founditem.amount < parseInt(sellAmount)) return message.channel.send(`You only have ${founditem.amount} of this item`);
    if (founditem.amount === 1) {
        user.items = array;
        await user.save();
    }
    else {
        array.push({
            name: item.name,
            amount: (founditem.amount - parseInt(sellAmount)),
            description: item.description
        });
        user.items = array;
        await user.save();
    }
    user.coinsInWallet += (item.sellAmount*parseInt(sellAmount));
    await user.save();
    const embed = new MessageEmbed()
        .setAuthor('Sold')
        .setDescription(`You sold ${parseInt(sellAmount).toLocaleString()} **${item.name}** for \`${parseInt(item.sellAmount*sellAmount).toLocaleString()}\` coins`)
        .setColor('RANDOM');
    message.channel.send(embed);
}

module.exports.config = {
    name: 'sell', // Command Name
    description: 'Sell an item.', // Description
    usage: 'air sell <item>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: [], // Aliases 
    bankSpace: 0, // Amount of bank space to give when command is used.
    cooldown: 5 // Command Cooldown
}
