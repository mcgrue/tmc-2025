import Image from "next/image";
import Link from "next/link";
import "./footer.css";

const BottomNav = () => {
  return (
    <div className="flex items-right justify-end h-20 px-4 leading-6 text-gray-700 border-t border-gray-600/[.25] border-solid">
      <Link
        href="/"
        className="flex items-center gap-2 hover:underline hover:underline-offset-4 p-1"
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
        className="flex items-center gap-2 hover:underline hover:underline-offset-4 p-1"
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
        className="flex items-center gap-2 hover:underline hover:underline-offset-4 p-1"
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
    </div>
  );
};

const Disclaimer = () => {
  return (
    <div className="footer-disclaimer">
      Portions of this site are unofficial Fan Content permitted under the
      Wizards of the Coast Fan Content Policy. The literal and graphical
      information presented on this site about Magic: The Gathering, including
      card images and mana symbols, is copyright Wizards of the Coast, LLC. This
      site is not produced by or endorsed by Wizards of the Coast.
    </div>
  );
};

export default function Header() {
  return (
    <div style={{ width: "100%" }}>
      <footer>
        <BottomNav />
        <Disclaimer />
      </footer>
    </div>
  );
}
