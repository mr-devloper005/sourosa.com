import { defineSiteTheme } from '@/config/site.theme.defaults'

export const SITE_THEME = defineSiteTheme({
  shell: 'editorial',
  hero: {
    variant: 'spotlight-split',
    eyebrow: 'Bookmark-first profile network',
  },
  home: {
    layout: 'editorial-rhythm',
    primaryTask: 'sbm',
    featuredTaskKeys: ['sbm', 'profile'],
  },
  navigation: {
    variant: 'editorial',
  },
  footer: {
    variant: 'editorial',
  },
  cards: {
    listing: 'catalog-grid',
    article: 'editorial-feature',
    image: 'studio-panel',
    profile: 'identity-portrait',
    classified: 'catalog-grid',
    pdf: 'catalog-grid',
    sbm: 'archive-note',
    social: 'archive-note',
    org: 'catalog-grid',
    comment: 'editorial-feature',
  },
})
