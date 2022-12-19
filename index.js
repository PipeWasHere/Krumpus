const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();

const Discord = require("discord.js")
const { Player } = require("discord-player")
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const { fileURLToPath } = require('node:url');
const LOAD_SLASH = process.argv[2] == "load"
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;
const client = new Client({ intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates] });

let bot = {
client,
prefix: "n.",
owners: [process.env.OWNER]
}


client.on("ready", () => {
// Get all ids of the servers
const guild_ids = client.guilds.cache.map(guild => guild.id);
});


client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.slashcommands = new Discord.Collection();

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
client.loadCommands = (bot, reload) => require("./handlers/commandHandler")(bot, reload)
client.loadSlashCmds = (bot, reload) => require("./handlers/slashcmdHandler")(bot, reload)


client.loadEvents(bot, false)
client.loadCommands(bot, false)
client.loadSlashCmds(bot, false)

module.exports = bot

client.player = new Player(client, {
ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25
}
})

let commands = []

const slashFiles = fs.readdirSync("./slashcommands/").filter(file => file.endsWith(".js"))
for (const file of slashFiles){
const slashcmd = require(`./slashcommands/${file}`)
client.slashcommands.set(slashcmd.data.name, slashcmd)
if (LOAD_SLASH) commands.push(slashcmd.data.toJSON())
}

if (LOAD_SLASH) {
const rest = new REST({ version: "9" }).setToken(process.env.TOKEN)
console.log("Deploying slash commands")
rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {body: commands})
.then(() => {
    console.log(`Successfully loaded ${client.slashcommands.size} slash commands`)
    process.exit(0)
})
.catch((err) => {
    if (err){
        console.log(err)
        process.exit(1)
    }
})
}
else {
client.on("interactionCreate", (interaction) => {
    async function handleCommand() {
        if (!interaction.isCommand()) return

        const slashcmd = client.slashcommands.get(interaction.commandName)
        if (!slashcmd) interaction.reply("Not a valid slash command")
        if (!interaction.inGuild()) return interaction.editReply("This command can only be used in a server");
        if (slashcmd.perms && !interaction.member.permissions.has(slashcmd.perm)) return interaction.editReply("You do not have permission for this command")
        
        await interaction.deferReply()
        await slashcmd.run({ client, interaction })
      
    }
    handleCommand()
})
}



client.login(process.env.TOKEN);
