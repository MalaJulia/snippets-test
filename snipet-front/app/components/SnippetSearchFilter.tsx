"use client"


import { Snippet } from "../interfaces/snippetInterfaces";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

type SnippetListProps = {
  snippets: Snippet[];
  currentQuery: string;
  currentTag: string;
};

export default function SnippetSearchFilter({
  snippets,
  currentQuery,
  currentTag,
}: SnippetListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(currentQuery);
  const [tag, setTag] = useState(currentTag);


  const handleSearch = ((e: FormEvent)=> {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (q.trim()) {
      params.set("search", q.trim());
    } else {
      params.delete("search");
    }

    if (tag.trim()) {
      params.set("tags", tag.trim());
    } else {
      params.delete("tags");
    }

    params.set("page", "1");

    router.push(`/?${params.toString()}`)
  })


  function clearFilters() {
    setQ("");
    setTag("");
    router.push("/");
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex flex-col gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Пошук по title/content"
          className="rounded-xl border px-3 py-2"
        />

        <input
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Фільтр по тегу"
          className="rounded-xl border px-3 py-2"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="rounded-xl bg-black px-4 py-2 text-white"
          >
            Знайти
          </button>

          <button
            type="button"
            onClick={clearFilters}
            className="rounded-xl border px-4 py-2"
          >
            Очистити
          </button>
        </div>
      </form>

      {snippets.length === 0 ? (
        <div className="rounded-xl border border-dashed p-6 text-center text-gray-500">
          Нічого не знайдено
        </div>
      ) : (
        <div className="space-y-3">
          {snippets.map((snippet) => (
            <Link
              key={snippet._id}
              href={`/snippets/${snippet._id}`}
              className="block rounded-2xl border p-4 transition hover:shadow-md"
            >
              <div className="mb-2 flex items-center justify-between gap-4">
                <h3 className="font-semibold">{snippet.title}</h3>
                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">
                  {snippet.type}
                </span>
              </div>

              <p className="line-clamp-2 text-sm text-gray-600">
                {snippet.content}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {snippet.tags.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700"
                  >
                    #{item}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}