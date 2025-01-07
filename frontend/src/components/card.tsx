import Image from "next/image";
import Link from "next/link";
import { type ScryCard } from "@/scryfall/ScryCard";
import { BelerenTitle } from "@/fonts/Beleren";

interface CardThingProps {
  card: ScryCard;
  side2: ScryCard | undefined;
  partner: ScryCard | undefined;

  fetchTime: string;
}

export function MagicCardWithPrice({
  card,
  side2,
  partner,
  fetchTime,
}: CardThingProps): JSX.Element {
  const fetchtimeText = fetchTime ? ` as of ${fetchTime}` : "";

  const names: string[] = Array.isArray(card.name) ? card.name : [card.name];

  function renderCard(card: ScryCard): JSX.Element {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingLeft: "10px",
          paddingRight: "10px",
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
          {names.map((name, index) => (
            <h1
              key={index}
              style={{
                color: "antiquewhite",
                fontSize: index === 0 ? "2em" : "1em",
                marginTop: index === 0 ? "0" : "-.5em",
              }}
              className={`${BelerenTitle.variable} font-belerenTitle`}
            >
              {name}
            </h1>
          ))}
        </div>
        <div
          style={{ textAlign: "center", fontSize: ".8em", color: "#c7b8a4" }}
        >
          ${card.price} (USD){fetchtimeText}
        </div>
      </div>
    );
  }

  const mainCard = renderCard(card);

  return (
    <div
      style={{
        backgroundColor: "#222",
        borderRadius: "8px",
        padding: "20px",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      {mainCard}
      {mainCard}
      {mainCard}
    </div>
  );
}
