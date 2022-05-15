const Discord = require('discord.js');
const keepAlive = require('./server');
const Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
    ],
    partials: ['CHANNEL'],
});

const fs = require('fs');
Client.muteFile = JSON.parse(fs.readFileSync('./mute.json', 'utf8'));

Client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    Client.commands.set(command.name, command);
}

Client.prefix = "k!";

Client.once('ready', () => {

    console.log("Starting main module");

});

Client.on('message', (msg) => {

    if (msg.author.bot) return;

    if (msg.content.toLocaleLowerCase().startsWith(Client.prefix)) {

        const args = msg.content.slice(Client.prefix.length).split(/ +/);
        var command = args.shift().toLowerCase();
        if (typeof Client.commands.get(command) !== 'undefined') {
            Client.commands.get(command).execute(msg, args, Client);
            return;
        } else {
            msg.channel.send("Przykro mi ale nie ma takiej komendy!")
            return;
        }   
    }

    if (Client.muteFile.find(p => p.playerID == msg.author.id)) {
        msg.delete(msg);
        return;
    }

});

Client.updateConfig = () => {
    try {
        var muteF = Client.muteFile;
    } catch (error) {
        console.error(error);
    }

    fs.writeFileSync('./mute.json', JSON.stringify(muteF));
}

keepAlive();
Client.login(process.env['TOKEN']);