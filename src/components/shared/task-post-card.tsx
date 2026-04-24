import { ContentImage } from '@/components/shared/content-image'
import Link from 'next/link'
import { ArrowUpRight, ExternalLink, FileText, Mail, MapPin, Tag } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import type { TaskKey } from '@/lib/site-config'
import { SITE_THEME } from '@/config/site.theme'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { TASK_POST_CARD_OVERRIDE_ENABLED, TaskPostCardOverride } from '@/overrides/task-post-card'

type ListingContent = {
  location?: string
  category?: string
  description?: string
  email?: string
}

const stripHtml = (value?: string | null) =>
  (value || '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<\/?[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const getExcerpt = (value?: string | null, maxLength = 140) => {
  const text = stripHtml(value)
  if (!text) return ''
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trimEnd()}…`
}

const getContent = (post: SitePost): ListingContent => {
  const content = post.content && typeof post.content === 'object' ? post.content : {}
  return content as ListingContent
}

const getImageUrl = (post: SitePost, content: ListingContent) => {
  const media = Array.isArray(post.media) ? post.media : []
  const mediaUrl = media[0]?.url
  if (mediaUrl) return mediaUrl

  const contentAny = content as Record<string, unknown>
  const contentImage = typeof contentAny.image === 'string' ? contentAny.image : null
  if (contentImage) return contentImage

  const contentImages = Array.isArray(contentAny.images) ? contentAny.images : []
  const firstImage = contentImages.find((value) => typeof value === 'string')
  if (firstImage) return firstImage as string

  const contentLogo = typeof contentAny.logo === 'string' ? contentAny.logo : null
  if (contentLogo) return contentLogo

  return '/placeholder.svg?height=640&width=960'
}

const cardStyles = {
  'listing-elevated': {
    frame: 'rounded-[1.9rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] hover:-translate-y-1 hover:shadow-[0_28px_75px_rgba(15,23,42,0.14)]',
    muted: 'text-slate-600',
    title: 'text-slate-950',
    badge: 'bg-slate-950 text-white',
  },
  'editorial-feature': {
    frame: 'rounded-[1.9rem] border border-[rgba(125,83,45,0.12)] bg-[linear-gradient(180deg,#fffbf7_0%,#f7eee3_100%)] shadow-[0_18px_55px_rgba(89,52,24,0.1)] hover:-translate-y-1 hover:shadow-[0_26px_75px_rgba(89,52,24,0.14)]',
    muted: 'text-[#71584b]',
    title: 'text-[#2b1d17]',
    badge: 'bg-[#2b1d17] text-[#fff3df]',
  },
  'studio-panel': {
    frame: 'rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(7,17,31,0.96),rgba(12,23,43,0.96))] text-white shadow-[0_24px_80px_rgba(15,23,42,0.35)] hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(15,23,42,0.42)]',
    muted: 'text-slate-300',
    title: 'text-white',
    badge: 'bg-[#8df0c8] text-[#07111f]',
  },
  'catalog-grid': {
    frame: 'rounded-[1.8rem] border border-[rgba(67,78,41,0.14)] bg-[#f8faf1] shadow-[0_18px_58px_rgba(55,65,31,0.1)] hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(55,65,31,0.14)]',
    muted: 'text-[#5b664c]',
    title: 'text-[#1f2617]',
    badge: 'bg-[#1f2617] text-[#edf5dc]',
  },
  'archive-note': {
    frame:
      'rounded-[2rem] border border-[rgba(120,92,75,0.14)] bg-[linear-gradient(180deg,rgba(255,251,246,0.96),rgba(246,238,228,0.94))] shadow-[0_22px_72px_rgba(88,56,39,0.09)] hover:-translate-y-1 hover:shadow-[0_28px_82px_rgba(88,56,39,0.14)]',
    muted: 'text-[#6e5547]',
    title: 'text-[#241711]',
    badge: 'bg-[#4d2f27] text-[#fff4e8]',
  },
  'identity-portrait': {
    frame:
      'rounded-[2rem] border border-[rgba(122,95,78,0.14)] bg-[linear-gradient(180deg,rgba(255,251,246,0.96),rgba(246,238,228,0.94))] shadow-[0_24px_80px_rgba(88,56,39,0.1)] hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(88,56,39,0.16)]',
    muted: 'text-[#71574a]',
    title: 'text-[#261811]',
    badge: 'bg-[rgba(255,255,255,0.86)] text-[#261811]',
  },
} as const

const getVariantForTask = (taskKey: TaskKey) => SITE_THEME.cards[taskKey] || 'listing-elevated'

export function TaskPostCard({
  post,
  href,
  taskKey,
  compact,
}: {
  post: SitePost
  href: string
  taskKey?: TaskKey
  compact?: boolean
}) {
  if (TASK_POST_CARD_OVERRIDE_ENABLED) {
    return <TaskPostCardOverride post={post} href={href} taskKey={taskKey} compact={compact} />
  }

  const content = getContent(post)
  const image = getImageUrl(post, content)
  const rawCategory = content.category || post.tags?.[0] || 'Post'
  const normalizedCategory = normalizeCategory(rawCategory)
  const category = CATEGORY_OPTIONS.find((item) => item.slug === normalizedCategory)?.name || rawCategory
  const variant = taskKey || 'listing'
  const visualVariant = cardStyles[getVariantForTask(variant)]
  const isBookmarkVariant = variant === 'sbm' || variant === 'social'
  const imageAspect = variant === 'image' ? 'aspect-[4/5]' : variant === 'article' ? 'aspect-[16/10]' : variant === 'pdf' ? 'aspect-[4/5]' : variant === 'classified' ? 'aspect-[16/11]' : 'aspect-[4/3]'
  const altText = `${post.title} ${category} ${variant === 'listing' ? 'business listing' : variant} image`
  const imageSizes = variant === 'article' ? '(max-width: 640px) 90vw, (max-width: 1024px) 48vw, 420px' : variant === 'image' ? '(max-width: 640px) 82vw, (max-width: 1024px) 34vw, 320px' : '(max-width: 640px) 85vw, (max-width: 1024px) 42vw, 340px'

  const { recipe } = getFactoryState()
  const isDirectoryProduct = recipe.homeLayout === 'listing-home' || recipe.homeLayout === 'classified-home'
  const isDirectorySurface = isDirectoryProduct && (variant === 'listing' || variant === 'classified' || variant === 'profile')

  if (isDirectorySurface) {
    const cardTone = recipe.brandPack === 'market-utility'
      ? {
          frame: 'rounded-[1.75rem] border border-[#d7deca] bg-white shadow-[0_18px_44px_rgba(64,76,34,0.08)] hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(64,76,34,0.14)]',
          badge: 'bg-[#1f2617] text-[#edf5dc]',
          muted: 'text-[#5b664c]',
          title: 'text-[#1f2617]',
          cta: 'text-[#1f2617]',
        }
      : {
          frame: 'rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_18px_44px_rgba(15,23,42,0.08)] hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(15,23,42,0.14)]',
          badge: 'bg-slate-950 text-white',
          muted: 'text-slate-600',
          title: 'text-slate-950',
          cta: 'text-slate-950',
        }

    return (
      <Link href={href} className={`group flex h-full flex-col overflow-hidden transition duration-300 ${cardTone.frame}`}>
        <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
          <ContentImage src={image} alt={altText} fill sizes={imageSizes} quality={75} className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" intrinsicWidth={960} intrinsicHeight={720} />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
            <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${cardTone.badge}`}>
              <Tag className="h-3.5 w-3.5" />
              {category}
            </span>
            <span className="rounded-full bg-white/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-900">
              {variant === 'classified' ? 'Open now' : 'Verified'}
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className={`line-clamp-2 text-xl font-semibold leading-snug ${cardTone.title}`}>{post.title}</h3>
            <ArrowUpRight className={`h-5 w-5 shrink-0 ${cardTone.muted}`} />
          </div>
          <p className={`mt-3 line-clamp-3 text-sm leading-7 ${cardTone.muted}`}>{getExcerpt(content.description || post.summary) || 'Explore this local listing.'}</p>
          <div className="mt-5 flex flex-wrap gap-3 text-xs">
            {content.location ? <span className={`inline-flex items-center gap-1 ${cardTone.muted}`}><MapPin className="h-3.5 w-3.5" />{content.location}</span> : null}
            {content.email ? <span className={`inline-flex items-center gap-1 ${cardTone.muted}`}><Mail className="h-3.5 w-3.5" />{content.email}</span> : null}
          </div>
          <div className={`mt-auto pt-5 text-sm font-semibold ${cardTone.cta}`}>{variant === 'classified' ? 'View offer' : 'View details'}</div>
        </div>
      </Link>
    )
  }

  if (isBookmarkVariant) {
    return (
      <Link href={href} className={`group relative flex h-full flex-col overflow-hidden p-5 transition duration-300 ${visualVariant.frame}`}>
        <div className="absolute right-4 top-4 h-16 w-16 rounded-full bg-[radial-gradient(circle,rgba(184,154,132,0.18),transparent_68%)]" />
        <div className="flex items-start gap-4">
          <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] bg-[#4d2f27] text-[#fff4e8] shadow-[0_12px_28px_rgba(77,47,39,0.18)] transition group-hover:scale-105">
            <ExternalLink className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${visualVariant.badge}`}>
                <Tag className="h-3.5 w-3.5" />
                {category}
              </span>
              {content.location ? <span className={`inline-flex items-center gap-1 text-xs ${visualVariant.muted}`}><MapPin className="h-3.5 w-3.5" />{content.location}</span> : null}
            </div>
            <p className={`mt-4 text-[10px] font-semibold uppercase tracking-[0.26em] ${visualVariant.muted}`}>Saved reference</p>
            <h3 className={`mt-2 line-clamp-2 text-[1.35rem] font-semibold leading-snug tracking-[-0.03em] group-hover:opacity-85 ${visualVariant.title}`}>{post.title}</h3>
            <p className={`mt-3 line-clamp-4 text-sm leading-7 ${visualVariant.muted}`}>{getExcerpt(content.description || post.summary, compact ? 120 : 210) || 'Explore this bookmark.'}</p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 border-t border-[rgba(122,95,78,0.12)] pt-4">
          <div className="flex flex-wrap gap-2">
            {post.tags?.slice(0, 2).map((tag) => (
              <span key={tag} className="rounded-full border border-[rgba(120,92,75,0.14)] bg-white/72 px-3 py-1 text-[11px] font-medium text-[#6f5749]">
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between gap-3">
            {content.email ? <div className={`inline-flex items-center gap-1 text-xs ${visualVariant.muted}`}><Mail className="h-3.5 w-3.5" />{content.email}</div> : <span className={`text-xs ${visualVariant.muted}`}>Library shelf</span>}
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4d2f27]">Open note</span>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'profile') {
    return (
      <Link href={href} className={`group flex h-full flex-col overflow-hidden transition duration-300 ${visualVariant.frame}`}>
        <div className="relative aspect-[5/4] overflow-hidden bg-[#efe3d8]">
          <ContentImage src={image} alt={altText} fill sizes={imageSizes} quality={75} className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" intrinsicWidth={960} intrinsicHeight={720} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3f271d]/25 via-transparent to-transparent opacity-90" />
          <span className="absolute left-4 top-4 rounded-full bg-white/86 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#261811] backdrop-blur">
            Social profile
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className={`line-clamp-2 text-xl font-semibold leading-snug tracking-[-0.03em] ${visualVariant.title}`}>{post.title}</h3>
              <p className={`mt-2 text-xs uppercase tracking-[0.2em] ${visualVariant.muted}`}>{category}</p>
            </div>
            <ArrowUpRight className={`mt-1 h-5 w-5 shrink-0 ${visualVariant.muted}`} />
          </div>
          <p className={`mt-4 line-clamp-3 text-sm leading-7 ${visualVariant.muted}`}>{getExcerpt(content.description || post.summary, compact ? 120 : 165) || 'Explore this profile.'}</p>
          <div className="mt-5 grid gap-3 rounded-[1.2rem] border border-[rgba(122,95,78,0.12)] bg-white/72 p-3">
            <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.2em]">
              <span className={visualVariant.muted}>Identity layer</span>
              <span className="text-[#8b6c5b]">Profile route</span>
            </div>
            <div className="flex items-center justify-between gap-3 pt-1 text-xs">
              {content.location ? <span className={`inline-flex items-center gap-1 ${visualVariant.muted}`}><MapPin className="h-3.5 w-3.5" />{content.location}</span> : <span className={visualVariant.muted}>Authorship surface</span>}
              <span className="rounded-full bg-[#f3e8db] px-3 py-1 text-[#261811]">View profile</span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={href} className={`group flex h-full flex-col overflow-hidden transition duration-300 ${visualVariant.frame}`}>
      <div className={`relative ${imageAspect} overflow-hidden bg-[#ede2dc]`}>
        <ContentImage src={image} alt={altText} fill sizes={imageSizes} quality={75} className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" intrinsicWidth={960} intrinsicHeight={720} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-80" />
        <span className={`absolute left-4 top-4 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${visualVariant.badge}`}>
          <Tag className="h-3.5 w-3.5" />
          {category}
        </span>
        {variant === 'pdf' && <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/88 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-950 shadow"><FileText className="h-3.5 w-3.5" />PDF</span>}
      </div>
      <div className={`flex flex-1 flex-col p-5 ${compact ? 'py-4' : ''}`}>
        <h3 className={`line-clamp-2 font-semibold leading-snug ${variant === 'article' ? 'text-[1.35rem]' : 'text-lg'} ${visualVariant.title}`}>{post.title}</h3>
        <p className={`mt-3 text-sm leading-7 ${variant === 'article' ? 'line-clamp-4' : 'line-clamp-3'} ${visualVariant.muted}`}>{getExcerpt(content.description || post.summary) || 'Explore this post.'}</p>
        <div className="mt-auto pt-4">
          {content.location && <div className={`inline-flex items-center gap-1 text-xs ${visualVariant.muted}`}><MapPin className="h-3.5 w-3.5" />{content.location}</div>}
          {content.email && <div className={`mt-2 inline-flex items-center gap-1 text-xs ${visualVariant.muted}`}><Mail className="h-3.5 w-3.5" />{content.email}</div>}
        </div>
      </div>
    </Link>
  )
}
