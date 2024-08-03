import fs from 'fs'
import path from 'path'

const baseTemplate = fs.readFileSync('views/base.html', 'utf8')
const capitalize = s => s[0].toUpperCase() + s.slice(1)
const renderTemplate = (template, params) => {
  const names = Object.keys(params)
  const vals = Object.values(params)
  return new Function(...names, `return \`${template}\``)(...vals)
}

fs.mkdirSync('public')
fs.cpSync('images', 'public/images', {recursive: true})
fs.cpSync('style', 'public/style', {recursive: true})

fs.readdirSync('pages', {withFileTypes: true})
.filter(page => !page.isDirectory())
.forEach(page => {
  const title = page.name === 'index.html' ? 'Home' : capitalize(path.parse(filename).name)
  const content = fs.readFileSync('views/index.html', 'utf8')
  const params = {title: title, content: content}
  const renderedPage = renderTemplate(baseTemplate, params)

  fs.writeFileSync(`public/${page.name}`, renderedPage)
})


