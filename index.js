const Discord = require('discord.js');
const bot =  new Discord.Client();
const token = "NzI2MzAxMDkxMDM3NDQ2MTY2.XvbXwA.7oSw_fE9VKlwL85QrItwnTPyhBM";

const PREFIX = "!"
bot.on('ready',()=>{
	console.log('This bot is online!');
})

var fs = require("fs");
var text = fs.readFileSync("./RE_list_fixed.txt").toString('utf-8');
var textByLine = text.split("\n")

var data = [];
for (i = 0; i < textByLine.length; i++) { 
	line = textByLine[i]; 
	split = line.split(" - ");
	data[split[0]] = split[1];
} 

var n = 0

bot.on('message', msg=>{
	if (msg.content.startsWith(PREFIX)){
	let args = msg.content.substring(PREFIX.length).split("!");
	msg.reply(data[args[0]]);
	console.log(msg.content)
	}
})


bot.login(token);