/*
  Defines the Mongoose schema for blogs.
*/
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    maxLength: 1500,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  likedBy: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    default: []
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

// Add a pre-save hook to ensure likes count matches likedBy length
blogSchema.pre('save', function(next) {
  if (this.likedBy) {
    this.likes = this.likedBy.length
  }
  next()
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)