export default (t) => ({
  sections: [
    {
      id: 'music',
      title: t.section_titles.music,
      albums: [
        {
          title: 'Playground',
          image: 'playground-cover.jpeg',
          year: 2026,
        },
        {
          title: 'Digital Shorts EP',
          image: 'digital-shorts-cover.jpg',
          year: 2016,
        },
        {
          title: 'There I',
          image: 'there-i-cover.jpg',
          year: 2016,
        },
      ],
    },
    {
      id: 'keyboard',
      title: t.section_titles.keyboard,
    },
    {
      id: 'apps',
      title: t.section_titles.apps,
      apps: [
        {
          name: 'MangoCodex',
          repo: 'mango-codex',
          image: 'codex.png',
        },
        {
          name: 'MangoTree',
          repo: 'mango-tree',
          image: 'tree.png',
        },
        {
          name: 'MangoCollage',
          repo: 'mango-collage',
          image: 'collage.png',
        },
        {
          name: 'MangoStrudel',
          repo: 'mango-strudel',
          image: 'strudel.png',
        },
      ],
    },
    {
      id: 'contact',
      title: t.section_titles.contact,
    },
  ],
})
