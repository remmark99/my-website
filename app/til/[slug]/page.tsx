import dynamic from 'next/dynamic'

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function TILNote(props: Props) {
  const { slug } = await props.params;

  const MDXContent = dynamic(() => import(`@/notes/${slug}.mdx`), {
    loading: () => <p>Loading...</p>
  })

  return (
    <div className="prose container mx-auto px-4 py-8">
      <MDXContent />
    </div>
  )
}
