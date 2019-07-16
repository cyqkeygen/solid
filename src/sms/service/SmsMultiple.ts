import {ISmsMultiple} from '../interface/ISms'
import {Proxy} from '../modules'

export default class SmsMultiple implements ISmsMultiple {
  async multiSend ({phones, msg}) {
    await Proxy.SmsProxy.multiSend({phones, msg})
  }
 }