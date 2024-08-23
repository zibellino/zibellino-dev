import fs from 'fs'
import path from 'path'

const baseTemplate = fs.readFileSync('base.html', 'utf8')
const renderTemplate = (template, params) => {
  const names = Object.keys(params)
  const vals = Object.values(params)
  return new Function(...names, `return \`${template}\``)(...vals)
}

fs.readdirSync('pages', {withFileTypes: true})
.filter(page => !page.isDirectory())
.forEach(page => {
  fs.readdirSync('lang', {withFileTypes: true})
  .filter(lang => !lang.isDirectory())
  .forEach(lang => {
    const translations = JSON.parse(fs.readFileSync(`lang/${lang.name}`, 'utf8'))
    const publicPath = `public/${translations.path}`
    if (translations.path && !fs.existsSync(publicPath)) {
      fs.mkdirSync(publicPath)
    }

    const params = {
      page: path.parse(page.name).name,
      lang: translations,
    }

    const content = fs.readFileSync(`pages/${page.name}`, 'utf8')
    params.content = renderTemplate(content, params)
    
    const renderedPage = renderTemplate(baseTemplate, params)

    fs.writeFileSync(`${publicPath}${page.name}`, renderedPage)
  })
})


