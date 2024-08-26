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

const $ = {
  svg: (name) => fs.readFileSync(`public/images/${name}.svg`),
  title: (page) => translations[$.lang].titles[page || $.page],
  content: (page, params) => {
    const content = fs.readFileSync(`pages/${page || $.page}.html`, 'utf8')
    return new Function('$', `return \`${content}\``)(params || $)
  },
  path: (page, lang) => {
    page = page || $.page
    page = page !== 'index' ? page : ''

    lang = lang || $.lang
    lang = lang !== 'en' ? lang : ''

    return `/${[lang, page].filter(Boolean).join('/')}`
  },
  pageLinks: () => pages.map(page => {
    const params = {
      path: $.path(page),
      text: $.title(page),
      rel: page === 'index' ? 'author' : '',
    }

    return $.content('anchor', params)
  }),
  langLinks: () => languages.map(lang => {
    const params = {
      path: $.path(null, lang),
      text: lang.toUpperCase(),
      rel: 'alternate',
      hreflang: lang,
    }

    return $.content('anchor', params)
  }),
}

pages.forEach(page => {
  languages.forEach(lang => {
    $.page = page
    $.lang = lang

    fs.writeFileSync(`public/${lang !== 'en' ? `${lang}/` : ''}${page}.html`, $.content('base'))
  })
})


