const koa = require('koa')
var amqp = require('amqplib/callback_api');
const app = new koa()
app.use(ctx => {
    ctx.body = 'hello sender'

})
amqp.connect({
    vhost: '/pdd-website'
}, function (err, conn) {
    conn
        .createChannel(function (err, ch) {
            var q = 'hello';

            ch.assertQueue(q, {durable: false});
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
            ch.consume(q, function (msg) {
                // console.log('msg',msg)
                console.log(" [x] Received %s", msg.content.toString());
            }, {noAck: true});
        });
});
console.log('sender server lisent at port 3020')
app.listen(3020)