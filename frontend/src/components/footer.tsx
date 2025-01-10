import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <footer className="flex items-right justify-between h-20 px-4 leading-6 text-gray-700 border-t border-gray-600/[.25] border-solid sm:grid sm:auto-cols-auto sm:grid-cols-3 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      >
        <Image
          aria-hidden
          src="/home.svg"
          alt="Home icon"
          width={16}
          height={16}
          className="filter invert-[0.5] saturate-[0] hue-rotate-[180deg] brightness-[0.8]"
        />
        Home
      </Link>

      <Link
        href="/about"
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      >
        <Image
          aria-hidden
          src="/file.svg"
          alt="File icon"
          width={16}
          height={16}
          className="filter invert-[0.5] saturate-[0] hue-rotate-[180deg] brightness-[0.8]"
        />
        About
      </Link>

      <Link
        href="/janklord"
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      >
        <Image
          aria-hidden
          src="/trash.svg"
          alt="Janklord Booster Pack"
          width={16}
          height={16}
          className="filter invert-[0.5] saturate-[0] hue-rotate-[180deg] brightness-[0.8]"
        />
        Janklord
      </Link>
    </footer>
  );
}
