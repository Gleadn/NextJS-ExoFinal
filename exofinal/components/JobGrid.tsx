import type { JobOfferDocument } from "@/prismicio-types";
import JobCard from "./JobCard";

export default function JobGrid({ jobs }: { jobs: JobOfferDocument[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobs.map((job) => (
        <JobCard key={job.uid} job={job} />
      ))}
    </div>
  );
}
