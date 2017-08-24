var SlackBot = require('slackbots');
var jsdom = require('jsdom');

// create a bot 
var bot = new SlackBot({
    token: 'xoxb-217632034034-KaWHcmyipjqq7RiI3IYlhArC', // Add a bot https://my.slack.com/services/new/bot and put the token  
    name: 'scanbot'
});

var keyArray = new Array('aa77','sunma','경마','大学','카톡','온라','인터넷');
var keyCount = keyArray.length;

var urlArray = new Array(
	'https://forums.warpportal.com/index.php?/forum/5-ragnarok-1-community-chat/',
	'https://forums.warpportal.com/index.php?/forum/437-community-chat/',
	'https://forums.warpportal.com/index.php?/forum/236-ragnarok-2-community-chat/',
	'https://forums.warpportal.com/index.php?/forum/7-requiem-community-chat/',
	'https://forums.warpportal.com/index.php?/forum/9-rose-community-chat/',
	'https://forums.warpportal.com/index.php?/forum/96-dragon-saga-community-chat/'
	);

var urlCount = urlArray.length;

setInterval(function(){
	for(var k=0; k<urlCount; k++) {
		jsdom.env(
			urlArray[k],
			["http://code.jquery.com/jquery.js"],
			function (err, window) {
				var count = window.$('.col_f_content').length;
				var pageTitle = window.$('.ipsType_pagetitle').text();
				for(var i=0; i<count; i++) {
					var content = window.$('.col_f_content:eq('+ i +') h4 a').attr("title");
					var link = window.$('.col_f_content:eq('+ i +') h4 a').attr("href");
					var contained = false;
					for(var n=0; n<keyCount; n++) {
						if(content.toLowerCase().includes(keyArray[n]))
							contained = true;
					}
					if(contained) {
						var params = {
							icon_emoji: ':cat:'
						};
						bot.postMessageToChannel('spammer_bot_check', pageTitle + "\n" + content + "\n" + link, params);
					}
				}
			}
			);
	}
},120000);
