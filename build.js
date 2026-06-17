// SPDX-License-Identifier: MIT-0
import fs from 'fs'
import path from 'path'

const languages = ['en', 'de', 'it', 'hu']
const translations = []

const $ = {
  svg: (name) => fs.readFileSync(`public/images/${name}.svg`),
  html: (partial, params) => {
    const content = fs.readFileSync(`html/${partial || 'index'}.html`, 'utf8')
    return new Function('$', `return \`${content}\``)(params || $)
  },
  section: (section) => {
    $.sectionTitle = translations[$.lang].section_titles[section]
    return $.html(`section/${section}`, $)
  },
  langLinks: () => languages.map(lang => {
    const params = {
      href: `/${lang !== 'en' ? lang : ''}`,
      text: lang.toUpperCase(),
      rel: 'alternate',
      hreflang: lang,
    }

    return $.html('anchor', params)
  }).join(''),
}

languages.forEach(lang => {
  translations[lang] = JSON.parse(fs.readFileSync(`lang/${lang}.json`, 'utf8'))

  if (lang !== 'en') {
    fs.mkdirSync(`public/${lang}`)
  }

  $.lang = lang

  fs.writeFileSync(`public/${lang !== 'en' ? `${lang}/` : ''}index.html`, $.html())
})
