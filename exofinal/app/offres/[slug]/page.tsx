import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { asText } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { formatDate, slugify } from "@/lib/utils";
import ApplicationForm from "@/components/ApplicationForm";

export default async function SinglePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const client = createClient();

  let job;
  try {
    job = await client.getByUID("job_offer", slug);
  } catch {
    notFound();
  }

  const title = asText(job.data.title);
  const date = formatDate(job.data.date);
  const tags = job.data.tags ?? [];
  const adminEmails = (job.data.admin_emails ?? []).map((item) => item.email ?? "").filter(Boolean);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <Link
        href="/offres"
        className="inline-flex items-center gap-1 text-sm mb-6 px-3 py-1 border rounded"
        style={{ color: "var(--foreground)", borderColor: "var(--foreground)" }}
      >
        &lt; Voir toutes les offres
      </Link>

      <h1 className="text-3xl font-bold mb-1" style={{ color: "var(--foreground)" }}>
        {title}
      </h1>
      <div className="h-0.5 w-full mb-4" style={{ backgroundColor: "var(--accent)" }} />

      <div className="flex items-center gap-1 mb-3" style={{ color: "var(--accent)" }}>
        <Image src="/icons/calendar_month.png" alt="" width={14} height={14} />
        <span className="text-sm">{date}</span>
      </div>

      {tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mb-6">
          {tags.map((item, i) => (
            <Link
              key={i}
              href={`/offres/tag/${slugify(item.tag ?? "")}`}
              className="px-3 py-1 text-sm border rounded hover:opacity-75"
              style={{ color: "var(--foreground)", borderColor: "#d1d5db" }}
            >
              {item.tag}
            </Link>
          ))}
        </div>
      )}

      <div className="text-sm leading-relaxed space-y-4 mb-8">
        <PrismicRichText field={job.data.description} />
      </div>

      <ApplicationForm jobUid={slug} jobTitle={title} adminEmails={adminEmails} />
    </div>
  );
}
