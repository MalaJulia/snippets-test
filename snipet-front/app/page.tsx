import { getSnippets } from "./services/snippet_service";
import SnippetForm from "./components/SnippetForm";
import SnippetSearchFilter from "./components/SnippetSearchFilter";
import Pagination from "./components/Pagination";

type HomePageProps = {
  searchParams?: Promise<{
    search?: string;
    tags?: string;
    page?: string;
  }>;
};


export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;

  const search = params?.search || "";
  const tags = params?.tags || "";
  const page = Number(params?.page || 1);

  const data = await getSnippets({
    search,
    tags,
    page,
    limit: 5,
  });

  return (
    <main className="mx-auto min-h-screen max-w-6xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Snippet Manager</h1>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Створити snippet</h2>
          <SnippetForm mode="create" />
        </section>

        <section className="rounded-2xl border p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Список snippet-ів</h2>
          <SnippetSearchFilter
            snippets={data.items || data}
            currentQuery={search}
            currentTag={tags}
          />
        </section>
      </div>
      <Pagination page={page} totalPages={data.totalPages || 1}/>
    </main>
  );
}
