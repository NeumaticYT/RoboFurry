const { channel } = require('diagnostics_channel');
const Discord = require('discord.js');

const client = new Discord.Client();
const prefix = '$';
const fs = require('fs');
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`)

    client.commands.set(command.name, command)
};



client.once('ready', () => {
    console.log('el furro dijo owo');
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'settings'){
        client.commands.get('settings').execute(message, args);
    } else if (command === 'youtube'){
        client.commands.get('youtube').execute(message, args);
    }
    else if (command === 'clear'){
        client.commands.get('clear').execute(message, args);
    }
    else if(command === "setchannel") {
        if(!message.member.permissions.has("MANAGE_GUILD")) return message.reply(":x: | Missing permissions, require `MANAGE_GUILD`")
        let channel = message.mentions.channels.first()
        if(!channel) return message.reply(`:x: | Missing arguments, required \`<channel>\`\n __Example__: ${prefix}setchannel ${message.channel}`)
        await db.set(`${message.guild.id}`, channel.id)
        message.reply({
          embeds: [ new MessageEmbed()
            .setDescription(`👍 | Successfully set the welcome channel to ${channel}`)
            .setColor("#2F3136")
            .setTimestamp()
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
          ]
        })
      }

client.on("guildMemberAdd", async member => {
    member.guild.channels.cache.find(c => c.name == 'welcome')
    let WELCOME = new Discord.MessageEmbed()
    .setTittle('New User Has Joined!')
    .setDescription(`Welcome to Our Server ${member.tag} we are happy to have you here! you are number ${member.guild.memberCount}!`)
    .setColor('BLUE')
    .setTimestamp()
    .setFooter('Thanks for Joining!')
    channel.send(WELCOME)
    

    
});

client.login(process.env.FURRY_TOKEN);