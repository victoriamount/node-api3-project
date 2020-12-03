const express = require('express');
const cors = require('cors')
const path = require('path')
const usersRouter = require('./users/userRouter')
const postsRouter = require('./posts/postRouter')
const server = express();


console.log('hi Sterling!')
console.log(__dirname)
console.log(process.env.USER)
console.log(process.env.PORT)
console.log(process.env.STERLING)

server.use(express.json())
server.use(cors())
server.use(express.static(path.join(__dirname, 'client/build')))
server.use('/api/users', logger, usersRouter)
server.use('/api/posts', logger, postsRouter)


server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log('Req method: ', req.method)
  console.log('Req url: ', req.url)
  console.log('Timestamp: ', new Date())

  next()
}

module.exports = server;
