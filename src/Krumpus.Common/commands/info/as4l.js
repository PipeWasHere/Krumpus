module.exports = {
    name: "as4l",
    category: "info",
    adminOnly: false,
    description: "Represent the hood 🔫",
    run: async (bot) => {
      var {client, message, f} = bot;
      const msg = await message.channel.send(`Fo\' sho\' homie! 🔫`);
      msg.edit(`Fo\' sho\' homie! 🔫 \nWe must take back our place`);
      msg.edit(`Fo\' sho\' homie! 🔫 \nWe must take back our place\n and represent the honor!`);
    }
  }
  