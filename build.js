// SPDX-License-Identifier: MIT-0
import fs from 'fs'
import path from 'path'
import content from './content.js'

const languages = fs.readdirSync('lang').map(f => f.replace('.json', ''))

const $ = {
  svg: (name) => fs.readFileSync(`public/images/${name}.svg`),
  html: (partial, params) => Function('$', `return \`${fs.readFileSync(`html/${partial}.html`, 'utf8')}\``)({...params, ...$),
  langLinks: () => languages.map(
    lang => $.html('anchor', {
      href: `/${lang !== 'en' ? lang : ''}`,
      text: lang.toUpperCase(),
      rel: 'alternate',
      hreflang: lang,
    })
  ).join(''),
}

languages.forEach(lang => {
  $.lang = lang
  const page = content(
    JSON.parse(fs.readFileSync(`lang/${lang}.json`, 'utf8'))
  )

  if (lang !== 'en') {
    fs.mkdirSync(`public/${lang}`)
  }

  fs.writeFileSync(`public/${lang !== 'en' ? `${lang}/` : ''}index.html`, $.html('index', page))
})
