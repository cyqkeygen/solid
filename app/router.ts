import {routerConfigure} from './decorator/controller'
import {UserController} from './user/UserController'

const router = require('koa-router')({
  prefix: '/api/v1'
})

routerConfigure({controller: new UserController(), router})

export {router}