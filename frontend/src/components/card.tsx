import Image from "next/image";
import { type ScryCard } from "@/lib/scryfall/ScryCard";
import { BelerenTitle } from "@/fonts/Beleren";
import { JSX } from "react";

const BACKGROUND_COLOR = "#222";

interface CardThingProps {
  card: ScryCard;
  side2: ScryCard | undefined;
  partner: ScryCard | undefined;
  jankPrice: number;
  fetchTime: string;
}

function renderCardImage(name: string, url: string): JSX.Element {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          backgroundColor: BACKGROUND_COLOR,
          clipPath: "polygon(0 0, 100% 0, 0 100%)",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "8px",
          height: "8px",
          backgroundColor: BACKGROUND_COLOR,
          clipPath: "polygon(100% 0, 100% 100%, 0 0)",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "8px",
          height: "8px",
          backgroundColor: BACKGROUND_COLOR,
          clipPath: "polygon(0 100%, 100% 100%, 0 0)",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "8px",
          height: "8px",
          backgroundColor: BACKGROUND_COLOR,
          clipPath: "polygon(100% 100%, 100% 0, 0 100%)",
        }}
      ></div>
      <Image
        src={url}
        alt={name}
        width={250}
        height={348}
        style={{ margin: "auto" }}
      />
    </div>
  );
}

function renderCard(
  card: ScryCard,
  fetchtimeText?: string,
  jankPrice?: number
): JSX.Element {
  const names: string[] = Array.isArray(card.name) ? card.name : [card.name];

  const invalid = jankPrice && card.price > jankPrice;

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
      {renderCardImage(card.name[0], card.url)}
      <div style={{ textAlign: "center" }}>
        {names.map((name, index) => (
          <h1
            key={index}
            style={{
              color: invalid ? "red" : "antiquewhite",
              textDecoration: invalid ? "line-through" : "none",
              fontSize: index === 0 ? "2em" : "1em",
              marginTop: index === 0 ? "0" : "-.5em",
            }}
            className={`${BelerenTitle.variable} font-belerenTitle`}
          >
            {name}
          </h1>
        ))}
      </div>
      <div style={{ textAlign: "center", fontSize: ".8em", color: "#c7b8a4" }}>
        <span
          style={{
            color: invalid ? "red" : "inherit",
            textDecoration: invalid ? "line-through" : "none",
          }}
        >
          ${card.price} (USD)
        </span>
        {fetchtimeText}
      </div>
    </div>
  );
}

export function MagicCardWithPrice({
  card,
  side2,
  partner,
  jankPrice,
  fetchTime,
}: CardThingProps): JSX.Element {
  const fetchtimeText = fetchTime ? ` as of ${fetchTime}` : "";

  const mainCard = renderCard(card, fetchtimeText);
  const backCard = side2 ? renderCard(side2) : undefined;
  const partnerCard = partner
    ? renderCard(partner, fetchtimeText, jankPrice)
    : undefined;

  return (
    <div
      style={{
        backgroundColor: BACKGROUND_COLOR,
        borderRadius: "8px",
        padding: "20px",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      {mainCard}
      {backCard}
      {partnerCard}
    </div>
  );
}
