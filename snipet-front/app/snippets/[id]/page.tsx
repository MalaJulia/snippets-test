import SnippetForm from "../../components/SnippetForm";
import { getSnippetById } from "../../services/snippet_service";

type SnippetDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SnippetDetailsPage({
  params,
}: SnippetDetailsPageProps) {
  const { id } = await params;
  const snippet = await getSnippetById(id);

  return (
    <main className="mx-auto max-w-4xl p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Деталі snippet</h1>
      </div>

      <div className="mb-6 rounded-2xl border p-5">
        <h2 className="mb-2 text-xl font-semibold">{snippet.title}</h2>
        <p className="mb-4 whitespace-pre-wrap text-gray-700">
          {snippet.content}
        </p>

        <div className="mb-3 flex flex-wrap gap-2">
          {snippet.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-blue-50 px-2 py-1 text-sm text-blue-700"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="space-y-1 text-sm text-gray-500">
          <p>Type: {snippet.type}</p>
          <p>Created: {new Date(snippet.createdAt).toLocaleString()}</p>
          <p>Updated: {new Date(snippet.updatedAt).toLocaleString()}</p>
        </div>
      </div>

      <div className="rounded-2xl border p-5">
        <h2 className="mb-4 text-xl font-semibold">Редагування</h2>
        <SnippetForm mode="edit" initialData={snippet} />
      </div>
    </main>
  );
}