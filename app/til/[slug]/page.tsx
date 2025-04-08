import Tag from "@/components/ui/tag";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function TILNote(props: Props) {
  const { slug } = await props.params;
  const {
    title,
    tags,
    default: MDXContent,
  } = await import(`@/notes/${slug}.mdx`);

  return (
    <div className="prose container mx-auto px-4 py-8">
      <h1>{title}</h1>
      {tags && (
        <p className="space-x-2">
          Tags:{" "}
          {tags.map((tag: string) => (
            <Tag key={tag} name={tag} />
          ))}
        </p>
      )}
      <MDXContent />
    </div>
  );
}
