"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const STORAGE_KEY = "dev_bookmarks";

export default function BookmarkButton({ uid }: { uid: string }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    setSaved(stored.includes(uid));
  }, [uid]);

  function toggle() {
    const stored: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    const updated = stored.includes(uid)
      ? stored.filter((id) => id !== uid)
      : [...stored, uid];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setSaved(!stored.includes(uid));
    window.dispatchEvent(new Event("bookmarks-updated"));
  }

  return (
    <button
      onClick={toggle}
      aria-label={saved ? "Retirer des favoris" : "Sauvegarder l'offre"}
      className="shrink-0 hover:opacity-70 transition-opacity"
    >
      <Image
        src={saved ? "/icons/bookmark.png" : "/icons/save.png"}
        alt=""
        width={20}
        height={20}
      />
    </button>
  );
}
