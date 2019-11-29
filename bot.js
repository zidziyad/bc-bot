const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = ['-'];
console.log("Scrpit By Dream");


client.on("ready", function() {
  var ms = 10000;
  var setGame = [
    " -help",
    `Im on ${client.guilds.size} servers`,
    `i help ${client.users.size} Members`,
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
  let prefix = "-";
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
  if (message.content.startsWith("-bc")) {
    if (!message.channel.guild)
      return message.channel
        .send("**this command for servers only**")
        .then(m => m.delete(5000));
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send("**You Don't have this permission** `ADMINISTRATOR`");
    let args = message.content
      .split(" ")
      .join(" ")
      .slice(2 + prefix.length);
    let copy = "ScrpitBot";
    let request = `Requested By ${message.author.username}`;
    if (!args)
      return message.reply("**Pls type Thing to send**");
    message.channel
      .send(
        `**Did you sure to send this ?:** \` ${args}\``
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

client.on('message', async msg => { // eslint-disable-line
	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(PREFIX)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(PREFIX.length)

	if (command === 'play') {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
		}
		if (!permissions.has('SPEAK')) {
			return msg.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return msg.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					msg.channel.send(`
__**Song selection:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Please provide a value to select one of the search results ranging from 1-10.
					`);
					// eslint-disable-next-line max-depth
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return msg.channel.send('No or invalid value entered, cancelling video selection.');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.send('🆘 I could not obtain any search results.');
				}
			}
			return handleVideo(video, msg, voiceChannel);
		}
	} else if (command === 'skip') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing that I could skip for you.');
		serverQueue.connection.dispatcher.end('Skip command has been used!');
		return undefined;
	} else if (command === 'stop') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing that I could stop for you.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Stop command has been used!');
		return undefined;
	} else if (command === 'volume') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		if (!args[1]) return msg.channel.send(`The current volume is: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.send(`I set the volume to: **${args[1]}**`);
	} else if (command === 'np') {
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		return msg.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
	} else if (command === 'queue') {
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		return msg.channel.send(`
__**Song queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Now playing:** ${serverQueue.songs[0].title}
		`);
	} else if (command === 'pause') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send('⏸ Paused the music for you!');
		}
		return msg.channel.send('There is nothing playing.');
	} else if (command === 'resume') {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send('▶ Resumed the music for you!');
		}
		return msg.channel.send('There is nothing playing.');
	}

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(`✅ **${song.title}** has been added to the queue!`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`🎶 Start playing: **${song.title}**`);
}




client.login(process.env.BOT_TOKEN1);
