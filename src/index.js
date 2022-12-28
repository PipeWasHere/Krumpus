const fs = require('node:fs');
require('dotenv').config();
const Discord = require("discord.js")
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({ intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates] });

let bot = {client, prefix: "n.", owners: [process.env.OWNER]}

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();
client.functions = new Discord.Collection();
client.categories = fs.readdirSync("./src/Krumpus.Common/commands/");

client.loadCommands = (client, reload) => require(`./Krumpus.Base/handlers/commandHandler`)(client, reload);
client.loadFunctions = (client, reload) => require(`./Krumpus.Base/handlers/functions`)(client, reload);
client.loadEvents = (client, reload) => require("./Krumpus.Base/handlers/events.js")(client, reload, bot);
client.loadCommands(client, false);
client.loadFunctions(client, false);
client.loadEvents(client, false);

module.exports = bot;

client.login(process.env.TOKEN);
