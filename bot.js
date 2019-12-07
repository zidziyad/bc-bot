const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = ['d'];
const request = require("request");
console.log("Scrpit By zizo");


client.on("ready", function() {
  var ms = 10000;
  var setGame = [
    " dhelp for music",
  ];
  var i = -1;
  var j = 0;
  setInterval(function() {
    if (i == -1) {
      j = 1;
    }
    if (i == setGame.length - 1) {
      j = -1;
    }
    i = i + j;
    client.user.setGame(setGame[i], `https://www.twitch.tv/zidziyad`);
  }, ms);
  console.log(`Logged in as ${client.user.tag}!`);
  console.log("");
  console.log("");
  console.log(
    "╔[═════════════════════════════════════════════════════════════════]╗"
  );
  console.log(`[Start] ${new Date()}`);
  console.log(
    "╚[═════════════════════════════════════════════════════════════════]╝"
  );
  console.log("");
  console.log("╔[════════════════════════════════════]╗");
  console.log(`Logged in as * [ " ${client.user.username} " ]`);
  console.log("");
  console.log("Informations :");
  console.log("");
  console.log(`servers! [ " ${client.guilds.size} " ]`);
  console.log(`Users! [ " ${client.users.size} " ]`);
  console.log(`channels! [ " ${client.channels.size} " ]`);
  console.log("╚[════════════════════════════════════]╝");
  console.log("");
  console.log("╔[════════════]╗");
  console.log(" Bot Is Online");
  console.log("╚[════════════]╝");
  console.log("");
  console.log("");
});


client.on("message", function(message) {
  let prefix = "d";
  let args = message.content
    .split(" ")
    .slice(1)
    .join(" ");
  if (message.content.startsWith(prefix + "say")) {
    if (!args) return;
    message.channel.send(`${args}`);
  }
});

client.on("message", message => {
  if (!message.channel.guild) return;
  if (message.content.startsWith("dbc")) {
    if (!message.channel.guild)
      return message.channel
        .send("**هذا الأمر فقط للسيرفرات**")
        .then(m => m.delete(5000));
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send("**للأسف لا تمتلك صلاحية** `ADMINISTRATOR`");
    let args = message.content
      .split(" ")
      .join(" ")
      .slice(2 + prefix.length);
    let copy = "ScrpitBot";
    let request = `Requested By ${message.author.username}`;
    if (!args)
      return message.reply("**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست**");
    message.channel
      .send(
        `**هل أنت متأكد من إرسالك البرودكاست؟ \nمحتوى البرودكاست:** \` ${args}\``
      )
      .then(msg => {
        msg
          .react("✅")
          .then(() => msg.react("❌"))
          .then(() => msg.react("✅"));

        let reaction1Filter = (reaction, user) =>
          reaction.emoji.name === "✅" && user.id === message.author.id;
        let reaction2Filter = (reaction, user) =>
          reaction.emoji.name === "❌" && user.id === message.author.id;
        let reaction1 = msg.createReactionCollector(reaction1Filter, {
          time: 12000
        });
        let reaction2 = msg.createReactionCollector(reaction2Filter, {
          time: 12000
        });
        reaction1.on("collect", r => {
          message.channel
            .send(
              `☑ | Done ... The Broadcast Message Has Been Sent For ${message.guild.members.size} Members`
            )
            .then(m => m.delete(5000));
          message.guild.members.forEach(m => {
            var bc = new Discord.RichEmbed()
              .setColor("RANDOM")
              .setTitle("Broadcast")
              .addField("Server", message.guild.name)
              .addField("Sender", message.author.username)
              .addField("Message", args)
              .setThumbnail(message.author.avatarURL)
              .setFooter(copy, client.user.avatarURL);
            m.send({ embed: bc });
            msg.delete();
          });
        });
        reaction2.on("collect", r => {
          message.channel
            .send(`**Broadcast Canceled.**`)
            .then(m => m.delete(5000));
          msg.delete();
        });
      });
  }
});

client.on('message', luxy => {
       if(luxy.content === prefix + "oc" || luxy.content === "close chat") {
                           if(!luxy.channel.guild) return luxy.reply(':white_check_mark: **This command only for servers**');
 
   if(!luxy.member.hasPermission('MANAGE_MESSAGES')) return luxy.reply('**__you cant :@ __**');
              luxy.channel.overwritePermissions(luxy.guild.id, {
            SEND_MESSAGES: false
 
              }).then(() => {
                  luxy.reply("**__chat closed__ :lock: **")
              });
                }

      if(luxy.content === prefix + "cc" || luxy.content === "open chat") {
                        if(!luxy.channel.guild) return luxy.reply(':white_check_mark: **This command only for servers**');
 
   if(!luxy.member.hasPermission('MANAGE_MESSAGES')) return luxy.reply('**__you cant :@ __**');
              luxy.channel.overwritePermissions(luxy.guild.id, {
            SEND_MESSAGES: true
 
              }).then(() => {
                  luxy.reply("**__chat opend__ :unlock: **")
              });
    }
       
});

  var filter = m => m.author.id === message.author.id;
  if (message.content.startsWith(prefix + "giveaway")) {
    if (!message.guild.member(message.author).hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        ":heavy_multiplication_x:| **You should have permission manage server**"
      );
    message.channel
      .send(`:eight_pointed_black_star:| **write giveaway room**`)
      .then(msg => {
        message.channel
          .awaitMessages(filter, {
            max: 1,
            time: 20000,
            errors: ["time"]
          })
          .then(collected => {
            let room = message.guild.channels.find(
              "name",
              collected.first().content
            );
            if (!room)
              return message.channel.send(
                ":heavy_multiplication_x:| **i Found It :(**"
              );
            room = collected.first().content;
            collected.first().delete();
            msg
              .edit(":eight_pointed_black_star:| **how many time **")
              .then(msg => {
                message.channel
                  .awaitMessages(filter, {
                    max: 1,
                    time: 20000,
                    errors: ["time"]
                  })
                  .then(collected => {
                    if (isNaN(collected.first().content))
                      return message.channel.send(
                        ":heavy_multiplication_x:| **wtf!! i want the real time !!**"
                      );
                    duration = collected.first().content * 60000;
                    collected.first().delete();
                    msg
                      .edit(":eight_pointed_black_star:| **what is the prize ?**")
                      .then(msg => {
                        message.channel
                          .awaitMessages(filter, {
                            max: 1,
                            time: 20000,
                            errors: ["time"]
                          })
                          .then(collected => {
                            title = collected.first().content;
                            collected.first().delete();
                            msg.delete();
                            message.delete();
                            try {
                              let giveEmbed = new Discord.RichEmbed()
                                .setDescription(
                                  `**${title}** \nReact With 🎉 To Enter! \nTime remaining : ${duration /
                                    60000} **Minutes**\n **Created at :** ${hours}:${minutes}:${seconds} ${suffix}`
                                )
                                .setFooter(
                                  message.author.username,
                                  message.author.avatarURL
                                );
                              message.guild.channels
                                .find("name", room)
                                .send(
                                  " :heavy_check_mark: **giveaway, has created** :heavy_check_mark:",
                                  { embed: giveEmbed }
                                )
                                .then(m => {
                                  let re = m.react("🎉");
                                  setTimeout(() => {
                                    let users = m.reactions.get("🎉").users;
                                    let list = users
                                      .array()
                                      .filter(
                                        u =>
                                          (u.id !== m.author.id) !==
                                          client.user.id
                                      );
                                    let gFilter =
                                      list[
                                        Math.floor(
                                          Math.random() * list.length
                                        ) + 0
                                      ];
                                    let endEmbed = new Discord.RichEmbed()
                                      .setAuthor(
                                        message.author.username,
                                        message.author.avatarURL
                                      )
                                      .setTitle(title)
                                      .addField(
                                        "Giveaway Ended !🎉",
                                        `Winners : ${gFilter} \nEnded at :`
                                      )
                                      .setTimestamp();
                                    m.edit("** 🎉 GIVEAWAY ENDED 🎉**", {
                                      embed: endEmbed
                                    });
                                    message.guild.channels
                                      .find("name", room)
                                      .send(
                                        `**Congratulations ${gFilter}! you is the winner \`${title}\`**`,
                                        { embed: {} }
                                      );
                                  }, duration);
                                });
                            } catch (e) {
                              message.channel.send(
                                `:heavy_multiplication_x:| **you don't have permission to do that**`
                              );
                              console.log(e);
                            }
                          });
                      });
                  });
              });
          });
      });
  }
});

client.login(process.env.BOT_TOKEN1);
