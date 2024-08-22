import fs from 'fs'
import path from 'path'

const baseTemplate = fs.readFileSync('base.html', 'utf8')
const capitalize = s => s[0].toUpperCase() + s.slice(1)
const renderTemplate = (template, params) => {
  const names = Object.keys(params)
  const vals = Object.values(params)
  return new Function(...names, `return \`${template}\``)(...vals)
}
const getTitle = (pageName) => {
  const titleSuffix = ' | Zibellino\'s'
  const title = pageName === 'index.html' ? 'Home' : capitalize(path.parse(pageName).name)
  return title + titleSuffix
}

fs.mkdirSync('public')
fs.cpSync('images', 'public/images', {recursive: true})
fs.cpSync('style', 'public/style', {recursive: true})

fs.readdirSync('pages', {withFileTypes: true})
.filter(page => !page.isDirectory())
.forEach(page => {
  fs.readdirSync('lang', {withFileTypes: true})
  .filter(langFile => !langFile.isDirectory())
  .forEach(langFile => {
    const content = fs.readFileSync(`pages/${page.name}`, 'utf8')
    const translations = JSON.parse(fs.readFileSync(`lang/${langFile.name}`, 'utf8'))
    const params = {title: getTitle(page.name), content: content, translations: translations}
    const renderedPage = renderTemplate(baseTemplate, params)
    const langCode = path.parse(langFile.name).name
    const langPath = langCode !== 'en' ? `${langCode}/` : ''

    fs.writeFileSync(`public/${langPath}${page.name}`, renderedPage)
  })
})


