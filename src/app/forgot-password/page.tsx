"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, ArrowLeft, CheckCircle, Bookmark, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NavbarShell } from "@/components/shared/navbar-shell"
import { Footer } from "@/components/shared/footer"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <section className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="paper-panel archive-grid rounded-[2.35rem] p-8 sm:p-10"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-[rgba(122,95,78,0.12)] bg-white/80 px-4 py-2 shadow-[0_10px_24px_rgba(88,56,39,0.06)]">
              <img src="/favicon.png?v=20260401" alt="Sourosa logo" width="28" height="28" className="h-7 w-7 object-contain" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7c6456]">Account recovery</span>
            </div>

            <div className="mt-8 flex items-center gap-3 text-[#5b2b3b]">
              <Bookmark className="h-7 w-7" />
              <span className="text-sm font-semibold uppercase tracking-[0.24em]">Keep access simple</span>
            </div>
            <h1 className="mt-5 max-w-xl text-4xl font-semibold tracking-[-0.05em] text-[#261811] sm:text-5xl">
              Recover your workspace without leaving the calmer shelf-first experience.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-[#71574a]">
              This recovery page keeps the same warm visual system as the homepage and auth flow, so even account help feels like part of the product instead of a detached utility page.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ['Fast reset', 'Request a recovery link in one step'],
                ['Same tone', 'No jarring switch to a different UI'],
                ['Clear path', 'Back to sign in as soon as you are ready'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[1.5rem] border border-[rgba(122,95,78,0.12)] bg-[#f3e8db] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8b6c5b]">{label}</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-[#261811]">{value}</p>
                </div>
              ))}
            </div>

            <Link
              href="/login"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#5b2b3b] hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to login
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="paper-panel rounded-[2.35rem] p-8 sm:p-10"
          >
            {!isSubmitted ? (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#7c6456]">Reset password</p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#261811]">Send a recovery link</h2>
                  </div>
                  <img src="/favico.png" alt="Sourosa mark" width="48" height="48" className="h-12 w-12 rounded-2xl border border-[rgba(122,95,78,0.12)] bg-white/80 p-2 object-contain shadow-[0_12px_30px_rgba(88,56,39,0.08)]" />
                </div>

                <p className="mt-4 max-w-2xl text-sm leading-8 text-[#71574a]">
                  Enter the email tied to your account and we will simulate sending a reset link while preserving the existing page behavior.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 grid gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7c6456]">
                      Email address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8b6c5b]" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 rounded-[1rem] border-[rgba(122,95,78,0.12)] bg-white/75 pl-12"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="h-12 w-full bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]" disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send reset link"}
                  </Button>
                </form>

                <div className="mt-6 rounded-[1.4rem] border border-[rgba(122,95,78,0.12)] bg-[#fff8ef] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8b6c5b]">Helpful note</p>
                  <p className="mt-2 text-sm leading-7 text-[#71574a]">
                    If you remember your password after all, you can head straight back to sign in without losing your place.
                  </p>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(143,190,160,0.24)]">
                  <CheckCircle className="h-8 w-8 text-[#4c7b67]" />
                </div>
                <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#261811]">Check your email</h2>
                <p className="mt-4 text-sm leading-8 text-[#71574a]">
                  We&apos;ve sent a password reset link to <strong>{email}</strong>
                </p>
                <div className="mt-8 grid gap-3">
                  <Button asChild className="h-12 bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]">
                    <Link href="/login">Back to login</Link>
                  </Button>
                  <Button asChild variant="outline" className="h-12">
                    <Link href="/register">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Create a new account
                    </Link>
                  </Button>
                </div>
                <p className="mt-6 text-sm text-[#71574a]">
                  Didn&apos;t receive the email?{" "}
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="font-semibold text-[#5b2b3b] hover:underline"
                  >
                    Try again
                  </button>
                </p>
              </motion.div>
            )}
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
