// SPDX-License-Identifier: MIT-0
import fs from 'fs'
import path from 'path'
import content from './content.js'

const languages = fs.readdirSync('lang').map(f => f.replace('.json', ''))

const $ = {
  svg: (name) => fs.readFileSync(`public/images/${name}.svg`),
  html: (partial, params) => {
    const template = fs.readFileSync(`html/${partial || 'index'}.html`, 'utf8')
    return new Function('$', `return \`${template}\``)(params || $)
  },
  sections: () => $.content.sections.map(section => {
    Object.assign($, section)
    return $.html(`sections/${section.template}`)
  }).join(''),
  _albums: () => $.albums.map(album => {
    Object.assign($, album)
    return $.html('album')
  }).join(''),
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
  $.lang = lang
  $.content = content(
    JSON.parse(fs.readFileSync(`lang/${lang}.json`, 'utf8'))
  )

  if (lang !== 'en') {
    fs.mkdirSync(`public/${lang}`)
  }

  fs.writeFileSync(`public/${lang !== 'en' ? `${lang}/` : ''}index.html`, $.html())
})
