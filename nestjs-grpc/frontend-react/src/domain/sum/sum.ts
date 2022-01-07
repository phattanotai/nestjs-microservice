import { promisify } from '../common/promisify'
import { GatewayServiceClient } from '../../proto/GatewayServiceClientPb'
import { AddRequest } from '../../proto/gateway_pb'
import { SumRequestType } from '.'
import { constructError } from '../common/construct-error'

let gatewayServiceClient

export const sum: SumRequestType = async (a, b) => {
  try {
    gatewayServiceClient = new GatewayServiceClient('http://localhost:8005')
    const request = new AddRequest()
    request.setA(a)
    request.setB(b)

    // gatewayServiceClient.add(request, {}, (err, res) => {
    //   console.log(res)
    // })

    const sumNumbers = promisify(gatewayServiceClient.add, gatewayServiceClient)
    const result = await sumNumbers(request, null)

    console.log(result)
    return { result: result.getResult() }
  } catch (e) {
    console.log(e)
    return constructError(e)
  }
}
