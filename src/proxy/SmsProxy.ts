export default class SmsProxy {
  static async send ({phone, msg}) {
    console.log(`手机号码: ${phone}, 发送了一条短信: ${msg}`)
  }

  static async multiSend ({phones, msg}) {
    
  }
}