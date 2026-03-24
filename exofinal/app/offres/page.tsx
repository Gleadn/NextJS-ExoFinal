import { createClient } from "@/prismicio";
import OffresClient from "@/components/OffresClient";

export default async function OffresPage() {
  const client = createClient();
  const jobs = await client.getAllByType("job_offer", {
    orderings: [{ field: "my.job_offer.date", direction: "desc" }],
  });

  const allTags = Array.from(
    new Set(
      jobs.flatMap((job) =>
        job.data.tags.map((t) => t.tag).filter((t): t is string => Boolean(t))
      )
    )
  ).sort();

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-1" style={{ color: "var(--foreground)" }}>
        Offres d&apos;emploi
      </h1>
      <div className="h-0.5 w-full mb-6" style={{ backgroundColor: "var(--accent)" }} />

      <OffresClient jobs={jobs} allTags={allTags} />
    </div>
  );
}
