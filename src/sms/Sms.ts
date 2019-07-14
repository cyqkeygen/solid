import {ISmsSingle} from './interface/ISms'
import {Proxy} from './modules'

export default class Sms implements ISmsSingle {
  async send ({phone, msg}) {
    await Proxy.SmsProxy.send({phone, msg})
  }
 }