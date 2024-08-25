import fs from 'fs'
import path from 'path'

const pages = ['index', 'music', 'keyboard']
const languages = ['en', 'it']
const translations = []

languages.forEach(language => {
  translations[language] = JSON.parse(fs.readFileSync(`lang/${language}.json`, 'utf8'))
  const publicPath = `public/${language}`
  if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath)
  }
})

const $ = {
  svg: (name) => fs.readFileSync(`public/images/${name}.svg`),
  content: (page) => new Function('$', `return \`${fs.readFileSync(`pages/${page || $.page}.html`, 'utf8')}\``)($),
  path: (page) => `/${$.lang !== 'en' ? `${$.lang}/` : ''}${page !== 'index' ? page : ''}`,
  title: (page) => $.translations[$.lang].titles[page || $.page],
}

pages.forEach(page => {
  languages.forEach(lang => {
    $.page = page
    $.lang = lang

    const renderedPage = 
    fs.writeFileSync(`${$.path(page)}.html`, $.html('base'))
  })
})


