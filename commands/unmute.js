const Discord = require('discord.js');

module.exports = {

    "name": "unmute",
    "description": "Ta komenda pozwala na odciszanie graczy.",

    execute(message, args, client) {

        if (args.lenght > 0) {

            var id = args[0].replace(/[\\<>@#&!]/g, "");
            var player = message.guild.members.cache.get(id);

            if (typeof player === 'undefined') {
                message.channel.send("**Przykro mi takiego gracza nie ma na serwerze.**");
                return;
            }
            if (!message.author.permissions.has('MANAGE_GUILD')) {
                message.channel.send("**Nie masz wystarczających permisji do użycia tej komendy!**");
                return;
            }

        } else {

            message.channel.send("**Prawidłowe użycie komendy: " + client.prefix + "unmute <id/spingowanie gracza>**");

        }

    }

};