require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const app = express();

const cookieParser = require('cookie-parser'); // to be able to read cookies

app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
};
app.use(cors( corsOptions ))
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );


const connectDB = require('./config/db.config');
connectDB().then(() => {
    const userRouter = require('./routes/user.routes');
    app.use('/api/user', userRouter);
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})