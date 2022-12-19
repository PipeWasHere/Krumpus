const { getFiles } = require("../util/functions")
const fs = require("fs")

module.exports = (bot, reload) => {
    const {client} = bot 

    fs.readdirSync("./slashcommands").forEach(() => {
        let commands = getFiles(`./slashcommands/`, ".js")
        commands.forEach((f) => {
            if (reload)
                delete require.cache[require.resolve(`../slashcommands/${f}`)]
            const command = require(`../slashcommands/${f}`)
            client.commands.set(command.name, command)
        })
    })
    console.log(`Loaded ${client.commands.size} commands`)
}
