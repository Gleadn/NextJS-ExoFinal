import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--header-bg)" }} className="w-full">
      <div className="max-w-5xl mx-auto px-6 h-10 flex items-center justify-center">
        <Link
          href="/mentions"
          className="text-white text-sm opacity-75 hover:opacity-100 transition-opacity"
        >
          Mentions légales
        </Link>
      </div>
    </footer>
  );
}
