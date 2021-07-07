const express = require('express');
const Posts = require('./postDb')

const router = express.Router();

router.get('/', (req, res) => {
  Posts.get()
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Error retrieving posts' })
    })
});

router.get('/:id', validatePostId, (req, res) => {
  res.status(200).json(req.post)
});

router.delete('/:id', validatePostId, (req, res) => {
  Posts.remove(req.params.id)
    .then(numDel => {
      res.status(200).json({ message: 'Post has been deleted' })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'error deleting post' })
    })
});

router.put('/:id', validatePostId, (req, res) => {
  Posts.update(req.params.id, req.body)
    .then(numUpd => {
      res.status(200).json({ message: 'Post has been updated' })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'error editing post' })
    })
});

// custom middleware

async function validatePostId(req, res, next) {
  const { id } = req.params
  try {
    const post = await Posts.getById(id)
    if (!post) {
      res.status(404).json(`No post found with id ${id}`)
    } else {
      req.post = post
      next()
    }
  }
  catch(err) {
    res.status(500).json({ message: 'database error type: validatePostId' })
  }
}

module.exports = router;
