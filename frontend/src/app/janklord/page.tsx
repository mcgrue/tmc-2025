"use client";

import React, { useState, useEffect } from "react";

import { MagicCardWithPrice } from "../../components/card";
import { rollJanklord } from "../../lib/janklord";

const JANK_PRICE = 0.79;

const { card, side2, partner, fetchTime } = await rollJanklord(JANK_PRICE);

type JankTablet = {};

export default function DrawJankTablet() {
  const [state, setState] = useState([{}, {}, {}]);

  const doRoll = async function () {
    const jank1 = await rollJanklord(JANK_PRICE);
    const jank2 = await rollJanklord(JANK_PRICE);
    const jank3 = await rollJanklord(JANK_PRICE);
    setState([jank1, jank2, jank3]);
  };

  return (
    <div>
      {state[0].card && (
        <div
          style={{
            backgroundColor: "#111",
            borderRadius: "8px",
            padding: "20px",
            display: "flex",
            gap: "10px",
          }}
        >
          {state.map((element: any, index) => (
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
          button.textContent = "Roll Three Jankmanders";
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
