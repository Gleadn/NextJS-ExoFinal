"use client";

import { useState } from "react";

interface Props {
  jobUid: string;
  jobTitle: string;
  adminEmails: string[];
}

export default function ApplicationForm({ jobUid, jobTitle, adminEmails }: Props) {
  const [candidateEmail, setCandidateEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus("sending");

    const mailObject = {
      to: adminEmails,
      from: candidateEmail,
      subject: `Candidature — ${jobTitle}`,
      body: message,
    };
    console.log("[Candidature] Mail object:", mailObject);

    try {
      const res = await fetch("/api/candidature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobUid, jobTitle, message, candidateEmail, adminEmails }),
      });

      if (!res.ok) throw new Error();

      const history = JSON.parse(localStorage.getItem("dev_applications") ?? "[]");
      history.unshift({
        uid: jobUid,
        title: jobTitle,
        date: new Date().toISOString(),
        message,
      });
      localStorage.setItem("dev_applications", JSON.stringify(history));

      setStatus("sent");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="p-4 border border-green-300 bg-green-50 rounded text-green-700 text-sm">
        Votre candidature a bien été envoyée !
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-gray-300 rounded p-4 flex flex-col gap-3 bg-white"
    >
      <input
        type="email"
        value={candidateEmail}
        onChange={(e) => setCandidateEmail(e.target.value)}
        placeholder="Votre email"
        required
        className="w-full outline-none text-sm text-gray-600 placeholder-gray-400 border-b border-gray-200 pb-2"
        disabled={status === "sending"}
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Postuler à cette offre ..."
        rows={4}
        className="w-full resize-none outline-none text-sm text-gray-600 placeholder-gray-400"
        disabled={status === "sending"}
      />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={status === "sending" || !message.trim() || !candidateEmail.trim()}
          className="px-4 py-1.5 text-sm text-white rounded disabled:opacity-50 cursor-pointer"
          style={{ backgroundColor: "var(--accent)" }}
        >
          {status === "sending" ? "Envoi..." : "Envoyer"}
        </button>
      </div>
      {status === "error" && (
        <p className="text-sm text-red-600">Une erreur est survenue. Veuillez réessayer.</p>
      )}
    </form>
  );
}
