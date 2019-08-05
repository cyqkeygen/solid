import {ISmsMultipleAbstract} from '../interface/sms.abstract'
import {Proxy} from '../modules'

export default class SmsMultiple implements ISmsMultipleAbstract {
  async multiSend ({phones, msg}) {
    await Proxy.SmsProxy.multiSend({phones, msg})
  }
 }