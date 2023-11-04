import express, {Request, Response} from 'express';
import {Client} from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal'

const app = express();

app.get('', (req: Request, res: Response) => {
    res.send('hi')
});




const client = new Client({});
client.on('qr', (qr) => {
    console.log('QR', qr);
    qrcode.generate(qr, {small: true})
})

client.on('ready', () => {
    console.log('Client is ready');

    const text = "Hello, this is a test message!";

    // Getting chatId from the number.
    // We have to delete "+" from the beginning and add "@c.us"
    // at the end of the number.
    const chatId = "77772044471@c.us";

    // Sending message.

    client.sendMessage(chatId, text);
})

client.initialize();

client.on('message', message => {
    console.log(message);

    if(message.body === '!hello') {
        message.reply('Hello!');
    }
});
app.listen(3000,  async () => {
    console.log('Listening on port ' + 3000);
})

app.post('/send-message/:number', (req: Request, res: Response) => {
    res.send('hi')
    console.log(req.params);
    if (req.body?.number && req.body?.message) {
        const chatId = req.params?.number + "@c.us";
        try {

            client.sendMessage(chatId, req.body?.message);
        } catch (e) {
            console.log(e);
        }
    }
});