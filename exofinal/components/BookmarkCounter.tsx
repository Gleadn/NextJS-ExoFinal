"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "dev_bookmarks";

export default function BookmarkCounter() {
  const [count, setCount] = useState(0);

  function readCount() {
    const stored: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    setCount(stored.length);
  }

  useEffect(() => {
    async function init() {
      readCount();
    }
    init();
    window.addEventListener("bookmarks-updated", readCount);
    return () => window.removeEventListener("bookmarks-updated", readCount);
  }, []);

  if (count === 0) return null;

  return (
    <Link
      href="/profil"
      className="flex items-center gap-1 hover:opacity-75 transition-opacity"
      aria-label={`${count} offre${count > 1 ? "s" : ""} sauvegardée${count > 1 ? "s" : ""}`}
    >
      <Image
        src="/icons/bookmark.png"
        alt=""
        width={20}
        height={20}
        className="brightness-0 invert"
      />
      <span className="text-white text-sm font-medium">{count}</span>
    </Link>
  );
}
