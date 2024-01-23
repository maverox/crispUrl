const express = require('express');

const userRoute = require('./routes/userRoute');
const urlRoute = require('./routes/urlRoute');
const staticRoute =  require('./routes/staticRoute');

const app = express();
const PORT = process.env.PORT || 8001;
const HOST = process.env.HOST || 'localhost';
const { connectDB } = require('./connect');
const { handleClickandRedirect } = require('./controllers/urlController');
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
dotenv = require('dotenv');
dotenv.config({
    path: './.env',
});
connectDB(process.env.DB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', staticRoute);
app.use('/url', urlRoute);
app.use('/user', userRoute);
// static routes


app.listen(PORT, () => console.log(`Server Online at : http://${HOST}:${PORT}`));