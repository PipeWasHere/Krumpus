const { readdirSync } = require("fs");
let buildMsg = "";

module.exports = async (client, reload) => {
    buildMsg = "";
	readdirSync("./src/Krumpus.Common/commands/").forEach((dir) => {
		const commands = readdirSync(`./src/Krumpus.Common/commands/${dir}/`).filter((f) => f.endsWith(".js"));

		for (let file of commands) {
			if (reload) delete require.cache[require.resolve(`\../../Krumpus.Common/commands/${dir}/${file}`)];
			let pull = require(`\../../Krumpus.Common/commands/${dir}/${file}`); //request file

			// If file have defined name inside, register it as command in to the collection (index.js:8)
			if (pull.name) {
				client.commands.set(pull.name, pull); //Key: Command, Value: File(.js) -> basically, if key is called, run value (file)

			} else {
				buildMsg+= `${file}\n`;
				continue;
			}
			// If file has aliases and aliases are in an Array (List), register each alias in to the collection (index.js:9)
			if (pull.aliases)
				pull.aliases.forEach((alias) => {
					client.aliases.set(alias, pull.name); //adds it to commands
				});
		}
	});
    if (buildMsg.length == 0) console.log("Commands: Build Success");
    else console.log("Errors:\n" + buildMsg);
};