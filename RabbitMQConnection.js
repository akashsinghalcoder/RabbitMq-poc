
var amqp = require('amqplib/callback_api');
module.exports = function () {
    let instance;
    return {
        getInstance: async () => {
            if (instance) {
                return instance;
            } else {
                const instance = await createInstance();
                return instance;
            }
        }
    };

    async function createInstance() {
        const connection = await new Promise((resolve, reject) => {
            return amqp.connect('amqp://localhost', (error, connection) => {
                if (error) {
                    throw error;
                }
               resolve(connection);
            });
        });
        return connection;
    }

}

