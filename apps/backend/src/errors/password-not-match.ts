class PasswordNotMatch extends Error {
  public constructor(message: string) {
    super(message)
  }
}

export {PasswordNotMatch}
