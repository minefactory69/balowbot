const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone : false});
const botconfig = require("./botconfig.json");
//fs-extra//emoji.szena mondjuk xd
// const cooldown = require("./cooldown.json");
let name = "Fun Bot";
let cooldown = new Set();
let sdseconds = 15;
// const randomPuppy = require("random-puppy");

////////////////////////////////////////////////

//Feljebb vannak a globális változók.
 
 
 
bot.on("ready", async() => { //bot.on kezdete
    console.log(`${bot.user.username} elindult sikeresen!`)
 
//status :d   
let prefix = botconfig.prefix; 
    let statusok = [
        `parancsok: ${prefix}help`,
        `${bot.guilds.size} szerver`,
        `fejlesztő: Magyar Games`

    ]
    
 
    setInterval(function(){
        let status = statusok[Math.floor(Math.random() * statusok.length)];
        bot.user.setActivity(status, {type: "WATCHING"}) 
    }, 3000) 


}); //itt vége a bot.on nak
 
 
 
bot.on("message", async message => { //bot on kezdete
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
 //prefix messageArray és cmd :D cmd = 0. karakter prefix = botconfig.prefix :D
    let prefix = botconfig.prefix; 
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
 

/////////////////////////////////////////////////////////////
 
   if(cmd === `${prefix}help`){
 
 
    let botThumb = bot.user.displayAvatarURL;
    let testembed = new Discord.RichEmbed()
    .setTitle(`${name}`)
    .setColor("#2DE7F7")
    .addBlankField()
    .addField("Parancsok:", "ˇˇˇ")
    .addBlankField()
    .addField(`${prefix}kviz`, "Matek kvíz indítása.")
    .addField(`${prefix}kpo`, "Kő papír olló játék.")
    .addField(`${prefix}ping`, "Pong")
    .addBlankField()
    .addField("A bot fejlesztője: Magyar Games", "<3")
    .setThumbnail(botThumb)
    .setTimestamp(message.createdAt)
    .setFooter(`${name}`);
 
    message.member.send(testembed);
    message.reply(`privátba elküldtem a parancsokat!`);
    
}



if (cmd === `${prefix}ping`) {

    message.reply("pong");
}

if(cmd === `${prefix}kpo`) {
    let válaszArray = ["kő", "kő", "papír", "olló"];
    let válaszNum = Math.floor(Math.random() * válaszArray.length) + 1;
    if(messageArray[1] === `kő` || messageArray[1] === `papír` || messageArray[1] === `olló`) {

    message.reply(`Te: ${messageArray[1]} Bot: ${válaszArray[válaszNum]}`);
    } else message.reply("Kérlek adj meg egy tárgyat! pl kő, papír, olló")
}

if(cmd === `${prefix}kviz`) {
    if(cooldown.has(message.author.id)) {
        message.delete();
        return message.reply("Neked 15másodperces cooldownöd van! Kérlek várjál még egy kicsit!")
    }
        cooldown.add(message.author.id);


    setTimeout(() => {
        cooldown.delete(message.author.id)
    }, sdseconds * 1000)
  



    let kkk = 60;
    let egy = Math.floor(Math.random() *1200);
    let keto = Math.floor(Math.random() *2200);
    let harom = Math.floor(Math.random() *300);
    let negy = Math.floor(Math.random() *300)*2;
    let ot = 2;
    let hat = Math.floor(Math.random() *9999999)*2;
    let uIcon = message.member.user.displthayAvatarURL;
    let askArray = [`Mennyi? ${egy} + ${keto}`, `Mennyi? ${egy} + ${keto} - ${harom}`, `Mennyi? ${negy}:${ot}`, `Mennyi? ${hat}:${ot}`];

    let respondArray = [`${egy + keto}`, `${egy + keto - harom}`, `${negy / ot}`, `${hat / ot}`];

    let num = Math.floor(Math.random() *askArray.length);

    let  qEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor("RANDOM")
    .setThumbnail(uIcon)
    .addField("Matematikai kvíz! Válaszolj a kérdésre 35mp belül!", askArray[num])
    .addBlankField()
    .setFooter(`${name}`)
    .setTimestamp(message.createdAt);

    const filter = m => m.author.id === message.author.id;
    message.channel.send(qEmbed);
    message.channel.awaitMessages(filter, {max: 1, time:35000}).then(collected => {

        if(collected.first().content === "Nemtudom") return message.reply(`A megoldás ez volt: ${respondArray[num]}`);
        let response = collected.first().content;

        if(response === respondArray[num]) {

            let kvizEmbed = new Discord.RichEmbed()
            .setTitle(`${message.author.username}`)
            .addField("Sikeresen teljesítetted a feladatot!", `Szép volt!`)
            .setColor("#1CEF5B")
            .setTimestamp(message.createdAt)
            .setFooter(`${name}`)

            message.channel.send(kvizEmbed)
            
            message.reply("Sikeresen teljesítetted ezt a feladatot!").then(r => r.delete(6000));

        } else message.reply(`Hibás válasz. A megoldás ez volt: ${respondArray[num]}.`);
            
            

    }).catch(err => {

            message.reply(`Lejárt az időd! A megoldás ez volt: ${respondArray[num]}.`);

    });
}
})
 
bot.login(process.env.BOT_TOKEN);
