import {ISmsSingle} from '../interface/ISms'
import {Proxy} from '../modules'
import { injectable } from 'inversify'

@injectable()
export default class Sms implements ISmsSingle {
  async send ({phone, msg}) {
    await Proxy.SmsProxy.send({phone, msg})
  }
 }