"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  page: number;
  totalPages: number;
};

export default function Pagination({ page, totalPages }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(newPage));

    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="mt-6 flex items-center justify-center gap-4">
      <button
        disabled={page <= 1}
        onClick={() => changePage(page - 1)}
        className="rounded bg-black px-3 py-1 text-white disabled:opacity-40"
      >
        ←
      </button>
      <span className="text-sm">
        {page} / {totalPages}
      </span>
      <button
        disabled={page >= totalPages}
        onClick={() => changePage(page + 1)}
        className="rounded bg-black px-3 py-1 text-white disabled:opacity-40"
      >
        →
      </button>
    </div>
  );
}