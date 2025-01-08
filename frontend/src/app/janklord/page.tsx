"use client";

import { BelerenTitle } from "@/fonts/Beleren";

import React, { useState } from "react";

import { MagicCardWithPrice } from "@/components/card";
import { rollJanklord, type JankTablet } from "@/lib/janklord";
import { type ScryCard } from "@/lib/scryfall/ScryCard";

const JANK_PRICE = 0.79;

// const { card, side2, partner, fetchTime } = await rollJanklord(JANK_PRICE);

const emptyCard: ScryCard = {
  url: "",
  name: "",
  price: 0,
};

const emptyTablet: JankTablet = {
  card: emptyCard,
  side2: undefined,
  partner: undefined,
  jankPrice: 0,
  fetchTime: "",
};

export default function DrawJankTablet() {
  const [state, setState] = useState([emptyTablet, emptyTablet, emptyTablet]);

  const doRoll = async function () {
    const jank1 = await rollJanklord(JANK_PRICE);
    const jank2 = await rollJanklord(JANK_PRICE);
    const jank3 = await rollJanklord(JANK_PRICE);
    setState([jank1, jank2, jank3]);
  };

  return (
    <div>
      <h1
        className={`${BelerenTitle.variable} font-belerenTitle`}
        style={{
          color: "antiquewhite",
          fontSize: "1.5em",
          textAlign: "center",
        }}
      >
        Today's $0.79 Janklords are...
      </h1>

      {state[0].card.name && (
        <div
          style={{
            backgroundColor: "#111",
            borderRadius: "8px",
            padding: "20px",
            display: "flex",
            gap: "10px",
          }}
        >
          {state.map((element: JankTablet, index) => (
            <MagicCardWithPrice
              key={index}
              card={element.card}
              side2={element.side2}
              partner={element.partner}
              jankPrice={JANK_PRICE}
              fetchTime={element.fetchTime}
            />
          ))}
        </div>
      )}
      <button
        style={{
          backgroundColor: "#666",
          color: "white",
          padding: "10px",
          marginLeft: "50%",
          marginRight: "50%",
          borderRadius: "8px",
          transition: "background-color 0.3s",
        }}
        onClick={async (e) => {
          const button = e.currentTarget;
          button.disabled = true;
          button.textContent = "Fetching jank...";
          await doRoll();
          button.disabled = false;
          button.textContent = "Roll Three MORE Jankmanders";
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#888";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#666";
        }}
      >
        Roll Three Jankmanders
      </button>
    </div>
  );
}
