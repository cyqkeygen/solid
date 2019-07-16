import {Container} from 'inversify'
import {TYPTES} from './type'
import {ISmsSingle} from './sms/interface/ISms'
import {ICodeMachine} from './code/interface/ICode'
import {IUser} from './user/interface/IUser'
import SmsService from './sms/service/SmsService'
import CodeMachine from './code/service/CodeMachine'
import UserService from './user/service/UserService'

const container = new Container()

container.bind<ISmsSingle>(TYPTES.Sms).to(SmsService)
container.bind<ICodeMachine>(TYPTES.Code).to(CodeMachine)
container.bind<IUser>(TYPTES.User).to(UserService)

export {container}