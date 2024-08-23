import fs from 'fs'
import path from 'path'

const pages = ['index', 'music', 'keyboard', 'about']
const languages = ['en', 'it']

const baseTemplate = fs.readFileSync('base.html', 'utf8')
const renderTemplate = (template, params) => {
  const names = Object.keys(params)
  const vals = Object.values(params)
  return new Function(...names, `return \`${template}\``)(...vals)
}

pages.forEach(page => {
  languages.forEach(lang => {
    const translations = require(`lang/${lang}.json`)
    const publicPath = `public/${translations.path}`
    if (translations.path && !fs.existsSync(publicPath)) {
      fs.mkdirSync(publicPath)
    }

    const params = {
      page: page,
      lang: translations,
    }

    const content = fs.readFileSync(`pages/${page}.html`, 'utf8')
    params.content = renderTemplate(content, params)
    
    const renderedPage = renderTemplate(baseTemplate, params)
    fs.writeFileSync(`${publicPath}${page}.html`, renderedPage)
  })
})


