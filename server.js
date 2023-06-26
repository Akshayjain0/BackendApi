const app = require('./app')
const connectDB = require('./data/database')

connectDB();
// Server Listining
app.listen(process.env.PORT, () => {
    console.log(`server listining on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})