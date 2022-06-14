class UnauthorizedChange extends Error {
  public constructor(message: string) {
    super(message)
  }
}

export {UnauthorizedChange}
