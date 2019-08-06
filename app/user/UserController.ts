import { provide, controller, inject, get } from 'midway'
import {Get, Post, Delete, Put, Patch, Controller} from '../decorator/controller'
import {IUser, IUserRes} from './interface/IUser'

@provide()
@Controller('/user')
export class UserController {

  @inject('userService')
  service: IUser

  @Get('/:id')
  async show(ctx): Promise<void> {
    // const userId: string = ctx.params.id;
    // const user: IUserRes = await this.service.show({userId})
    // ctx.body = {success: true, message: 'OK', data: user}
    ctx.body = {success: true, message: 'OK'}
  }

  @Post('/')
  async register(ctx): Promise<void> {
    ctx.body = {success: true, message: 'OK'}
  }

  @Put('/:id')
  async login(ctx): Promise<void> {
    ctx.body = {success: true, message: 'OK'}
  }

  @Patch('/:id')
  async update (ctx): Promise<void> {
    ctx.body = {success: true, message: 'OK'}
  }

  @Delete('/:id')
  async deleteUser(ctx): Promise<void> {
    ctx.body = {success: true, message: 'OK'}
  }
}
