const { Client } = require('discord.js');
const { token } = require('./token.json');
const { prefix } = require('./config.json');
const fetch = require('node-fetch');
const schedule = require('node-schedule');
const request = require('request')
const client = new Client();
var rand = 0;
// 建立一個類別來管理 Property 及 Method
function getRandom(x) {
    return Math.floor(Math.random() * x);
};
class Bot {

    constructor() {
        this.isPlaying = false;
        this.queue = {};
        this.connection = {};
        this.dispatcher = {};
    }
    ask(msg) {
        rand = getRandom(50); //會回傳0~2之間的隨機數字
        const { answer } = require('./answer.json');
        msg.reply(answer[rand])
    }
    me(msg) {
      msg.reply(msg.author.displayAvatarURL());
    }
    clr(msg) {
      const args = msg.content.replace(`${prefix}clr`, '').trim();
      console.log(args);
      if(args>98)args=98;
      msg.channel.bulkDelete(args);
      msg.channel.bulkDelete(1);
    }
    clean(msg) {
      try {
        for(var i=0;i<100;i++){
          msg.channel.bulkDelete(10);
        }
      } catch (error) {
        console.log('清理完成')
      }
      
    }
    eat(msg) {
        rand = getRandom(26); //會回傳0~2之間的隨機數字
        const { dinner } = require('./dinner.json');
        msg.reply(dinner[rand])
    }
}

const bot = new Bot();
// 當 Bot 接收到訊息時的事件
client.on('message', async (msg) => {

    // 如果發送訊息的地方不是語音群（可能是私人），就 return
    if (!msg.guild) return;

    // !!join
   /* if (msg.content === `${prefix}eat`) {
        // 機器人加入語音頻道
        bot.eat(msg);
    }
    if (msg.content === `${prefix}me`) {
      // 機器人加入語音頻道
      bot.me(msg);
    }*/
    if (msg.content.indexOf(`${prefix}clr`) > -1) {
      bot.clr(msg);
    }
    if (msg.content === `${prefix}clean`) {
      // 機器人加入語音頻道
      bot.clean(msg);
    }
   /* if (msg.content.indexOf(`${prefix}ask`) > -1) {
        bot.ask(msg);
    }*/
});

// 連上線時的事件
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    channaltest = client.channels.cache.get("821038399175262249");
    //console.log(channaltest.name);
    //channaltest.send("123");
    schedule.scheduleJob("0 55 18-19 * * *", function(){
      channaltest.send("目前時間:"+ new Date()+"\n快"+(new Date().getHours()+1)+"點囉!");
      console.log("scheduleCronstyle:" + new Date());
  }); 

});
client.on('guildMemberAdd', member => {
  member.guild.channels.cache.get('819956196441325598').bulkDelete(1);
  member.guild.channels.cache.get('819956196441325598').send('' + member.user.username + ', 你好歡迎光臨~\n 建議你將頻道靜音，因為我會很吵~'); 
});

client.on('guildMemberRemove', member => {
  member.guild.channels.cache.get('819956196441325598').send('再見囉  ' + member.user.username);
});
client.login(token); 