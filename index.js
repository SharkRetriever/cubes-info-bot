const Commando = require('discord.js-commando');
const path = require('path');
const config = require('./config.json');
const bot = new Commando.CommandoClient({
    commandPrefix: config.prefix,
    owner: config.owner,
    disableEveryone: true,
    unknownCommandResponse: false
});

bot.registry
    .registerDefaultTypes()
    .registerGroups([
        ['wca-stats', 'WCA data-fetching commands'],
        ['images', 'Image-rendering commands'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, "/commands"));

bot.on('unknownCommand', (message) => {
    message.delete();
    return message.say(config.errorMessage);
});

bot.on('ready', () => {
    console.log('Ready!');
});

bot.on('error', (e) => {
    console.error(e);
});

bot.on('warn', (e) => {
    console.warn(e);
});

bot.login(config.token);
