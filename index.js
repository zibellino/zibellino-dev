import express from 'express'
import fs from 'fs'
const app = express()

app.use('/style', express.static('style'))
app.use('/images', express.static('images'))

app.get('/:page?', (req, res) => {
  try {
    const baseTemplate = fs.readFileSync('views/base.html', 'utf8')
    const content = fs.readFileSync('views/' + (req.params.page || 'index') + '.html', 'utf8')
    const params = {title: capitalize(req.params.page || 'Home'), content: content}
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

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function renderTemplate(template, params) {
  const names = Object.keys(params)
  const vals = Object.values(params)
  return new Function(...names, `return \`${template}\``)(...vals)
}
