export class DomainError extends Error {
  public readonly isError = true

  constructor(public readonly message: string, public readonly title?: string, public readonly code?: number) {
    super()
  }
}
