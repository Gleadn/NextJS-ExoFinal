import { notFound } from "next/navigation";
import { PrismicRichText } from "@prismicio/react";
import { createClient } from "@/prismicio";

export default async function MentionsPage() {
  const client = createClient();

  let mention;
  try {
    mention = await client.getSingle("mentions");
  } catch {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-1" style={{ color: "var(--foreground)" }}>
        Mentions Légales
      </h1>
      <div className="h-0.5 w-full mb-8" style={{ backgroundColor: "var(--accent)" }} />

      <div>
        <PrismicRichText
          field={mention.data.content}
          components={{
            heading2: ({ children }) => (
              <h2
                className="text-lg font-semibold mt-6 mb-3"
                style={{ color: "var(--accent)" }}
              >
                {children}
              </h2>
            ),
            heading3: ({ children }) => (
              <h3
                className="text-base font-semibold mt-4 mb-2"
                style={{ color: "var(--accent)" }}
              >
                {children}
              </h3>
            ),
            paragraph: ({ children }) => (
              <p className="text-sm leading-relaxed mb-4">{children}</p>
            ),
          }}
        />
      </div>
    </div>
  );
}
