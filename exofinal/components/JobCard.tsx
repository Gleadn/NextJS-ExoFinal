import Link from "next/link";
import Image from "next/image";
import { asText } from "@prismicio/client";
import type { JobOfferDocument } from "@/prismicio-types";
import BookmarkButton from "./BookmarkButton";
import { formatDate, slugify } from "@/lib/utils";

export default function JobCard({ job }: { job: JobOfferDocument }) {
  const { uid, data } = job;
  const title = asText(data.title);
  const date = formatDate(data.date);
  const tags = data.tags ?? [];
  const description = asText(data.description);

  return (
    <div
      style={{ backgroundColor: "var(--card-bg)" }}
      className="rounded border border-gray-200 p-4 flex flex-col gap-2"
    >
      <div className="flex items-start justify-between gap-2">
        <Link
          href={`/offres/${uid}`}
          className="font-semibold text-base hover:underline"
          style={{ color: "var(--foreground)" }}
        >
          {title}
        </Link>
        <BookmarkButton uid={uid} />
      </div>

      <div className="flex items-center gap-1 text-sm" style={{ color: "var(--accent)" }}>
        <Image src="/icons/calendar_month.png" alt="" width={14} height={14} />
        <span>{date}</span>
      </div>

      {tags.length > 0 && (
        <div className="flex items-center gap-1 flex-wrap">
          <Image src="/icons/code.png" alt="" width={14} height={14} />
          {tags.map((item, i) => (
            <Link
              key={i}
              href={`/offres/tag/${slugify(item.tag ?? "")}`}
              className="text-sm hover:underline"
              style={{ color: "var(--accent)" }}
            >
              {item.tag}
              {i < tags.length - 1 && ","}
            </Link>
          ))}
        </div>
      )}

      <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
    </div>
  );
}
