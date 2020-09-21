module.exports.run = async (bot, message, args) => {
    let data = await bot.fetchUser(message.author.id);

    if (args.join(' ') === 'all') {
        if (data.coinsInWallet > data.bankSpace) {
            const max_deposit = (data.coinsInWallet+data.coinsInBank-data.bankSpace);

            data.coinsInWallet = max_deposit;

            await message.channel.send(`Deposited **${(data.bankSpace - data.coinsInBank)}** coins.`);

            data.coinsInBank = ((data.coinsInWallet + data.bankSpace) - max_deposit);

            await data.save();
        } else {
            data.coinsInBank += (data.bankSpace - data.coinsInBank);

            await message.channel.send(`Deposited **${data.bankSpace - data.coinsInBank}** coins.`);

            data.coinsInWallet -= (data.bankSpace - data.coinsInBank);

            await data.save();
        }
    } else {
        if (isNaN(args[0])) {
            return message.channel.send('That\'s not a number.');
        }

        if (parseInt(args[0]) > data.bankSpace) {
            return message.channel.send('Your bank is not big enough.');
        }
        if (parseInt(args[0]) > data.coinsInWallet) {
            return message.channel.send("You don't have that much money.");
        }

        data.coinsInBank += parseInt(args[0]);

        await message.channel.send(`Deposited **${args[0]}** coins.`);

        data.coinsInWallet -= parseInt(args[0]);

        await data.save();
    }
}

module.exports.config = {
    name: 'deposit', // Command Name
    description: 'Deposit your money.', // Description
    usage: 'air deposit <amount | all>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['dep'], // Aliases 
    bankSpace: 0, // Amount of bank space to give when command is used.
    cooldown: 10 // Command Cooldown
}
