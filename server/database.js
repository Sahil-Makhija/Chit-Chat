const connectToDatabase = () => {
    const mongoose = require('mongoose');
    const dotenv = require('dotenv');
    dotenv.config()
    const { DB_URI } = process.env

    mongoose.connect(`${DB_URI}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((data) => { console.log(`Mongodb connected with server: ${data.connection.host}`); })
        .catch((err) => { console.log(err); })
}

module.exports = connectToDatabase