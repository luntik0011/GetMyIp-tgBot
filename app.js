const { Telegraf } = require('telegraf');
const http = require('http');

//Старт бота//////////////////////////////////////////////
const bot = new Telegraf('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
bot.launch()
    .catch((err) => {
        console.log('Error: ', err.message)
    });

let Myip;
let timerId = setInterval(GetIP, 5*60*1000,);
console.log("Успешный запуск!");
GetIP();

function GetIP(){
    http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'},  function(resp) {
        resp.on('data', function(ip) {
            console.log("My public IP address is: " + ip);
            if (Myip != ip) {
                    bot.telegram.sendMessage('XXXXXXXXXXXX', `My public IP address is:\n` + ip)
                    .catch((err) => {
                        console.log('Error: ', err.message)
                    });
                    Myip = String(ip);
                }
        });
    }).on('error', function(err) {
        console.log("Error: " + err.message);
    });
};