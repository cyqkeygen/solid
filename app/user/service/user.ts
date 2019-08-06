import { TYPTES } from '../../type'
// TODO: 进一步减少引入
import {IUser} from '../interface/IUser'
import {ICodeMachine} from '../../code/interface/ICode'
import * as _ from 'lodash'
import { inject, injectable } from 'inversify'

const mockUser = {
  userId: '0cc175b9c0f1b6a831c399e269772661',
  phone: '13800000000',
  name: '张三',
  address: '广州珠江新城',
  token: '0cc175b9c0f1b6a831c399e269772661'
}

@injectable()
export default class User implements IUser {
  @inject(TYPTES.Code)
  private code: ICodeMachine

  async show (param) {
    return mockUser
  }

  async sendCode (param) {
    const {phone} = param
    const code = _.random(1000000)
    await this.code.send({phone, code})
  }

  async register (param) {
    return mockUser
  }

  async login (param) {
    const {phone, code} = param
    await this.code.validate({phone, code})
    return mockUser
  }
}