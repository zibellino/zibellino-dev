import fs from 'fs'
import path from 'path'

const pages = ['index', 'music', 'keyboard']
const languages = ['en', 'it']
const translations = []

languages.forEach(language => {
  translations[language] = JSON.parse(fs.readFileSync(`lang/${language}.json`, 'utf8'))

  if (language !== 'en') {
    fs.mkdirSync(`public/${language}`)
  }
})

const href = (page, lang) => {
  page = page !== 'index' ? page : ''
  lang = lang !== 'en' ? lang : ''

  return `/${[lang, page].filter(Boolean).join('/')}`
}

const $ = {
  svg: (name) => fs.readFileSync(`public/images/${name}.svg`),
  title: (page) => translations[$.lang].titles[page || $.page],
  html: (partial, params) => {
    const content = fs.readFileSync(`html/${partial ? `partial/${partial}` : $.page}.html`, 'utf8')
    return new Function('$', `return \`${content}\``)(params || $)
  },
  pageLinks: () => pages.map(page => {
    const params = {
      href: href(page, $.lang),
      text: $.title(page),
      rel: page === 'index' ? 'author' : '',
    }

    return $.html('anchor', params)
  }).join(''),
  langLinks: () => languages.map(lang => {
    const params = {
      href: href($.page, lang),
      text: lang.toUpperCase(),
      rel: 'alternate',
      hreflang: lang,
    }

    return $.html('anchor', params)
  }).join(''),
}

pages.forEach(page => {
  languages.forEach(lang => {
    $.page = page
    $.lang = lang

    fs.writeFileSync(`public/${lang !== 'en' ? `${lang}/` : ''}${page}.html`, $.html())
  })
})


