const http = require('http');
const Events = require('events');
const eventEmmiter = new Events ();

const PORT = process.env.PORT || 3000;
const INTERVAL = process.env.INTERVAL || 1000;
const TIMEOUT = process.env.TIMEOUT || 10000;

eventEmmiter.on('connected', () => {
    console.log("HELLO");
});


http.createServer(function (request, response) {
    eventEmmiter.emit('connected');

    // Задаем интервал вывода времени/даты UTC
    var timerId = setInterval(() => {
        let date = new Date().toUTCString();
        response.write(date + '\n');
        console.log(date);
    }, INTERVAL);

    // Объявляем прекращение
    setTimeout(() => {
        clearInterval(timerId);
        console.log("STOP");
        response.end();
    }, TIMEOUT);
}).listen(PORT);


