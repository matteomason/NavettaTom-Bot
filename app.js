var TelegramBot = require('node-telegram-bot-api');
// replace the value below with the Telegram token you receive from @BotFather
var token = 'insert_token_here';
// Create a bot that uses 'polling' to fetch new updates
var bot = new TelegramBot(token, { polling: true });
var arrayPrenotazioni = [];
var statoPrenotazioni = false;
// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, function (msg, match) {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    var chatId = msg.chat.id;
    var resp = match[1]; // the captured "whatever"
    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
});
// Matches "/a"
// Just to be a little bit quicker while developing
bot.onText(/\/a/, function (msg, match) {
    var chatId = msg.chat.id;
    if (statoPrenotazioni != true) {
        statoPrenotazioni = true;
    }
});
// Matches "/ApriPrenotazioni"
bot.onText(/\/ApriPrenotazioni/, function (msg, match) {
    var chatId = msg.chat.id;
    // Animazione conto alla rovescia
    bot.sendMessage(chatId, 'Inizio conto alla rovescia...').then(function (message) {
        var conto = 6;
        var interval = setInterval(function () {
            conto--;
            if (conto > 0)
                bot.editMessageText(conto, {
                    chat_id: chatId,
                    message_id: message.message_id
                }).catch(console.error);
            else {
                bot.editMessageText('Prenotazioni aperte!', {
                    chat_id: chatId,
                    message_id: message.message_id
                }).catch(console.error);
                clearInterval(interval);
            }
        }, 1000);
    });
    // Effettivo cambio di stato
    if (statoPrenotazioni != true) {
        statoPrenotazioni = true;
    }
});
// Matches "/ChiudiPrenotazioni"
bot.onText(/\/ChiudiPrenotazioni/, function (msg, match) {
    if (statoPrenotazioni != false) {
        statoPrenotazioni = false;
        var chatId = msg.chat.id;
        var resp = void 0;
        bot.sendMessage(chatId, "Prenotazioni chiuse");
    }
});
// Matches "/Prenota"
bot.onText(/\/Prenota/, function (msg, match) {
    var errors = false;
    var nomeUtentePrenotato = msg.from.first_name + (msg.from.last_name ? ' ' + msg.from.last_name : '');
    if (statoPrenotazioni == false && errors == false) {
        var chatId = msg.chat.id;
        bot.sendMessage(chatId, "Le prenotazioni sono chiuse!");
        errors = true;
    }
    if (arrayPrenotazioni.length < 3 && errors == false) {
        for (var _i = 0, arrayPrenotazioni_1 = arrayPrenotazioni; _i < arrayPrenotazioni_1.length; _i++) {
            var entry = arrayPrenotazioni_1[_i];
            if (entry == nomeUtentePrenotato) {
                var chatId = msg.chat.id;
                bot.sendMessage(chatId, "Hai già prenotato!");
                errors = true;
            }
        }
    }
    if (arrayPrenotazioni.length > 3) {
        errors = true;
    }
    if (errors == false) {
        arrayPrenotazioni.push(nomeUtentePrenotato);
        var chatId = msg.chat.id;
        var resp = arrayPrenotazioni.toString();
        bot.sendMessage(chatId, resp);
        console.log(arrayPrenotazioni.length);
    }
});
// Matches "/StatoNavetta"
bot.onText(/\/StatoNavetta/, function (msg, match) {
    var chatId = msg.chat.id;
    //console.log(msg.chat.id);
    var resp = arrayPrenotazioni.toString();
    if (resp == "")
        resp = "Navetta vuota!";
    bot.sendMessage(chatId, resp);
});
// Matches "/SvuotaNavetta"
bot.onText(/\/SvuotaNavetta/, function (msg, match) {
    var chatId = msg.chat.id;
    arrayPrenotazioni = [];
    bot.sendMessage(chatId, "Navetta vuota.");
});
bot.onText(/\/test/, function (msg) {
    var chatId = msg.chat.id;
    console.log(arrayPrenotazioni);
    bot.sendMessage(msg.chat.id, "Welcome", {
        "reply_markup": {
            "keyboard": [arrayPrenotazioni]
        }
    });
    bot.on('message', function (msg) {
        var index = arrayPrenotazioni.indexOf(msg.text);
        console.log(index);
        if (index > -1) {
            arrayPrenotazioni.splice(index, 1);
        }
        console.log(arrayPrenotazioni);
    });
    bot.sendMessage(chatId, "/test");
});
// Listen for any kind of message. There are different kinds of
// messages.
/*bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, 'Received your message');
});*/
bot.onText(/\/echo (.+)/, function (msg, match) {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    var chatId = msg.chat.id;
    var resp = match[1]; // the captured "whatever"
    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
});
//# sourceMappingURL=app.js.map