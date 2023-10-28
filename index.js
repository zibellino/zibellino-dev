import express from 'express'
import fs from 'fs'
const app = express()

app.get('/', (req, res) => {
  try {
    const baseTemplate = fs.readFileSync('views/base.html', 'utf8')
    const params = {title:'Home', content:'Hello content!'}
    const names = Object.keys(params)
    const vals = Object.values(params)
    const page = (new Function(...names, `return \`${this}\``))(...vals)
    
    res.send(page)
  } catch (e) {
    res.status(404)
    res.send('404')
  }
})

const port = parseInt(process.env.PORT) || 8080
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

function renderFile(filename, params) {
  const names = Object.keys(params)
  const vals = Object.values(params)
  return new Function(...names, `return \`${this}\``)(...vals)
}
