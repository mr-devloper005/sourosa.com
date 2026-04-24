'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { getFactoryState } from '@/design/factory/get-factory-state'

export function PageShell({
  title,
  description,
  actions,
  children,
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  const { recipe } = getFactoryState()
  const isCuration = recipe.primaryTask === 'sbm'

  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main>
        <section
          className={
            isCuration
              ? 'border-b border-[rgba(112,84,66,0.12)] bg-[linear-gradient(180deg,rgba(255,251,246,0.9)_0%,rgba(246,238,228,0.78)_100%)]'
              : 'border-b border-border bg-secondary/30'
          }
        >
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div className={isCuration ? 'paper-panel archive-grid rounded-[2rem] p-7' : ''}>
                <div className={isCuration ? 'editorial-label' : 'hidden'}>Quiet route, fully live</div>
                <h1 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">{title}</h1>
                {description && <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>}
              </div>
              {actions ? (
                <div className={isCuration ? 'paper-panel rounded-[2rem] p-5' : 'flex flex-wrap gap-3'}>
                  <div className={isCuration ? 'mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7c6456]' : 'hidden'}>
                    Search and filter
                  </div>
                  <div className="flex flex-wrap gap-3">{actions}</div>
                </div>
              ) : null}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          {children}
        </section>
      </main>
      <Footer />
    </div>
  )
}
