// SPDX-License-Identifier: MIT-0
import fs from 'fs'
import content from './content.js'

const $ = {
  svg: (name) => fs.readFileSync(`public/images/${name}.svg`),
  html: (partial, params) => Function('$', `return \`${fs.readFileSync(`html/${partial}.html`, 'utf8')}\``)({...params, ...$}),
}

const languages = fs.readdirSync('lang').map(f => f.replace('.json', ''))
languages.forEach(lang => {
  if (lang !== 'en') {
    fs.mkdirSync(`public/${lang}`)
  }

  fs.writeFileSync(
    `public/${lang !== 'en' ? `${lang}/` : ''}index.html`,
    $.html('index', {
      lang,
      languages,
      ...content(JSON.parse(fs.readFileSync(`lang/${lang}.json`, 'utf8'))),
    }),
  )
})
