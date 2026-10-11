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

  let highestLike = blogs.reduce((max, blog) => {
    return blog.likes > max.likes ? blog : max
  })

  return highestLike
}

module.exports = { dummy, totalLikes, favoriteBlog }
