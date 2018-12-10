const koa = require('koa')
const amqp = require('amqplib/callback_api')
const app = new koa()
let count = 0
amqp.connect({
    vhost: '/pdd-website'
}, function (err, conn) {
    // 'amqp://wanqiufeng:Pdd_2018@localhost:5672/pdd-website'
    // amqp.connect('amqp://localhost/pdd-website', function(err, conn) {
    if (err) {
        console.log('error 1', err)
        return
    }
    conn
        .createChannel(function (err, ch) {
            console.log('error2', err)
            const q = 'hello'
            ch.assertQueue(q, {durable: false})
            ch.sendToQueue(q, new Buffer('Hello i am is sender'))
            console.log(" [x] Sent 'Hello World!'");
            setInterval(() => {
                console.log(` [x] Sent 'Hello World!' ${count ++ }`);
                ch.sendToQueue(q, new Buffer(`Hello i am is sender      ${count++}`))
            }, 2000)
            //   setTimeout(function() { conn.close(); process.exit(0) }, 500);
        });
});

app.use(ctx => {
    ctx.body = 'hello sender'

})
console.log('sender server lisent at port 3010')
app.listen(3010)