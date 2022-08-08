import { StatusCode } from 'grpc-web'
import { DomainError } from './domain-error'

export const constructError = (error: any, title?: string) => {
  switch (error.code) {
    case StatusCode.UNKNOWN:
      switch (error.message) {
        case 'Http response at 400 or 500 level':
          return new DomainError('internal.no-network-check-your-connection', 'internal.network-error')
      }
      break
    case StatusCode.INTERNAL:
      return new DomainError(error.message, title)
    case StatusCode.INVALID_ARGUMENT:
      return new DomainError('internal.invalid-arguments', 'internal.validation-error')
  }
  return new DomainError('internal-error')
}
