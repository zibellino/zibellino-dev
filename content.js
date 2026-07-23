export default (t) => ({
  sections: [
    {
      template: 'music',
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
      template: 'keyboard',
      title: t.section_titles.keyboard,
    },
    {
      template: 'apps',
      title: t.section_titles.apps,
      apps: [
        {
          name: 'MangoCodex',
          repo: 'mango-codex',
        },
        {
          name: 'MangoTree',
          repo: 'mango-tree',
        },
        {
          name: 'MangoStrudel',
          repo: 'mango-strudel',
        },
      ],
    },
    {
      template: 'contact',
      title: t.section_titles.contact,
    },
  ],
})
