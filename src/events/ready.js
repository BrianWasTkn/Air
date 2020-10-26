module.exports = async bot => {
    bot.user.setActivity('air help', { type: 'PLAYING' });
    console.log(`${bot.user.tag} is online. Servers: ${bot.guilds.cache.size}, Users: ${bot.users.cache.size}`);
    await bot.dbl.postStats(bot.guilds.cache.size);
}
