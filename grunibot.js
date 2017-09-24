/*******************************************************
 * Copyright (C) 2017 Alexander 'Gruni' Grunert <grunerd@me.com>
 * 
 * Grunibot can not be copied, modified and/or distributed without 
 * the express permission of Alexander 'Gruni' Grunert
 *******************************************************/

const Discord = require("discord.js");
const client = new Discord.Client();
// Set the prefix
let prefix = "!";

// PM Event Listener
client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  if (message.content.startsWith(prefix + "ping")) {
    message.channel.send("pong!");
  }
});

// Triggered when a user joins, leaves or moves into a VoiceChannel
client.on('voiceStateUpdate', function (oldMember, newMember) {
  if(oldMember.voiceChannel != null && oldMember.voiceChannel.members.array().length < 1){
    console.log("Delete: "+oldMember.voiceChannel.name);
    
    var tmpChannel = client.guilds.find('id', '293509324247007232').channels.find('topic',"Text chat for channel '"+oldMember.voiceChannel.name+"'");
    
    if(tmpChannel != null){
      tmpChannel.delete();
    }
  }
  
  if(newMember.voiceChannel){
    if(newMember.voiceChannel.members.array().length == 1){
      console.log("Create: "+newMember.voiceChannel.name);
      console.log(newMember.voiceChannel.position + " | " + newMember.voiceChannel.calculatedPosition);
      //regexp = /^[a-zA-Z0-9-_]+$/;
      newMember.guild.createChannel(newMember.voiceChannel.name.replace(/[^a-zA-Z0-9-_ ]+/ig, '').replace(/\s+/g, '-'), 'text')
        .then(function (channel, reason) {
        channel.setTopic("Text chat for channel '"+newMember.voiceChannel.name+"'");
        console.log(newMember.voiceChannel.name.replace(/[^a-zA-Z0-9-_ ]+/ig, '').replace(/\s+/g, '-'));
      })
        .catch(console.error);
    }
  }
});

client.login(process.env.BOT_TOKEN);
