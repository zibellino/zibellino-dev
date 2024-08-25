import fs from 'fs'
import path from 'path'

const pages = ['index', 'music', 'keyboard']
const languages = ['en', 'it']
const $ = {
  svg: (name) => fs.readFileSync(`public/images/${name}.svg`),
  content: (page) => new Function('$', `return \`${fs.readFileSync(`pages/${page || $.page}.html`, 'utf8')}\``)($)
}

const renderTemplate = (template, params) => {
  return new Function('$', `return \`${template}\``)(params)
}

const includeSvg = (name) => {
  return fs.readFileSync(`public/images/${name}.svg`)
}

pages.forEach(page => {
  languages.forEach(lang => {
    const translations = JSON.parse(fs.readFileSync(`lang/${lang}.json`, 'utf8'))
    const publicPath = `public/${translations.path}`
    if (translations.path && !fs.existsSync(publicPath)) {
      fs.mkdirSync(publicPath)
    }

    const params = {
      page: page,
      lang: translations,
      svg: includeSvg,
      $: $
    }
    
    $.page = page
    $.lang = translations

    const renderedPage = $.content('base')
    fs.writeFileSync(`${publicPath}${page}.html`, renderedPage)
  })
})


