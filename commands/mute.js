const Discord = require('discord.js');

module.exports = {

    "name": "mute",
    "description": "Ta komenda pozwala na wyciszanie graczy",

    execute(message, args, client) {
        
        if (args.length > 0) {

            var id = args[0].replace(/[\\<>@#&!]/g, "");
            var player = message.guild.members.cache.get(id);

            if (id == message.author.id) {
                message.channel.send("Nie możesz wyciszyć samego siebie!");
                return;
            }
            if (typeof player === 'undefined') {
                message.channel.send("Przykro mi takiego gracza nie ma na serwerze.");
                return;
            }
            if (!player.permissions.has('MANAGE_GUILD')) {
                message.channel.send("Nie masz wystarczających permisji do użycia tej komendy!");
                return;
            }

            if (client.muteFile.find(p => p.playerID == id)) {
                message.channel.send("Ten gracz jest już zmutowany!");
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
            message.channel.send("Poprawne użycie komendy: " + client.prefix + "mute <id/spingowanie gracza> <powód (opcjonalne)>")
        }
        

    },

    addMute(user, reason, moderator, client, message) {

        if (reason != "") {
            client.muteFile.push({

                "playerID": user.id,
                "reason": reason,
                "moderatorName": moderator

            });
            const embed = new Discord.MessageEmbed()
            .setColor('#33ff00')
            .setTitle("Wykonano!")
            .setDescription(`**Wyciszyłem gracza o nicku: **<@${user.id}>\n\n**Za: **__${reason}__`);
            message.channel.send({ embeds: [embed] })
        } else {
            client.muteFile.push({

                "playerID": user.id,
                "reason": "Powód nie został podany",
                "moderatorName": moderator

            });
            const embed = new Discord.MessageEmbed()
            .setColor('#33ff00')
            .setTitle("Wykonano!")
            .setDescription(`**Wyciszyłem gracza o nicku: **<@${user.id}>\n\n**Za: **__Powód nie został podany!__`);
            message.channel.send({ embeds: [embed] })
        }

        client.updateConfig();

    }

};