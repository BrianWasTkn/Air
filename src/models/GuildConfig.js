const mongoose = require('mongoose');

const GuildConfig = new mongoose.Schema({
    guildId: { type: String, required: true },
    whitelistedChannels: { type: Array, default: [], required: false }
});

module.exports = mongoose.model('guild-configs', GuildConfig);
