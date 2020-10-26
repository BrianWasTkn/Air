module.exports = async (bot, vote) => {
    const user = await bot.fetchUser(vote.user);

    user.coinsInWallet += 4000;
    await user.save();
}
