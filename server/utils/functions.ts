export const removeSensitiveDataPost = (data: any) => {
  return {
    ...data,
    author: {
      id: data.author.id,
      email: data.author.email,
      firstName: data.author.firstName,
      lastName: data.author.lastName,
    },
  }
}

export const removeSensitiveData = (data: any) => {
  return {
    id: data.id,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
  }
}
