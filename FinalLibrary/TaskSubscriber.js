
var amqp = require('amqplib/callback_api');
const RabbitMQConnection = require('./RabbitMQConnection');
const Email = require('./email');


export default class TaskSubscriber {

    constructor() {
        this.connection = undefined;
    }

    async connect() {
        const rabbitMQConnection = RabbitMQConnection();
        let result = await rabbitMQConnection.getInstance();
        this.connection = result;
    }

    receive() {
        this.connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }

            var queue = 'task_email_queue';

            channel.assertQueue(queue, {
                durable: true
            });
            channel.consume(queue, async function (msg) {
                console.log(msg.content.toString());
                const status = await Email.sendEmail('akash.singhal67@yahoo.com');
                if (status) {
                    channel.ack(msg);
                }
            }, { noAck: false });
        });
    }

}