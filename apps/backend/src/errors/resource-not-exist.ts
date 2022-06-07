class ResourceNotExistError extends Error {
  public constructor(message: string) {
    super(message)
  }
}

export {ResourceNotExistError}
