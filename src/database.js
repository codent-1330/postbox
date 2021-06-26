const mongoose = require('mongoose')

const url = 'mongodb + srv://postbox:postbox@postbox.cux3t.mongodb.net/Postbox?retryWrites=true&w=majority';

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}
mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })