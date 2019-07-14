import Sms from './Sms'
import SmsMultiple from './SmsMultiple'

export default class SmsBizService {
  static readonly sms = new Sms()
  static readonly smsMultiple = new SmsMultiple()
}