const amqp = require("amqplib/callback_api");

const host = "localhost:5672";
const credential = "nestjsUser:nestjsPassword";
const server = `amqp://${credential}@${host}`;

amqp.connect(server, (err, conn) => {
  conn.createChannel((err, ch) => {
    const queue = "hello";

    ch.assertQueue(queue, { durable: false });
    // Note: on Node 6 Buffer.from(msg) should be used
    ch.sendToQueue(queue, new Buffer("Hello World!"));
    console.log(" [x] Sent 'Hello World!'");
    setTimeout(() => {
      conn.close();
      process.exit(0);
    }, 500);
  });
});
