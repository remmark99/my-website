import dynamic from 'next/dynamic'

interface Props {
  params: { slug: string }
}
//
// export async function generateStaticParams() {
//   return [
//     { slug: 'first' },
//     { slug: 'second' }
//   ]
// }

export default function TILNote({ params }: Props) {
  const MDXContent = dynamic(() => import(`@/notes/${params.slug}.mdx`), {
    loading: () => <p>Loading...</p>
  })

  return (
    <div className="prose container mx-auto px-4 py-8">
      <MDXContent />
    </div>
  )
}
