import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Saved links. Public identity. Quiet discovery.',
  },
  footer: {
    tagline: 'Bookmark shelves, curator notes, and live profile routes',
  },
  hero: {
    badge: 'Curator-ready surfaces',
    title: ['A bookmark library with', 'social profiles close behind.'],
    description:
      'Save, revisit, and browse references through calmer shelf-like layouts while public profile pages keep identity and trust visible across the wider platform.',
    primaryCta: {
      label: 'Open bookmark library',
      href: '/sbm',
    },
    secondaryCta: {
      label: 'Explore profiles',
      href: '/profile',
    },
    searchPlaceholder: 'Search links, curators, tags, and every live route',
    focusLabel: 'Focus lane',
    featureCardBadge: 'reference shelf',
    featureCardTitle: 'Collections stay primary while profiles reinforce who curated them.',
    featureCardDescription:
      'The visual system prioritizes saved resources and profile-backed discovery without changing any task or routing behavior under the hood.',
  },
  home: {
    metadata: {
      title: 'Curated bookmarks and social profiles',
      description:
        'Explore saved resources, curator-led collections, and public profile pages through a warm library-style interface that still keeps every route live.',
      openGraphTitle: 'Curated bookmarks and social profiles',
      openGraphDescription:
        'A bookmark-first product with public profiles, shelf-style collections, and quieter discovery across every live task route.',
      keywords: ['social bookmarking', 'public profiles', 'curated links', 'bookmark library', 'profile network'],
    },
    introBadge: 'How the product feels',
    introTitle: 'Built like a personal research desk, not a cloned feed or marketplace.',
    introParagraphs: [
      'The homepage behaves like a warm archive of saved references, where the bookmark library leads and public profile pages provide authorship, trust, and identity.',
      'Only the bookmark and profile lanes get strong visual emphasis in the main discovery surfaces, while the rest of the task system stays accessible through search, direct URLs, and quieter links.',
      'That keeps the product feeling intentional and distinct without removing any of the shared base functionality or routes.',
    ],
    sideBadge: 'Design intent',
    sidePoints: [
      'Bookmark-first homepage with shelf and note metaphors instead of generic feature blocks.',
      'Profile surfaces feel like identity dossiers, not repeated business cards.',
      'Other task routes remain live but intentionally quieter in discovery.',
      'Soft motion and layered paper panels keep the experience premium without extra weight.',
    ],
    primaryLink: {
      label: 'Browse bookmarks',
      href: '/sbm',
    },
    secondaryLink: {
      label: 'Meet curators',
      href: '/profile',
    },
  },
  cta: {
    badge: 'Start a shelf',
    title: 'Build a saved-link habit with profiles that make every collection feel authored.',
    description:
      'Open the bookmark library first, move into profile pages when you want authorship or context, and use search when you need the rest of the platform.',
    primaryCta: {
      label: 'Start Curating',
      href: '/register',
    },
    secondaryCta: {
      label: 'Browse Profiles',
      href: '/profile',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'Browse the newest posts in this section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles and notes',
    description: 'Read longer-form notes, explainers, and editorial context that complement the bookmark library.',
  },
  listing: {
    title: 'Listings and live routes',
    description: 'Explore structured listing pages that remain available in the wider system even though the main experience centers bookmarks and profiles.',
  },
  classified: {
    title: 'Classifieds and announcements',
    description: 'Browse time-sensitive posts and notices through a lower-emphasis but fully accessible route.',
  },
  image: {
    title: 'Images and visual posts',
    description: 'Browse visual posts and galleries that remain live alongside collections, notes, and public profiles.',
  },
  profile: {
    title: 'Social profiles and public identity pages',
    description: 'Discover public profile pages for curators, creators, and brands presented as identity-led surfaces.',
  },
  sbm: {
    title: 'Bookmark library and saved references',
    description: 'Browse saved links, collections, and research shelves through the primary discovery surface of the site.',
  },
  pdf: {
    title: 'PDFs and downloadable resources',
    description: 'Open documents and downloadable resources that stay reachable within the broader route system.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Listings, services, and structured pages',
    paragraphs: [
      'Listings remain available as part of the shared platform, even though they are not the main visual priority for this site.',
      'This route keeps structured service and brand pages accessible from direct URLs, search, and category browsing without collapsing the bookmark-first identity of the product.',
      'Use it when you want a more utility-led scan after starting in collections or public profiles.',
    ],
    links: [
      { label: 'Open bookmark library', href: '/sbm' },
      { label: 'View profiles', href: '/profile' },
      { label: 'Search all routes', href: '/search' },
    ],
  },
  article: {
    title: 'Articles, notes, and slower reading',
    paragraphs: [
      'Articles work here as supporting context for saved references, giving collections more narrative depth when a topic needs explanation.',
      'The presentation stays calmer and more editorial than the bookmark library, with room for longer reading and clearer text hierarchy.',
      'Use this route when you want deeper context after discovering something through a collection or profile.',
    ],
    links: [
      { label: 'Open bookmark library', href: '/sbm' },
      { label: 'Browse profiles', href: '/profile' },
      { label: 'Open PDFs', href: '/pdf' },
    ],
  },
  classified: {
    title: 'Classifieds, offers, and timely updates',
    paragraphs: [
      'Classified posts keep a faster-scanning, notice-board rhythm for offers, requests, and time-sensitive updates.',
      'They stay visually secondary to bookmarks and profiles, but the route remains fully accessible and compatible with the rest of the platform.',
      'Browse by category when you need urgency and move back into collections when you want slower curation.',
    ],
    links: [
      { label: 'Open bookmark library', href: '/sbm' },
      { label: 'View profiles', href: '/profile' },
      { label: 'Search all routes', href: '/search' },
    ],
  },
  image: {
    title: 'Image-led posts and visual stories',
    paragraphs: [
      'Images stay live as a supporting route for gallery-style posts, visual references, and media-led updates.',
      'Compared with the main bookmark surfaces, this route gives imagery more room and fewer annotation blocks so it feels intentionally separate.',
      'Use it when a topic is better understood through visuals before returning to profile pages or saved links.',
    ],
    links: [
      { label: 'Open bookmark library', href: '/sbm' },
      { label: 'Browse profiles', href: '/profile' },
      { label: 'Search all routes', href: '/search' },
    ],
  },
  profile: {
    title: 'Profiles, identities, and public pages',
    paragraphs: [
      'Profiles act as identity anchors for the site, showing who saved, published, or stands behind a collection.',
      'These pages intentionally feel different from bookmark shelves: more portrait-led, more personal, and more focused on trust signals and authorship.',
      'Browse profiles when you want to understand the person, brand, or curator behind a set of saved resources.',
    ],
    links: [
      { label: 'Open bookmark library', href: '/sbm' },
      { label: 'Search all routes', href: '/search' },
      { label: 'Browse images', href: '/images' },
    ],
  },
  sbm: {
    title: 'Curated links and bookmarked resources',
    paragraphs: [
      'This is the primary lane of the product: saved links, references, tools, and collections arranged more like shelves and notes than a generic card grid.',
      'Bookmarks stay connected to the rest of the platform, so you can jump from a saved resource into profiles, articles, or quieter routes without losing your place.',
      'Use this section to build repeatable research habits, revisit useful links, and discover who is curating what.',
    ],
    links: [
      { label: 'Explore profiles', href: '/profile' },
      { label: 'Search everything', href: '/search' },
      { label: 'Open PDFs', href: '/pdf' },
    ],
  },
  pdf: {
    title: 'PDFs, documents, and downloadable files',
    paragraphs: [
      'The PDF library hosts downloadable documents that support the broader collection and profile ecosystem.',
      'It remains part of the live route system, giving document-style resources a quieter but still polished surface.',
      'Browse by category when you need files and reports, then return to bookmarks or profiles for context and attribution.',
    ],
    links: [
      { label: 'Open bookmark library', href: '/sbm' },
      { label: 'Explore profiles', href: '/profile' },
      { label: 'Search all routes', href: '/search' },
    ],
  },
  social: {
    title: 'Short updates and community signals',
    paragraphs: [
      'Short updates add lightweight signals around active collections and identities.',
      'They work best as small supporting surfaces around bookmarks, profiles, and documents rather than as a dominant feed.',
      'Use them as quick context before moving into deeper saved resources or authored pages.',
    ],
    links: [
      { label: 'Open bookmark library', href: '/sbm' },
      { label: 'Browse profiles', href: '/profile' },
      { label: 'View PDFs', href: '/pdf' },
    ],
  },
  comment: {
    title: 'Comments and contextual responses',
    paragraphs: [
      'Comments keep discussion close to the posts they belong to and provide lighter supporting context for longer-form content.',
      'They remain part of the system without competing visually with the bookmark library or identity-led profile pages.',
      'Use comments to add perspective, then move back into collections, profiles, or related reading.',
    ],
    links: [
      { label: 'Explore articles', href: '/articles' },
      { label: 'Open bookmark library', href: '/sbm' },
      { label: 'Browse profiles', href: '/profile' },
    ],
  },
  org: {
    title: 'Organizations, teams, and structured entities',
    paragraphs: [
      'Organization pages provide structured identity surfaces for teams, brands, communities, and agencies.',
      'They remain accessible in the platform as a lower-emphasis route that complements the more personal social profile layer.',
      'Connect these pages with related collections and resources when you need a broader institutional view.',
    ],
    links: [
      { label: 'Open bookmark library', href: '/sbm' },
      { label: 'Browse profiles', href: '/profile' },
      { label: 'PDF library', href: '/pdf' },
    ],
  },
}
