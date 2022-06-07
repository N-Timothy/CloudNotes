class ResourceExistError extends Error {
  public constructor(message: string) {
    super(message)
  }
}

export {ResourceExistError}
