import {Container} from 'inversify'
import {TYPTES} from './type'
import {ISmsSingleAbstract} from './sms/interface/sms.abstract'
import {ICodeMachine} from './code/interface/ICode'
import {IUser} from './user/interface/IUser'
import Sms from './sms/service/sms'
import CodeMachine from './code/service/CodeMachine'
import User from './user/service/user'

const container = new Container()

container.bind<ISmsSingleAbstract>(TYPTES.Sms).to(Sms)
container.bind<ICodeMachine>(TYPTES.Code).to(CodeMachine)
container.bind<IUser>(TYPTES.User).to(User)

export {container}