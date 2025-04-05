import Link from 'next/link'
import React from 'react'

const links = [
  {
    title: "First note",
    url: "/first"
  }
]

export default function TILPage() {
  return (
    <div>{
      links.map((link) => <Link key={link.url} href={`til/${link.url}`}>{link.title}</Link>)
    }</div>
  )
}

