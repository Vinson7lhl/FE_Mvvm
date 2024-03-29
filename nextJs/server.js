const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()
  /**
   * 映射到用户自定义的文件路径
   */
  server.get('/p/:id', (req, res) => {
    console.log('拿到的id：'+req.params.id)
    const actualPage = '/post';
    // const queryParams = { title: req.params.id }
    const queryParams = { id: req.params.id } 
    app.render(req, res, actualPage, queryParams)
  })
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})