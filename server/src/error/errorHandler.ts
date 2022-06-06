import { Request, Response, NextFunction } from 'express'
import ApiError from './ApiError'

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  if (err instanceof ApiError)
    return res.status(err.code).json({ code: err.code, error: err.message })

  return res.status(500).json({ code: 500, error: 'Something went wrong' })
}

export default errorHandler
