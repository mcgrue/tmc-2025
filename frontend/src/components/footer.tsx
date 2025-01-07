import Image from "next/image";
import Link from 'next/link';

export default function Header() {
  return ( 
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

      <Link href="/" className="flex items-center gap-2 hover:underline hover:underline-offset-4">
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

    <Link href="/about" className="flex items-center gap-2 hover:underline hover:underline-offset-4">
      <Image
      aria-hidden
      src="/file.svg"
      alt="File icon"
      width={16}
      height={16}
      />
      About
    </Link>
    
  </footer>
  );
}