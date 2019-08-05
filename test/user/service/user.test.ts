import * as assert from 'power-assert'
import {container} from '../../../app/inversify.config'
import {TYPTES} from '../../../app/type'
import {IUser} from '../../../app/user/interface/IUser'

describe('发送验证码', async () => { 
  it('发送成功', async () => {
    const userSerivce = container.get<IUser>(TYPTES.User)
    const phone = '13800000000'
    const result = await userSerivce.sendCode({phone})
  })

  it.only('登录成功', async () => {
    const userSerivce = container.get<IUser>(TYPTES.User)
    const data = {
      phone: '13800000000',
      code: '123456'
    }
    const result = await userSerivce.login(data)
    assert(result.phone === data.phone)
    assert(result.token === '1234')
  })
})