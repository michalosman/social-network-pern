/* eslint-disable @typescript-eslint/no-explicit-any */

export const removeSensitiveData = (data: any) => {
  return {
    id: data.id,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
  }
}

export const removeSensitiveDataPost = (data: any) => {
  const likes = data.likes?.map((like: any) => like.id)
  const comments = data.comments?.map((comment: any) => {
    return { ...comment, author: removeSensitiveData(comment.author) }
  })

  return {
    ...data,
    author: {
      id: data.author.id,
      email: data.author.email,
      firstName: data.author.firstName,
      lastName: data.author.lastName,
    },
    likes: likes || [],
    comments: comments || [],
  }
}
