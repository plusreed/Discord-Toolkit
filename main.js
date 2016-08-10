var cli = require('vorpal')();
var Discord = require('discord.js');
var config = require('./config.json');
var DiscordAcc = new Discord.Client();

// var idle = false;

// Connect to Discord
DiscordAcc.login(config.email, config.password); // screw callbacks
cli.log("Successfully logged into Discord!");

cli
  .command('afk', 'Set status to Idle on Discord')
  .action(function(args, callback) {
    DiscordAcc.on('ready', () => { DiscordAcc.setStatusAway(); });
    this.log("Your status has been set to Idle.");
    callback();
  });

cli
  .command('back', 'Set status to Online on Discord')
  .action(function(args, callback) {
    DiscordAcc.on('ready', () => { DiscordAcc.setStatusOnline(); });
    this.log("Your status has been set to Online.");
    callback();
  });

cli
  .command('set', 'Set various variables')
  .option('-g, --game <game>', 'Set playing game.')
  .action(function(args, cb) {
    DiscordAcc.on('ready', () => { DiscordAcc.setPlayingGame(args); });
    cb();
  });

cli.find('exit').remove();
cli
  .command('exit', 'Exit CLI') // Replacement exit command.
  .action(function(args, callback) {
    this.log("Logging out of your Discord account...");
    DiscordAcc.logout(function(error) {
      this.log("Couldn't log out.");
    });
    this.log("Exiting CLI...");
    process.exit();
  });

cli
  .delimiter ("discord$")
  .show();
