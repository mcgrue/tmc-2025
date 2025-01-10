import Image from "next/image";
import { JSX } from "react";

import { BelerenTitle } from "@/fonts/Beleren";
import { type JankPackNumber } from "@/lib/janklord/JankPackNumber";
import { type ScryCard } from "@/lib/scryfall/ScryCard";
import { COLORS } from "@/lib/styles";
import { getPackColor } from "@/lib/janklord";

function renderCardImage(
  name: string,
  url: string,
  pack?: JankPackNumber
): JSX.Element {
  const BACKGROUND_COLOR = getPackColor(pack);

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
        style={{
          margin: "auto",
          minWidth: "250px",
          minHeight: "348px",
          maxWidth: "250px",
          maxHeight: "348px",
        }}
      />
    </div>
  );
}

type RenderCardProps = {
  card: ScryCard;
  fetchtimeText?: string;
  jankPrice?: number;
  pack?: JankPackNumber | undefined;
};

function renderCard(props: RenderCardProps): JSX.Element {
  const { card, fetchtimeText, jankPrice, pack } = props;
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
      {renderCardImage(card.name[0], card.url, pack)}
      <div style={{ textAlign: "center" }}>
        {names.map((name, index) => (
          <h1
            key={index}
            style={{
              color: invalid
                ? COLORS.FONT_READABLE_ERROR
                : COLORS.FONT_READABLE,
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

interface CardThingProps {
  card: ScryCard;
  side2: ScryCard | undefined;
  partner: ScryCard | undefined;
  jankPrice: number;
  fetchTime: string;
  pack?: JankPackNumber;
}

export function MagicCardWithPrice({
  card,
  side2,
  partner,
  jankPrice,
  fetchTime,
  pack,
}: CardThingProps) {
  let BACKGROUND_COLOR = getPackColor(pack);
  const fetchtimeText = fetchTime ? ` as of ${fetchTime}` : "";
  const mainCard = renderCard({ card, fetchtimeText, pack });
  const backCard = side2 ? renderCard({ card: side2, pack }) : undefined;

  const partnerCard = partner
    ? renderCard({ card: partner, fetchtimeText, jankPrice, pack })
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
