import Image from "next/image";

import { BelerenTitle } from "@/fonts/Beleren";
import { COLORS } from "@/lib/styles";

export default function Header() {
  return (
    <header
      style={{ borderWidth: "0px 0px 3px" }}
      className="flex items-center justify-between h-20 px-4 leading-6 text-gray-700 border-b border-orange-600/[.55] border-solid 
                      sm:grid sm:auto-cols-auto sm:grid-cols-3 sm:px-6 
                      lg:px-8"
    >
      <h1
        style={{
          color: COLORS.FONT_TITLE,
          fontSize: "2em",
          display: "flex",
          alignItems: "center",
        }}
        className={`${BelerenTitle.variable} font-belerenTitle`}
      >
        <Image
          className="dark:invert"
          src="/white_mana.png"
          alt="The Magical Cards"
          width={38}
          height={38}
          style={{ position: "relative", top: "-2px" }}
          priority
        />
        <span style={{ marginLeft: "8px" }}>The Magical Cards</span>
      </h1>
    </header>
  );
}
