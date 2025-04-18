/*
  Router defines related routes. The event handlers of routes are commonly referred to as
  controllers.
*/

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
    .populate('likedBy', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }

  if (!body.title || !body.content) {
    return response.status(400).json({
      error: 'title or content missing'
    })
  }

  const blog = new Blog({
    title: body.title,
    content: body.content,
    likes: body.likes || 0,
    user: user.id
  })

  const savedBlog = await blog.save()
  await savedBlog.populate('user', { username: 1, name: 1 })
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  if (blog.user && blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'only the creator can delete blogs' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  // If this is a like operation
  if ('likes' in body && 'likedBy' in body) {
    const currentLikedBy = blog.likedBy || []
    const userId = user.id
    
    // Check if user has already liked
    const hasLiked = currentLikedBy.includes(userId)
    
    let newLikedBy
    if (hasLiked) {
      // Unlike: remove user from likedBy
      newLikedBy = currentLikedBy.filter(id => id.toString() !== userId.toString())
    } else {
      // Like: add user to likedBy
      newLikedBy = [...currentLikedBy, userId]
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      {
        likes: newLikedBy.length,
        likedBy: newLikedBy
      },
      { new: true, runValidators: true }
    ).populate('user', { username: 1, name: 1 })
    .populate('likedBy', { username: 1, name: 1, id: 1 })
    
    return response.json(updatedBlog)
  }

  // For non-like updates
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    {
      title: body.title,
      content: body.content,
      user: body.user
    },
    { new: true, runValidators: true }
  ).populate('user', { username: 1, name: 1 })
  
  response.json(updatedBlog)
})

module.exports = blogsRouter
