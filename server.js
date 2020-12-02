const express = require('express');

const usersRouter = require('./users/userRouter')

const server = express();


server.use(express.json())
server.use('/api/users', logger, usersRouter)


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
