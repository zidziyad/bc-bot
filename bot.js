const Discord = require('discord.js');
const client = new Discord.Client();
const client2 = new Discord.Client();
const client3 = new Discord.Client();
const client4 = new Discord.Client();
const prefix = ['-'];
console.log("Scrpit By Dream");


client.on("ready", () => {
let channel =     client.channels.get("639428699405680651")
setInterval(function() {
channel.send(` and are you abn 4rmota ? يابن كوم شكاير الاف ءح الدولية كسم اي حد يعترض طريقي`);
}, 30)
})  

client.on("message", function(message) {
  let prefix = "-";
  let args = message.content
    .split(" ")
    .slice(1)
    .join(" ");
  if (message.content.startsWith(prefix + "say1")) {
    if (!args) return;
    message.channel.send(`${args}`);
  }
});


client.login(process.env.BOT_TOKEN1);
