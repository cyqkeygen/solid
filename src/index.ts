import * as http from 'http'
// import * as Koa from 'koa'
import * as bodyParser  from 'koa-bodyparser'
import * as json  from 'koa-json'
import Router from './router'

const Koa = require('koa')
const app = new Koa()

// middlewares
app.use(bodyParser())
app.use(json())
app.use(Router.routes(), Router.allowedMethods())

const server = http.createServer(app.callback())

server.listen(8080)

function graceful () {
  try {
    console.log('graceful shutting down...')
    server.close(() => {
      console.log('server down...')
      process.exit(0)
    })
  } catch (e) {
    console.log(e)
    server.close(() => {
      console.log('server down...')
      process.exit(0)
    })
  }
}

process.on('SIGTERM', graceful)
process.on('SIGINT', graceful)

module.exports = server