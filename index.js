// code away!
require('dotenv').config()
const port = process.env.PORT || 4000


const server = require('./server')

server.listen(port, () => {
    console.log(`\n* Server Running on ${port} *\n`)
})