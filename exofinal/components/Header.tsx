import Link from "next/link";
import Image from "next/image";
import BookmarkCounter from "./BookmarkCounter";

export default function Header() {
  return (
    <header style={{ backgroundColor: "var(--header-bg)" }} className="w-full sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" aria-label="DEV — Accueil">
          <svg width="80" height="21" viewBox="0 0 80 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#logo-clip)">
              <path d="M37.15 2.97C36.07 2.37 34.78 2.07 33.27 2.07H28.03V17.22H33.17C34.71 17.22 36.02 16.92 37.12 16.31C38.21 15.7 39.05 14.83 39.64 13.7C40.22 12.57 40.51 11.21 40.51 9.64C40.51 8.07 40.22 6.72 39.64 5.58C39.06 4.44 38.22 3.58 37.14 2.98L37.15 2.97ZM37.27 12.53C36.91 13.3 36.38 13.88 35.67 14.26C34.96 14.64 34.08 14.83 33.03 14.83H30.77V4.45H33.1C34.13 4.45 34.99 4.64 35.69 5.02C36.39 5.4 36.91 5.98 37.27 6.74C37.62 7.51 37.8 8.47 37.8 9.63C37.8 10.79 37.62 11.75 37.27 12.53Z" fill="white"/>
              <path d="M51.32 10.7H57.91V8.43H51.32V4.37H58.44V2.07H48.58V17.22H58.48V14.92H51.32V10.7Z" fill="white"/>
              <path d="M76.75 2.07L72.82 13.98H72.65L68.72 2.07H65.7L71.05 17.22H74.42L79.76 2.07H76.75Z" fill="white"/>
              <path d="M14.46 14.42C14.46 14.88 14.36 15.22 14.16 15.44C13.96 15.66 13.67 15.76 13.27 15.76H10.76C10.26 15.76 9.84 15.83 9.51 15.96C9.17 16.1 8.89 16.3 8.67 16.56C8.52 16.74 8.39 16.94 8.27 17.16C8.15 16.94 8.02 16.74 7.88 16.56C7.66 16.3 7.38 16.09 7.04 15.96C6.71 15.83 6.29 15.76 5.79 15.76H3.27C2.87 15.76 2.58 15.66 2.38 15.44C2.18 15.22 2.08 14.88 2.08 14.42V12.82H0V14.69C0 15.71 0.25 16.53 0.76 17.13C1.27 17.74 2.01 18.05 2.95 18.05H5.84C6.2 18.05 6.49 18.11 6.71 18.24C6.92 18.36 7.07 18.52 7.17 18.72C7.27 18.92 7.32 19.15 7.32 19.4V20.28H9.24V19.4C9.24 19.16 9.29 18.93 9.39 18.72C9.49 18.52 9.64 18.37 9.85 18.24C10.06 18.12 10.36 18.05 10.72 18.05H13.6C14.22 18.05 14.76 17.91 15.2 17.64C15.64 17.36 15.99 16.97 16.21 16.46C16.43 15.97 16.54 15.37 16.54 14.7V12.79H14.47V14.43L14.46 14.42Z" fill="white"/>
              <path d="M2.14 2.07H14.4V7.19H16.47V0H0.07V7.19H2.14V2.07Z" fill="white"/>
            </g>
            <defs>
              <clipPath id="logo-clip">
                <rect width="79.76" height="20.27" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </Link>
        <div className="flex items-center gap-4">
          <BookmarkCounter />
          <Link
            href="/profil"
            className="text-white hover:opacity-75 transition-opacity"
            aria-label="Mon profil"
          >
            <Image src="/icons/login.png" alt="Mon profil" width={24} height={24} className="brightness-0 invert" />
          </Link>
        </div>
      </div>
    </header>
  );
}
