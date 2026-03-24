"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import type { JobOfferDocument } from "@/prismicio-types";
import JobGrid from "./JobGrid";

const PAGE_SIZE = 9;

interface Props {
  jobs: JobOfferDocument[];
  allTags: string[];
}

export default function OffresClient({ jobs, allTags }: Props) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!activeTag) return jobs;
    return jobs.filter((job) =>
      job.data.tags.some(
        (t) => t.tag?.toLowerCase() === activeTag.toLowerCase()
      )
    );
  }, [jobs, activeTag]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleTag(tag: string) {
    setActiveTag((prev) => (prev === tag ? null : tag));
    setPage(1);
  }

  return (
    <div>
      {/* Filtres tags */}
      {allTags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mb-4">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTag(tag)}
              className="px-3 py-1 text-sm border rounded transition-colors cursor-pointer"
              style={
                activeTag === tag
                  ? {
                      backgroundColor: "var(--accent)",
                      color: "#fff",
                      borderColor: "var(--accent)",
                    }
                  : {
                      backgroundColor: "#fff",
                      color: "var(--foreground)",
                      borderColor: "#d1d5db",
                    }
              }
            >
              {tag}
            </button>
          ))}
          {activeTag && (
            <button
              onClick={() => {
                setActiveTag(null);
                setPage(1);
              }}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <Image src="/icons/close.png" alt="" width={14} height={14} />
              Tout afficher
            </button>
          )}
        </div>
      )}

      {/* Compteur */}
      <div className="flex items-center gap-2 mb-6">
        <Image src="/icons/work.png" alt="" width={16} height={16} />
        <span className="text-sm font-medium" style={{ color: "var(--accent)" }}>
          {filtered.length} offre{filtered.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* Grille */}
      {paginated.length > 0 ? (
        <JobGrid jobs={paginated} />
      ) : (
        <p className="text-sm text-gray-500">Aucune offre pour ce filtre.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="px-4 py-2 text-sm border rounded bg-white disabled:opacity-40 cursor-pointer"
          >
            ← Précédent
          </button>
          <span className="text-sm text-gray-600">
            Page {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 text-sm border rounded bg-white disabled:opacity-40 cursor-pointer"
          >
            Suivant →
          </button>
        </div>
      )}
    </div>
  );
}
