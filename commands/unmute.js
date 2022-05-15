const Discord = require('discord.js');

module.exports = {

    "name": "unmute",
    "description": "Ta komenda pozwala na odciszanie graczy.",

    execute(message, args, client) {

        if (args.length > 0) {

          var id = args[0].replace(/[\\<>@#&!]/g, "");
          var player = message.guild.members.cache.get(id);

          if (typeof player === 'undefined') {
              message.channel.send("**Przykro mi takiego gracza nie ma na serwerze.**");
              return;
          }
          if (!message.member.permissions.has('MANAGE_GUILD')) {
              message.channel.send("**Nie masz wystarczających permisji do użycia tej komendy!**");
              return;
          }

          const embed = new Discord.MessageEmbed()
          .setColor('#33ff00')
          .setTitle("Wykonano!")
          .setDescription(`**Odciszyłem gracza o nicku: **<@${id}>`);

          client.muteFile.splice(client.muteFile.indexOf(client.muteFile.find(p => p.playerID == id)), 1);
          message.channel.send(embed);
          client.updateConfig();
          
        } else {

            message.channel.send("**Prawidłowe użycie komendy: " + client.prefix + "unmute <id/spingowanie gracza>**");

        }

    }

};