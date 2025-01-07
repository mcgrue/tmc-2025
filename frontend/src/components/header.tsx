import Image from "next/image";
import { BelerenTitle } from "@/fonts/Beleren";

export default function Header() {
  return (
    <div className="flex items-center gap-2">
      <Image
        className="dark:invert"
        src="/white_mana.png"
        alt="The Magical Cards"
        width={38}
        height={38}
        style={{ position: "relative", top: "-2px" }}
        priority
      />
      <h1
        style={{ color: "antiquewhite", fontSize: "2em" }}
        className={`${BelerenTitle.variable} font-belerenTitle`}
      >
        The Magical Cards
      </h1>
    </div>
  );
}
