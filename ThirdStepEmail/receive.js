
var amqp = require('amqplib/callback_api');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'xyz@technogise.com',
      pass: 'xyz'
    }
  });


amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'task_queue';

        channel.assertQueue(queue, {
            durable: true
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function (msg) {
            var mailOptions = {
                from: 'xyz@technogise.com',
                to: 'temp@yahoo.com',
                subject: 'Sending Email using Node.js',
                text: 'That was easy!'
              };
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log("success");
                  channel.ack(msg);
                }
              });

            
        }, {
                noAck: false
            });
    });
});