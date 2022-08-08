import { ClientReadableStream } from 'grpc-web'
import { Observable } from 'rxjs'

export const constructObservable: <Response>(
  stream: ClientReadableStream<Response>,
) => { observable: Observable<Response>; cancel: () => void } = stream => ({
  observable: new Observable(subscriber => {
    stream.on('data', subscriber.next.bind(subscriber))
    stream.on('error', subscriber.error.bind(subscriber))
    stream.on('end', subscriber.complete.bind(subscriber))
  }),
  cancel: stream.cancel.bind(stream),
})
