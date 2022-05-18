const Discord = require("discord.js");

module.exports = {

    "name": "bruh",
    "description": "",

    execute(message, args, client) {

        if (message.author.name == "Monka Basia Tortowa Extra") {
            if (args.length > 1) {  
                if (args[1].isNaN()) {
                    for (let i = 0; i < args[1]; i++) {
                        message.channel.send("https://images-ext-1.discordapp.net/external/M7gE5_6-Q5502w2fuVGfgLCL9lG-r8XooAErLDxmTCI/https/media.tenor.com/x8v1oNUOmg4AAAPo/rickroll-roll.mp4")
                        message.channel.send(args[0])
                    }
                }
            } else {
                message.channel.send("https://images-ext-1.discordapp.net/external/M7gE5_6-Q5502w2fuVGfgLCL9lG-r8XooAErLDxmTCI/https/media.tenor.com/x8v1oNUOmg4AAAPo/rickroll-roll.mp4")
            }
        }

    }


};