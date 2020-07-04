const fs = require("fs");
const optional = require('optional');
const Discord = require('discord.js');
const bot =  new Discord.Client();
const token = process.env.BOT_TOKEN || optional('./config.json').BOT_TOKEN;

bot.on('ready',()=>{
	console.log(`Logged in as ${bot.user.tag}!`);
})

const text = fs.readFileSync("./RE_list_fixed.txt", {encoding: 'utf-8'});
const textByLine = text.split("\n");

const data = {};
for (let i = 0; i < textByLine.length; i++) { 
	const line = textByLine[i]; 
	const split = line.split(" - ");
	if(split.length === 2) {
		data[split[0]] = split[1].trim();
	}
}

const data_keys = Object.keys(data).join('\n');

const fuzzy_match = word_list => {
	const regex = new RegExp(`${word_list.join('.*|.*')}.*`, 'mgi');
	console.log(regex);
	const keys = data_keys.match(regex);
	const exact = keys.join('\n').match(new RegExp(`^${word_list.join(' ')}$`, 'mi'));
	if(exact.length === 1 && data[exact]) {
		return [`${exact}: ${data[exact]}`];
	}
	
	const results = [];
	for(const key of keys) {
		if(data[key]) {
			results.push(`${key}: ${data[key]}`);
		}
	}
	return results;
}

bot.on('message', msg => {
	if (msg.mentions.has(bot.user, {ignoreRoles: true, ignoreEveryone: true})) {
		if(msg.cleanContent.startsWith(`@${bot.user.username}`)) {
			const content_words = msg.cleanContent.substring(`@${bot.user.username}`.length).trim().split(/\s+/);
			const fuzzy = fuzzy_match(content_words.filter(word => !word.startsWith('@')));
			msg.reply(`\n${fuzzy.join('\n')}`);
		}
	}
})


bot.login(token);