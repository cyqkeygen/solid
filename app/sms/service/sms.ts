import {ISmsSingleAbstract} from '../interface/sms.abstract'
import {Proxy} from '../modules'
import { injectable } from 'inversify'

@injectable()
export default class Sms implements ISmsSingleAbstract {
  async send ({phone, msg}) {
    await Proxy.SmsProxy.send({phone, msg})
  }
 }