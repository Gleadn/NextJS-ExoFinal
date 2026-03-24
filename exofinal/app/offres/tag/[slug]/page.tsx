import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";
import { slugify } from "@/lib/utils";
import JobGrid from "@/components/JobGrid";

export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const client = createClient();

  const allJobs = await client.getAllByType("job_offer", {
    orderings: [{ field: "my.job_offer.date", direction: "desc" }],
  });

  const filteredJobs = allJobs.filter((job) =>
    job.data.tags.some((t) => t.tag && slugify(t.tag) === slug)
  );

  if (filteredJobs.length === 0) notFound();

  const tagName =
    filteredJobs[0].data.tags.find((t) => t.tag && slugify(t.tag) === slug)
      ?.tag ?? slug;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <Link
        href="/offres"
        className="inline-flex items-center gap-1 text-sm mb-6 px-3 py-1 border rounded"
        style={{ color: "var(--foreground)", borderColor: "var(--foreground)" }}
      >
        &lt; Voir toutes les offres
      </Link>

      <div className="flex items-center justify-between mb-1">
        <h1 className="text-3xl font-bold" style={{ color: "var(--foreground)" }}>
          {tagName}
        </h1>
        <div className="flex items-center gap-1.5" style={{ color: "var(--accent)" }}>
          <Image src="/icons/work.png" alt="" width={16} height={16} />
          <span className="text-sm font-medium">
            {filteredJobs.length} offre{filteredJobs.length > 1 ? "s" : ""}
          </span>
        </div>
      </div>
      <div className="h-0.5 w-full mb-6" style={{ backgroundColor: "var(--accent)" }} />

      <JobGrid jobs={filteredJobs} />
    </div>
  );
}
