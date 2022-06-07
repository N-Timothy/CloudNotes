class HTTPError<T = string> extends Error {
  public statusCode: number
  public response: T

  public constructor(statusCode: number, response: T) {
    super('')
    this.statusCode = statusCode
    this.response = response
  }
}

export {HTTPError}
