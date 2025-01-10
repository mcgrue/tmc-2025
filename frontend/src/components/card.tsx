import Image from "next/image";
import { JSX } from "react";

import { BelerenTitle } from "@/fonts/Beleren";
import { type JankPackNumber } from "@/lib/janklord/JankPackNumber";
import { type ScryCardView } from "@/lib/scryfall/ScryCardView";
import { COLORS } from "@/lib/styles";
import { getPackColor } from "@/lib/janklord";
import { Border } from "scryfall-sdk";

type RenderCardImageProps = {
  cardView: ScryCardView;
  pack?: JankPackNumber;
  sillinessAllowed?: boolean;
};

function renderCardImage(props: RenderCardImageProps): JSX.Element {
  const { cardView, pack, sillinessAllowed } = props;
  const { name, url, cardData } = cardView;
  const BACKGROUND_COLOR = getPackColor(pack);

  const altName = Array.isArray(name) ? name.join() : name;

  return (
    <div>
      <div style={{ position: "relative", display: "inline-block" }}>
        {/* <h1>cardData: {cardData ? "yes" : "no"}</h1>
        <h1>border_color: {cardData?.border_color}</h1> */}
        {!sillinessAllowed && cardData?.border_color == "silver" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              fill: "red",
              opacity: 0.5,
            }}
          >
            <line
              x1="0"
              y1="0"
              x2="100"
              y2="100"
              stroke="red"
              strokeWidth="10"
            />
            <line
              x1="100"
              y1="0"
              x2="0"
              y2="100"
              stroke="red"
              strokeWidth="10"
            />
          </svg>
        )}

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
          alt={altName}
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
    </div>
  );
}

type RenderCardProps = {
  cardView: ScryCardView;
  fetchtimeText?: string;
  jankPrice?: number;
  pack?: JankPackNumber | undefined;
  sillinessAllowed?: boolean;
};

function renderCard(props: RenderCardProps): JSX.Element {
  const { cardView, fetchtimeText, jankPrice, pack, sillinessAllowed } = props;
  const card = cardView.cardData;
  const names: string[] = Array.isArray(cardView.name)
    ? cardView.name
    : [cardView.name];

  const invalid = jankPrice && cardView.price > jankPrice;

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
      {renderCardImage({
        cardView,
        pack,
        sillinessAllowed,
      })}
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
          ${cardView.price} (USD)
        </span>
        {fetchtimeText}
      </div>
    </div>
  );
}

interface CardThingProps {
  card: ScryCardView;
  side2: ScryCardView | undefined;
  partner: ScryCardView | undefined;
  jankPrice: number;
  fetchTime: string;
  pack?: JankPackNumber;
  sillinessAllowed?: boolean;
}

export function MagicCardWithPrice({
  card,
  side2,
  partner,
  jankPrice,
  fetchTime,
  pack,
  sillinessAllowed,
}: CardThingProps) {
  let BACKGROUND_COLOR = getPackColor(pack);
  const fetchtimeText = fetchTime ? ` as of ${fetchTime}` : "";
  const mainCard = renderCard({
    cardView: card,
    fetchtimeText,
    pack,
    sillinessAllowed,
  });
  const backCard = side2
    ? renderCard({ cardView: side2, pack, sillinessAllowed })
    : undefined;

  const partnerCard = partner
    ? renderCard({
        cardView: partner,
        fetchtimeText,
        jankPrice,
        pack,
        sillinessAllowed,
      })
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
