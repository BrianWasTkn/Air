module.exports.run = async (bot, message, args) => {
    const another = Math.round(Math.random() * 15);
    if (another === 4) {
        return message.channel.send(`**DashCruft**: i'm too broke man sorry`);
    }
    const random = Math.round(Math.random() * 200);
    const randomMessage = [
        `WOW **Elon Musk** gave you ${random.toLocaleString()} coins.`,
        `**Bill Gates** gave you ${random.toLocaleString()} coins.`,
        `A **beggar** found ${random.toLocaleString()} coins for you.`,
        `**ur mom** found ${random.toLocaleString()} coins while cleaning the house.`,
        `You looked inside your **stepsister's** drawer and found ${random.toLocaleString()} coins.`,
        `You asked your **dog** and he vomited ${random.toLocaleString()} coins.`,
        `You gave **DashCruft** free subscribers so he gave you ${random.toLocaleString()} coins.`,
        `**Mama mia** gave you ${random.toLocaleString()} coins as a welcome to italy gift.`
    ];
    const response = randomMessage[Math.floor((Math.random() * randomMessage.length))];
    await message.reply(`${response}`)
    .catch();
    await bot.giveCoins(message.author.id, random);
}

module.exports.config = {
    name: 'beg', // Command Name
    description: 'sad how you have to beg for money', // Description
    usage: 'air beg', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: [], // Aliases 
    bankSpace: 15, // Amount of bank space to give when command is used.
    cooldown: 30 // Command Cooldown
}
