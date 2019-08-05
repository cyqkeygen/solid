import { TYPTES } from '../../type'
import {ICodeMachine, ICodeParam} from '../interface/ICode'
import {ISmsSingleAbstract} from '../../sms/interface/sms.abstract'
import {injectable, inject} from 'inversify' 

@injectable()
export default class CodeMachine implements ICodeMachine {
  @inject(TYPTES.Sms) private sms: ISmsSingleAbstract

  async send (param: ICodeParam) {
    const {phone, code} = param
    const msg = `[xx应用]你的注册验证码是: ${code}`
    await this.sms.send({phone, msg})
  }

  async validate (param: ICodeParam) {
    return param.code === '123456'
  }
}