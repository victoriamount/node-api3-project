const express = require('express');

const Users = require('./userDb')
const Posts = require('../posts/postDb')

const router = express.Router();


router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(err => {
      console.log(error);
      res.status(500).json({
        message: 'Error adding the user',
      });      
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const postInfo = { ...req.body, user_id: req.params.id }
  Posts.insert(postInfo)
    .then(post => {
      res.status(210).json(post)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Error adding post' })
    })
});

router.get('/', (req, res) => {
  Users.get()
    .then(usersList => {
      res.status(200).json(usersList)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: 'Error retrieving the users',
      })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId, (req, res) => {
  const { id } = req.params
  Users.getUserPosts(id) 
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res.status(400).json({ message: 'error retrieving posts' })
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  const { id } = req.params
  Users.remove(id)
    .then(numDel => {
      res.status(200).json({ message: 'The user has been deleted' })
    })
    .catch(err => {
      res.status(500).json({ message: 'error deleting user' })
    })
});

router.put('/:id', validateUserId, (req, res) => {
  Users.update(req.params.id, req.body)
    .then(numUpd => {
      res.status(200).json({ message: 'The user has been updated' })
    })
    .catch(err => {
      res.status(500).json({ message: 'error updating user' })
    })
});

//custom middleware

async function validateUserId(req, res, next) {
  const { id } = req.params
  try {
    const user = await Users.getById(id)
    if (!user) {
      console.log('user not validated')
      res.status(404).json({ message: "user not found" })
    } else {
      console.log('user validated')
      req.user = user
      next()
    }
  }
  catch(err) {
    res.status(400).json({ message: "invalid user id" })
  }
}

async function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing user data" })
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" })
  } else {
    console.log('new user credentials valid')
    next()
  }
}

async function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing post data" })
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" })
  } else {
    console.log('new post credentials valid')
    next()
  }
}

module.exports = router;
