export default (t) => ({
  sections: [
    {
      id: 'music',
      title: t.section_titles.music,
      albums: [
        {
          title: 'Playground',
          image: 'playground-placeholder-cover.png',
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
