'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Bookmark, Building2, FileText, Image as ImageIcon, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/components/ui/use-toast'
import { LOGIN_PAGE_OVERRIDE_ENABLED, LoginPageOverride } from '@/overrides/login-page'

function getLoginConfig(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      shell: 'bg-[#f8fbff] text-slate-950',
      panel: 'border border-slate-200 bg-white',
      side: 'border border-slate-200 bg-slate-50',
      muted: 'text-slate-600',
      action: 'bg-slate-950 text-white hover:bg-slate-800',
      icon: Building2,
      title: 'Access your business dashboard',
      body: 'Manage listings, verification details, contact info, and local discovery surfaces from one place.',
    }
  }
  if (kind === 'editorial') {
    return {
      shell: 'bg-[#fbf6ee] text-[#241711]',
      panel: 'border border-[#dcc8b7] bg-[#fffdfa]',
      side: 'border border-[#e6d6c8] bg-[#fff4e8]',
      muted: 'text-[#6e5547]',
      action: 'bg-[#241711] text-[#fff1e2] hover:bg-[#3a241b]',
      icon: FileText,
      title: 'Sign in to your publication workspace',
      body: 'Draft, review, and publish long-form work with the calmer reading system intact.',
    }
  }
  if (kind === 'visual') {
    return {
      shell: 'bg-[#07101f] text-white',
      panel: 'border border-white/10 bg-white/6',
      side: 'border border-white/10 bg-white/5',
      muted: 'text-slate-300',
      action: 'bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
      icon: ImageIcon,
      title: 'Enter the creator workspace',
      body: 'Open your visual feed, creator profile, and publishing tools without dropping into a generic admin shell.',
    }
  }
  return {
    shell: 'bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4]',
    side: 'border border-[#e8dbce] bg-[#f3e8db]',
    muted: 'text-[#71574a]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
    icon: Bookmark,
    title: 'Open your curated collections',
    body: 'Manage saved resources, collection notes, and curator identity from a calmer workspace.',
  }
}

export default function LoginPage() {
  if (LOGIN_PAGE_OVERRIDE_ENABLED) {
    return <LoginPageOverride />
  }

  const router = useRouter()
  const { login, isLoading } = useAuth()
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const config = getLoginConfig(productKind)
  const Icon = config.icon

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!email.trim() || !password.trim()) {
      toast({
        title: 'Missing details',
        description: 'Enter both your email and password to sign in.',
      })
      return
    }

    try {
      await login(email.trim(), password)
      router.push('/')
      router.refresh()
    } catch (error) {
      toast({
        title: 'Sign in failed',
        description: error instanceof Error ? error.message : 'Please try again.',
      })
    }
  }

  return (
    <div className={`min-h-screen ${config.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <section className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="paper-panel archive-grid rounded-[2.35rem] p-8 sm:p-10">
            <div className="inline-flex items-center gap-3 rounded-full border border-[rgba(122,95,78,0.12)] bg-white/80 px-4 py-2 shadow-[0_10px_24px_rgba(88,56,39,0.06)]">
              <img src="/favicon.png?v=20260401" alt="Sourosa logo" width="28" height="28" className="h-7 w-7 object-contain" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7c6456]">Curator workspace</span>
            </div>

            <div className="mt-8 flex items-center gap-3 text-[#5b2b3b]">
              <Icon className="h-7 w-7" />
              <span className="text-sm font-semibold uppercase tracking-[0.24em]">Welcome back</span>
            </div>
            <h1 className="mt-5 max-w-xl text-4xl font-semibold tracking-[-0.05em] text-[#261811] sm:text-5xl">
              Return to your saved shelves, profile notes, and working collections.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-[#71574a]">
              Open the same warmer curation workspace you see on the homepage, with bookmark-first tools, identity-backed notes, and quieter navigation that keeps the product focused.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ['Shelf-ready', 'Collections stay at the center'],
                ['Profile-backed', 'Identity and trust stay visible'],
                ['Low-noise', 'Faster return to active work'],
              ].map(([label, value]) => (
                <div key={label} className={`rounded-[1.5rem] p-4 ${config.side}`}>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] opacity-65">{label}</p>
                  <p className="mt-2 text-sm font-semibold leading-6">{value}</p>
                </div>
              ))}
            </div>

            <div className={`mt-8 rounded-[1.8rem] p-6 ${config.side}`}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] opacity-65">What opens after sign in</p>
              <div className="mt-4 grid gap-3">
                {[
                  'Pick up unfinished bookmark collections without hunting through a generic dashboard.',
                  'Return to public profile editing with the same warm visual tone as the rest of the site.',
                  'Move into creation, saved links, and quieter routes from one consistent surface.',
                ].map((item) => (
                  <div key={item} className="rounded-[1.25rem] border border-current/10 bg-white/55 px-4 py-3 text-sm leading-7 text-[#71574a]">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`paper-panel rounded-[2.35rem] p-8 sm:p-10 ${config.panel}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Sign in</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#261811]">Continue where you left off</h2>
              </div>
              <img src="/favico.png" alt="Sourosa mark" width="48" height="48" className="h-12 w-12 rounded-2xl border border-[rgba(122,95,78,0.12)] bg-white/80 p-2 object-contain shadow-[0_12px_30px_rgba(88,56,39,0.08)]" />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className={`rounded-[1.4rem] p-4 ${config.side}`}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] opacity-65">Main lane</p>
                <p className="mt-2 text-sm leading-7 text-[#71574a]">Bookmark library and saved references stay primary.</p>
              </div>
              <div className={`rounded-[1.4rem] p-4 ${config.side}`}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] opacity-65">Support lane</p>
                <p className="mt-2 text-sm leading-7 text-[#71574a]">Profiles, notes, and live routes stay one click away.</p>
              </div>
            </div>

            <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
              <label className="grid gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7c6456]">Email address</span>
                <input
                  className="h-12 rounded-[1rem] border border-[rgba(122,95,78,0.12)] bg-white/75 px-4 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] outline-none transition focus:border-[#8d6c5c] focus:ring-2 focus:ring-[rgba(91,43,59,0.12)]"
                  placeholder="name@example.com"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>
              <label className="grid gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7c6456]">Password</span>
                <input
                  className="h-12 rounded-[1rem] border border-[rgba(122,95,78,0.12)] bg-white/75 px-4 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] outline-none transition focus:border-[#8d6c5c] focus:ring-2 focus:ring-[rgba(91,43,59,0.12)]"
                  placeholder="Enter your password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </label>
              <button
                type="submit"
                disabled={isLoading}
                className={`mt-2 inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70 ${config.action}`}
              >
                {isLoading ? 'Signing in...' : 'Open workspace'}
              </button>
            </form>

            <div className={`mt-6 flex flex-wrap items-center justify-between gap-3 text-sm ${config.muted}`}>
              <Link href="/forgot-password" className="hover:underline">Forgot password?</Link>
              <Link href="/register" className="inline-flex items-center gap-2 font-semibold hover:underline">
                <Sparkles className="h-4 w-4" />
                Create account
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
