export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'xfhogylmks',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Sourosa',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Curated profiles and saved references',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'A warm, bookmark-first network for public profiles, saved references, and quieter discovery across every live route.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'sourosa.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://sourosa.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

