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
import { REGISTER_PAGE_OVERRIDE_ENABLED, RegisterPageOverride } from '@/overrides/register-page'

function getRegisterConfig(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      shell: 'bg-[#f8fbff] text-slate-950',
      panel: 'border border-slate-200 bg-white',
      side: 'border border-slate-200 bg-slate-50',
      muted: 'text-slate-600',
      action: 'bg-slate-950 text-white hover:bg-slate-800',
      icon: Building2,
      title: 'Create a business-ready account',
      body: 'List services, manage locations, and activate trust signals with a proper directory workflow.',
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
      title: 'Start your contributor workspace',
      body: 'Create a profile for essays, issue drafts, editorial review, and publication scheduling.',
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
      title: 'Set up your creator profile',
      body: 'Launch a visual-first account with gallery publishing, identity surfaces, and profile-led discovery.',
    }
  }
  return {
    shell: 'bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4]',
    side: 'border border-[#e8dbce] bg-[#f3e8db]',
    muted: 'text-[#71574a]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
    icon: Bookmark,
    title: 'Create a curator account',
    body: 'Build shelves, save references, and connect collections to your profile without a generic feed setup.',
  }
}

export default function RegisterPage() {
  if (REGISTER_PAGE_OVERRIDE_ENABLED) {
    return <RegisterPageOverride />
  }

  const router = useRouter()
  const { signup, isLoading } = useAuth()
  const { toast } = useToast()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [focus, setFocus] = useState('')
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const config = getRegisterConfig(productKind)
  const Icon = config.icon

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!name.trim() || !email.trim() || !password.trim()) {
      toast({
        title: 'Missing details',
        description: 'Add your name, email, and password to create an account.',
      })
      return
    }

    try {
      await signup(name.trim(), email.trim(), password)
      router.push('/')
      router.refresh()
    } catch (error) {
      toast({
        title: 'Account creation failed',
        description: error instanceof Error ? error.message : 'Please try again.',
      })
    }
  }

  return (
    <div className={`min-h-screen ${config.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <section className="grid gap-8 lg:grid-cols-[0.94fr_1.06fr] lg:items-start">
          <div className="paper-panel archive-grid rounded-[2.35rem] p-8 sm:p-10">
            <div className="inline-flex items-center gap-3 rounded-full border border-[rgba(122,95,78,0.12)] bg-white/80 px-4 py-2 shadow-[0_10px_24px_rgba(88,56,39,0.06)]">
              <img src="/favicon.png?v=20260401" alt="Sourosa logo" width="28" height="28" className="h-7 w-7 object-contain" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7c6456]">New curator account</span>
            </div>

            <div className="mt-8 flex items-center gap-3 text-[#5b2b3b]">
              <Icon className="h-7 w-7" />
              <span className="text-sm font-semibold uppercase tracking-[0.24em]">Get started</span>
            </div>
            <h1 className="mt-5 max-w-xl text-4xl font-semibold tracking-[-0.05em] text-[#261811] sm:text-5xl">
              Start a profile that can save, organize, and publish with a calmer rhythm.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-[#71574a]">
              Create a bookmark-first account that feels aligned with the homepage: warmer surfaces, lighter discovery, and stronger emphasis on collections and public identity.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ['Collections', 'Save links into working shelves'],
                ['Identity', 'Connect every shelf to a profile'],
                ['Publishing', 'Move into live routes when needed'],
              ].map(([label, value]) => (
                <div key={label} className={`rounded-[1.5rem] p-4 ${config.side}`}>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] opacity-65">{label}</p>
                  <p className="mt-2 text-sm font-semibold leading-6">{value}</p>
                </div>
              ))}
            </div>

            <div className={`mt-8 rounded-[1.8rem] p-6 ${config.side}`}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] opacity-65">Designed for this site, not a generic template</p>
              <div className="mt-4 grid gap-3">
                {[
                  'Fresh onboarding copy focused on curation, public identity, and quieter workflows.',
                  'Layouts that stay visually consistent with the homepage instead of falling back to a default auth shell.',
                  'A simpler path into bookmarking, profile editing, and future publishing surfaces.',
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
                <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Create account</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#261811]">Build your first curation workspace</h2>
              </div>
              <img src="/favico.png" alt="Sourosa mark" width="48" height="48" className="h-12 w-12 rounded-2xl border border-[rgba(122,95,78,0.12)] bg-white/80 p-2 object-contain shadow-[0_12px_30px_rgba(88,56,39,0.08)]" />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className={`rounded-[1.4rem] p-4 ${config.side}`}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] opacity-65">Primary focus</p>
                <p className="mt-2 text-sm leading-7 text-[#71574a]">Bookmark shelves and saved references.</p>
              </div>
              <div className={`rounded-[1.4rem] p-4 ${config.side}`}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] opacity-65">Secondary focus</p>
                <p className="mt-2 text-sm leading-7 text-[#71574a]">Social profile presence and authored notes.</p>
              </div>
            </div>

            <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
              <label className="grid gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7c6456]">Full name</span>
                <input
                  className="h-12 rounded-[1rem] border border-[rgba(122,95,78,0.12)] bg-white/75 px-4 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] outline-none transition focus:border-[#8d6c5c] focus:ring-2 focus:ring-[rgba(91,43,59,0.12)]"
                  placeholder="Your name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7c6456]">Email address</span>
                <input
                  className="h-12 rounded-[1rem] border border-[rgba(122,95,78,0.12)] bg-white/75 px-4 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] outline-none transition focus:border-[#8d6c5c] focus:ring-2 focus:ring-[rgba(91,43,59,0.12)]"
                  placeholder="name@example.com"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7c6456]">Password</span>
                <input
                  className="h-12 rounded-[1rem] border border-[rgba(122,95,78,0.12)] bg-white/75 px-4 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] outline-none transition focus:border-[#8d6c5c] focus:ring-2 focus:ring-[rgba(91,43,59,0.12)]"
                  placeholder="Create a password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="new-password"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7c6456]">What will you curate?</span>
                <input
                  className="h-12 rounded-[1rem] border border-[rgba(122,95,78,0.12)] bg-white/75 px-4 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] outline-none transition focus:border-[#8d6c5c] focus:ring-2 focus:ring-[rgba(91,43,59,0.12)]"
                  placeholder="Research links, inspiration, tools, references..."
                  value={focus}
                  onChange={(event) => setFocus(event.target.value)}
                />
              </label>
              <button
                type="submit"
                disabled={isLoading}
                className={`mt-2 inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70 ${config.action}`}
              >
                {isLoading ? 'Creating account...' : 'Create workspace'}
              </button>
            </form>

            <div className={`mt-6 flex flex-wrap items-center justify-between gap-3 text-sm ${config.muted}`}>
              <span>Already have an account?</span>
              <Link href="/login" className="inline-flex items-center gap-2 font-semibold hover:underline">
                <Sparkles className="h-4 w-4" />
                Sign in
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
