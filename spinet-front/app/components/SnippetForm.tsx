"use client"

import { createSnippet, updateSnippet } from "../services/snippet_service";
import { Snippet, SnippetType } from "../interfaces/snippetInterfaces";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type SnippetFormProps = {
  mode: "create" | "edit";
  initialData?: Snippet;
};

export default function SnippetForm({
  mode,
  initialData,
}: SnippetFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [tags, setTags] = useState(initialData?.tags.join(", ") || "");
  const [type, setType] = useState<SnippetType>(initialData?.type || "note");

  const [errors, setErrors] = useState<{
    title?: string;
    content?: string;
    form?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (()=> {
    const newErrors: typeof errors = {};

    if (!title.trim()) {
      newErrors.title = "Title є обов’язковим";
    }

    if (!content.trim()) {
      newErrors.content = "Content є обов’язковим";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  })


const handleSubmit = (async (e: FormEvent)=> {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    const payload = {
      title: title.trim(),
      content: content.trim(),
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      type,
    };

    try {
      if (mode === "create") {
        await createSnippet(payload);
        setTitle("");
        setContent("");
        setTags("");
        setType("note");
        router.refresh();
      } else if (initialData?._id) {
        await updateSnippet(initialData._id, payload);
        router.push(`/snippets/${initialData._id}`);
        router.refresh();
      }
    } catch (error) {
      setErrors({
        form: error instanceof Error ? error.message : "Щось пішло не так",
      });
    } finally {
      setIsSubmitting(false);
    }
})


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border px-3 py-2 outline-none focus:ring"
          placeholder="Наприклад: NestJS pagination"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[120px] w-full rounded-xl border px-3 py-2 outline-none focus:ring"
          placeholder="Встав текст, команду або посилання"
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-500">{errors.content}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Tags</label>
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full rounded-xl border px-3 py-2 outline-none focus:ring"
          placeholder="react, nextjs, backend"
        />
        <p className="mt-1 text-xs text-gray-500">
          Вводь через кому
        </p>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as SnippetType)}
          className="w-full rounded-xl border px-3 py-2 outline-none focus:ring"
        >
          <option value="note">note</option>
          <option value="link">link</option>
          <option value="command">command</option>
        </select>
      </div>

      {errors.form && (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">
          {errors.form}
        </p>
      )}


<button
        type="submit"
        disabled={isSubmitting}
        className="rounded-xl bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {isSubmitting
          ? "Збереження..."
          : mode === "create"
          ? "Створити"
          : "Оновити"}
      </button>
    </form>
  );
}