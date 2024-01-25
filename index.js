const express = require('express');
dotenv = require('dotenv');

const userRoute = require('./routes/userRoute');
const urlRoute = require('./routes/urlRoute');
const staticRoute = require('./routes/staticRoute');
const cors  = require('cors');
const app = express();
const PORT = process.env.PORT || 8001;
const HOST = process.env.HOST || 'localhost';
const { connectDB } = require('./connect');
const { handleClickandRedirect } = require('./controllers/urlController');
const path = require('path');
const cookieParser = require('cookie-parser');
const { restrictToLoggedUserOnly, checkAuth } = require('./middlewares/auth');
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
dotenv.config({
    path: './.env',
});
connectDB(process.env.DB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(
    {
        origin: process.env.ORIGIN,
        credentials: true,
    }
))

app.use('/', checkAuth, staticRoute);
app.use('/url', restrictToLoggedUserOnly, urlRoute);
app.use('/user', userRoute);
// static routes


app.listen(PORT, () => console.log(`Server Online at : http://${HOST}:${PORT}`));