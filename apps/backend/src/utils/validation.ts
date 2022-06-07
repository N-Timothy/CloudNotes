abstract class ModelValidation {
  public static create<T extends ModelValidation>(
    this: new (...params: unknown[]) => T,
    ...params: unknown[]
  ): T {
    let self = new this(params)
    return self
  }
}

export {ModelValidation}
