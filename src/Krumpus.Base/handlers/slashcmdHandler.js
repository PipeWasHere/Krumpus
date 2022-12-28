// const { getFiles } = require("../util/functions")
// const fs = require("fs")


// module.exports = (bot, reload) => {
//     const {client} = bot 

//     fs.readdirSync("src/Krumpus.Common/slashcommands").forEach(() => {
//         let commands = getFiles(`src/Krumpus.Common/slashcommands/`, ".js")

//         commands.forEach((f) => {
//             if (reload)
//                 delete require.cache[require.resolve(`../slashcommands/${f}`)]
//             const command = require(`../../Krumpus.Common/slashcommands/${f}`);
//             client.commands.set(command.name, command)
//         })
//     })
//     console.log(`Loaded ${client.commands.size} slash commands`)
// }
