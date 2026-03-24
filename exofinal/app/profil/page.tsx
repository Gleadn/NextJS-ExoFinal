"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { JobOfferDocument } from "@/prismicio-types";
import { formatDate } from "@/lib/utils";
import JobGrid from "@/components/JobGrid";

type Application = {
  uid: string;
  title: string;
  date: string;
  message: string;
};

export default function ProfilPage() {
  const [savedJobs, setSavedJobs] = useState<JobOfferDocument[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const apps: Application[] = JSON.parse(
        localStorage.getItem("dev_applications") ?? "[]"
      );
      setApplications(apps);

      const uids: string[] = JSON.parse(
        localStorage.getItem("dev_bookmarks") ?? "[]"
      );

      if (uids.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/jobs?uids=${uids.join(",")}`);
        const data = await res.json();
        setSavedJobs(data);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-1" style={{ color: "var(--foreground)" }}>
        Bienvenue
      </h1>
      <div className="h-0.5 w-full mb-8" style={{ backgroundColor: "var(--accent)" }} />

      {/* Offres enregistrées */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--accent)" }}>
          Offres enregistrées
        </h2>
        {loading ? (
          <p className="text-sm text-gray-500">Chargement...</p>
        ) : savedJobs.length > 0 ? (
          <JobGrid jobs={savedJobs} />
        ) : (
          <p className="text-sm text-gray-500">Aucune offre sauvegardée.</p>
        )}
      </section>

      {/* Historique des candidatures */}
      <section>
        <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--accent)" }}>
          Historique des candidatures
        </h2>
        {applications.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {applications.map((app, i) => (
              <div key={i} className="py-4">
                <div
                  className="flex items-center gap-1 mb-1 text-sm"
                  style={{ color: "var(--accent)" }}
                >
                  <Image src="/icons/calendar_month.png" alt="" width={14} height={14} />
                  <span>{formatDate(app.date)}</span>
                </div>
                <Link
                  href={`/offres/${app.uid}`}
                  className="font-semibold hover:underline"
                  style={{ color: "var(--foreground)" }}
                >
                  {app.title}
                </Link>
                <p className="text-sm text-gray-600 mt-1 line-clamp-3">{app.message}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Aucune candidature envoyée.</p>
        )}
      </section>
    </div>
  );
}
