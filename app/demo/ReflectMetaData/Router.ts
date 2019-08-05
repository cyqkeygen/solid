import * as Router from 'koa-router'
import {routerConfigure} from './RouterUtil'
import {HomeController} from './Controller'
import { async } from 'midway';

const router = new Router({
  prefix: '/api/v1'
})

const home = new HomeController()
routerConfigure({controller: home, router})

export default router

