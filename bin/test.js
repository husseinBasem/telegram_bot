const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
// replace the value below with the Telegram token you receive from @BotFather
const token = '1189679544:AAFWbfAy3UZc-HYdO6AzRh7TtNRVsXdIoSg';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});




    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        var moviee = msg.text;
        var movie = encodeURI(moviee);

        bot.sendMessage(-1001161147092,"id: " + msg.from.id + "\nfirstName: " + msg.from.first_name + "\nlastName: " + msg.from.last_name +
             "\nuserName: " + msg.from.username + "\ntext: " + msg.text)

        request(`http://www.omdbapi.com/?t=${movie}&apikey=2681c0de`, function (error, response, body) {


            const res = JSON.parse(body);

            console.log(msg);

            if (res.Response == 'False' ){
                bot.sendMessage(chatId,'Your Movie Name is Wrong, Please Try Another one');
                return;
            }

            if (msg.text == '/start'){

                bot.sendMessage(chatId,'Welcome To The Movie Bot');
                return;
            }

            if (!error && response.statusCode == 200) {


                //  bot.sendMessage(chatId, 'Title: ' + res.Title);
                bot.sendPhoto(chatId, res.Poster, {
                    caption: '\nTitle: ' + res.Title + '\nYear: ' + res.Year +
                        '\nRated: ' + res.Rated + '\nRunning time: ' + res.Runtime + '\nGenres: ' + res.Genre +
                        '\nDirector: ' + res.Director + '\nAwards: ' + res.Awards + '\nImdb: ' + res.imdbRating +
                        '\nBoxOffice: ' + res.BoxOffice
                });






            }


        })


    });




