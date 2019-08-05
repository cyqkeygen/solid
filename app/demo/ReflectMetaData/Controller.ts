import {Get, Post, Controller} from './RouterUtil'

@Controller('/home')
export class HomeController {
  @Get('/about')
  async about (ctx) {
    const body = ctx.request.body
    console.log(body)
    ctx.body = 'success'
  }

  @Post('/do')
  async doSomething (ctx) {
    const body = ctx.request.body
    console.log(body)
    ctx.body = 'do success'
  }
}