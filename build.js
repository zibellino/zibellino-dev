import fs from 'fs'
import path from 'path'

const pages = ['index', 'music', 'keyboard']
const languages = ['en', 'it']
const $ = {
  svg: (name) => fs.readFileSync(`public/images/${name}.svg`),
  html: (page) => new Function('$', `return \`${fs.readFileSync(`pages/${page || $.page}.html`, 'utf8')}\``)($),
  path: (page) => `/${$.lang.path}${(page || $.page) !== 'index' ? (page || $.page) : ''}`
}

pages.forEach(page => {
  languages.forEach(lang => {
    const translations = JSON.parse(fs.readFileSync(`lang/${lang}.json`, 'utf8'))
    const publicPath = `public/${translations.path}`
    if (translations.path && !fs.existsSync(publicPath)) {
      fs.mkdirSync(publicPath)
    }
    
    $.page = page
    $.lang = translations

    const renderedPage = $.html('base')
    fs.writeFileSync(`${publicPath}${page}.html`, renderedPage)
  })
})


