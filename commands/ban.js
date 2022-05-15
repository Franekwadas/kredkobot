const Discord = require('discord.js');

module.exports = {

    "name": "ban",
    "description": "Ta komenda pozwala zbanować gracza z serwera.",

    execute(message, args, client) {
        
        if (args.length > 0) {

            var id = args[0].replace(/[\\<>@#&!]/g, "");
            var player = message.guild.members.cache.get(id);

            if (id == message.author.id) {
                message.channel.send("**Nie możesz zbanować samego siebie!**");
                return;
            }
            if (typeof player === 'undefined') {
                message.channel.send("**Przykro mi takiego gracza nie ma na serwerze.**");
                return;
            }
            if (!message.member.permissions.has('MANAGE_GUILD')) {
                message.channel.send("**Nie masz wystarczających permisji do użycia tej komendy!**");
                return;
            }

            if (!player.bannable) {
                message.channel.send("**Tego gracza nie można zbanować**");
                return;
            }

            if (client.banFile.find(p => p.playerID == id)) {
                message.channel.send("**Ten gracz jest już zbanowany!**");
                return;
            }

            var reason = "";

            if (args.length > 1) {

                var length = args.length - 1;
    
                for (let i = 1; i <= length; i++) {
                    reason = reason + args[i];
                    if (i != length) reason = reason + " ";
                }

            }
            this.addMute(player, reason, message.author.name, client, message)
            
        } else {
            message.channel.send("**Poprawne użycie komendy: " + client.prefix + "ban <id/spingowanie gracza> <powód (opcjonalne)>**")
        }
        

    },

    addMute(user, reason, moderator, client, message) {

        if (reason != "") {
            client.banFile.push({

                "playerID": user.id,
                "reason": reason,
                "moderatorName": moderator

            });
            user.kick();
            const embed = new Discord.MessageEmbed()
            .setColor('#33ff00')
            .setTitle("Wykonano!")
            .setDescription(`**Zbanowałem gracza o nicku: **<@${user.id}>\n\n**Za: **__${reason}__`);
            message.channel.send(embed)
        } else {
            client.banFile.push({

                "playerID": user.id,
                "reason": "Powód nie został podany",
                "moderatorName": moderator

            });
            user.kick();
            const embed = new Discord.MessageEmbed()
            .setColor('#33ff00')
            .setTitle("Wykonano!")
            .setDescription(`**Zbanowałem gracza o nicku: **<@${user.id}>\n\n**Za: **__Powód nie został podany!__`);
            message.channel.send(embed)
        }

        client.updateConfig();

    }

};