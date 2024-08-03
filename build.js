import fs from 'fs'

const baseTemplate = fs.readFileSync('views/base.html', 'utf8')
const content = fs.readFileSync('views/index.html', 'utf8')
const params = {title: 'Home', content: content}
const page = renderTemplate(baseTemplate, params)

fs.mkdirSync('public')
fs.writeFileSync('public/index.html', page)
fs.cpSync('images', 'public/images', {recursive: true})
fs.cpSync('style', 'public/style', {recursive: true})


function renderTemplate(template, params) {
  const names = Object.keys(params)
  const vals = Object.values(params)
  return new Function(...names, `return \`${template}\``)(...vals)
}
