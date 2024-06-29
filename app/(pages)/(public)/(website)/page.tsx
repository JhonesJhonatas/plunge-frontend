'use client'

import { useEffect } from 'react'

import { redirect } from 'next/navigation'

export default function Home() {
  useEffect(() => {
    redirect('/login')
  }, [])

  return <span>Plunge WebSite</span>
}
