import Image from "next/image";
import Link from "next/link";

import { BelerenTitle } from "@/fonts/Beleren";

export type ScryCard = {
  url: string;
  name: string;
  price: number;
};

interface CardThingProps {
  card: ScryCard;

  fetchTime: string;
}

export function MagicCardWithPrice({
  card,
  fetchTime,
}: CardThingProps): JSX.Element {
  const fetchtimeText = fetchTime ? ` as of ${fetchTime}` : "";

  return (
    <div
      style={{
        backgroundColor: "#222",
        borderRadius: "8px",
        padding: "20px",
      }}
    >
      <Image
        src={card.url}
        alt={card.name}
        width={250}
        height={348}
        style={{ margin: "auto" }}
      />
      <div style={{ textAlign: "center" }}>
        <h1
          style={{ color: "antiquewhite", fontSize: "2em" }}
          className={`${BelerenTitle.variable} font-belerenTitle`}
        >
          {card.name}
        </h1>
      </div>
      <div style={{ textAlign: "center", fontSize: ".8em", color: "#c7b8a4" }}>
        ${card.price} (USD){fetchtimeText}
      </div>
    </div>
  );
}
