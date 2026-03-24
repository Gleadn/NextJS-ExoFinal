import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/prismicio";
import JobGrid from "@/components/JobGrid";

export default async function Home() {
  const client = createClient();
  const { results: jobs } = await client.getByType("job_offer", {
    pageSize: 6,
    orderings: [{ field: "my.job_offer.date", direction: "desc" }],
  });

  return (
    <div>
      {/* Hero */}
      <div className="w-full relative h-52">
        <Image
          src="/HomeImage.png"
          alt="Hero"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <section>
          <h2 className="text-2xl font-bold mb-1" style={{ color: "var(--foreground)" }}>
            Nos dernières opportunités
          </h2>
          <div className="h-0.5 w-full mb-6" style={{ backgroundColor: "var(--accent)" }} />

          <JobGrid jobs={jobs} />

          <div className="flex justify-center mt-8">
            <Link
              href="/offres"
              className="px-5 py-2 text-sm text-white rounded"
              style={{ backgroundColor: "var(--accent)" }}
            >
              Voir toutes les offres
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

