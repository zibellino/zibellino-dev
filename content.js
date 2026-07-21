export default {
  sections: [ // $.sections() calls /html/sections/<key>.html for each key
    {
      template: 'music',
      title: { // ideally either $.title or $.title() should resolve for each pang
        en: 'Music',
        de: 'Musik',
        it: 'Musica',
        hu: 'Zene',
      },
      albums: [ // $.albums() calls /html/album.html for each element
        {
          title: 'Playground', // no translations
        }
      ],
    },
  ],
}