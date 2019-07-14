const router = require('koa-router')({
  prefix: '/api/v1'
})

router.get('/healthcheck', async (ctx) => {
  ctx.body = 'Hello world'
})

export default router