const dummy = (blogs) => {
  if (blogs) {
    return 1
  }
}

const totalLikes = (blogs) => {
  let total = 0
  for (const blog of blogs) {
    total += blog.likes
  }
  return total
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  let highest = blogs.reduce((max, blog) => {
    return blog.likes > max.likes ? blog : max
  })

  return {
    _id: highest._id,
    title: highest.title,
    author: highest.author,
    url: highest.url,
    likes: highest.likes,
    __V: highest.__v,
  }
}

module.exports = { dummy, totalLikes, favoriteBlog }
