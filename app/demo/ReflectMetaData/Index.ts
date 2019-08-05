import * as http from 'http'
import * as Koa from 'koa'
import * as bodyparser from 'koa-bodyparser'
import router from './Router'

const beginTime = Date.now()

const app = new Koa()

app.use(bodyparser())
app.use(router.routes())
app.use(router.allowedMethods())

const server = http.createServer(app.callback())
const port = 8080

if (!module.parent) {
  server.listen(port)
}

console.log(`app start in ${process.env.NODE_ENV} env, ${(Date.now() - beginTime) / 1000} s, listen on port ${port}`)

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