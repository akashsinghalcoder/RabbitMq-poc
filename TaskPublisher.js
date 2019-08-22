const RabbitMQConnection = require('./RabbitMQConnection');
export default class TaskPublisher {

    constructor() {
        this.connection = undefined;
    }

    async connect() {
        const rabbitMQConnection = RabbitMQConnection();
        let result = await rabbitMQConnection.getInstance();
        this.connection = result;
    }

    enqueue(email) {
        this.connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            var queue = 'task_email_queue';
            channel.assertQueue(queue, {
                durable: true
            });
            channel.sendToQueue(queue, Buffer.from(email), {
                persistent: true
            });
            console.log(email + " sent");
        });

    }
}