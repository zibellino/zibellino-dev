import express from 'express'
import fs from 'fs'
const app = express()

app.use(express.static('style'))
app.use(express.static('images'))

app.get('/:page?', (req, res) => {
  try {
    const baseTemplate = fs.readFileSync('views/base.html', 'utf8')
    const params = {title: 'Home', content: req.params.page || 'base'}
    const page = renderTemplate(baseTemplate, params)
    
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

function renderTemplate(template, params) {
  const names = Object.keys(params)
  const vals = Object.values(params)
  return new Function(...names, `return \`${template}\``)(...vals)
}
