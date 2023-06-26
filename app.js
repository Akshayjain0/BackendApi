const express = require('express')
const app = express();
const userRouter = require('./routes/userRouter')
const taskRouter = require('./routes/taskRouter')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config({
    path: "./data/config.env"
});

// Body Parser from Forms and JSON view
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
})
);
// Using Routes 
app.use('/api/v1/users', userRouter)
app.use('/api/v1/task', taskRouter)

// Using error middlewares

app.use((err, req, res, next) => {
    err.message = err.message || "Internal Server Error"
    err.statusCode = err.statusCode || 500;
    return res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
})




module.exports = app;