const mongoose = require('mongoose');
const url = 'mongodb+srv://leanhtu5991:LeeTu2210@cluster0.5a4aj.mongodb.net/real-estate?retryWrites=true&w=majority';
// const { DB_MONGO: url } = process.env;
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected', function () {
    console.log('Database connection successfully established.');
});

mongoose.connection.on('error', function (error) {
    console.log(`Database connection in error. ${error}`);
});

mongoose.connection.on('disconnected', function() {
    console.log('Datatabse connection disconnected.');
});

mongoose.connection.on('close', function() {
    console.log('Database connection closed.');
});

mongoose.Promise = global.Promise;
module.exports = mongoose;