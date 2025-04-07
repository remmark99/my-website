import Link from 'next/link'
import React from 'react'

const links = [
  {
    title: "First note",
    url: "/first"
  },
  {
    title: "Daemonizing Node apps",
    url: "/daemonizing-node-apps"
  }
]

export default function TILPage() {
  return (
    <div className='flex flex-col'>{
      links.map((link) => <Link key={link.url} href={`til/${link.url}`}>{link.title}</Link>)
    }</div>
  )
}

