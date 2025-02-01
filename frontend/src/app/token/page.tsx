"use client";

import { BelerenTitle } from "@/fonts/Beleren";

import React, { useState } from "react";

import { MagicCardWithPrice } from "@/components/card";
import { rollToken } from "@/lib/janklord";
import { type JankTablet } from "@/lib/janklord/JankTablet";
import { type ScryCardView } from "@/lib/scryfall/ScryCardView";
import { toJankPackNumber } from "@/lib/janklord/JankPackNumber";

import { MAIN_CONTENT_STYLE, COLORS } from "@/lib/styles";

const JANK_PRICE = 0.79;

// const { card, side2, partner, fetchTime } = await rollJanklord(JANK_PRICE);

const emptyCard: ScryCardView = {
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
  pack: undefined,
};

export default function DrawJankTablet() {
  const [state, setState] = useState([emptyTablet, emptyTablet, emptyTablet]);
  const [sillinessAllowed, setIsChecked] = useState(true);
  const [numberRolls, setNumberRolls] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!sillinessAllowed);
  };

  const handleRollButtonClick = () => {
    doRoll();
    setNumberRolls(numberRolls + 1);
  };

  const doRoll = async function () {
    setLoading(true);
    const jank1 = await rollJanklord(JANK_PRICE, !sillinessAllowed);
    const jank2 = await rollJanklord(JANK_PRICE, !sillinessAllowed);
    const jank3 = await rollJanklord(JANK_PRICE, !sillinessAllowed);
    setState([jank1, jank2, jank3]);
    setLoading(false);
  };

  const buttonText = function (
    numberRolls: number,
    sillinessAllowed: boolean,
    isLoading: boolean
  ) {
    if (isLoading) {
      return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src="/ring-spinner.svg"
            alt="loading"
            style={{ filter: "invert(1)" }}
          />
        </div>
      );
    } else {
      return (
        <span>
          Roll Three {numberRolls > 0 ? "MORE" : ""}{" "}
          <i>
            {sillinessAllowed
              ? ""
              : numberRolls == 0
              ? "serious"
              : "vErY sErIoUs"}
          </i>{" "}
          Jankmanders
        </span>
      );
    }
  };

  return (
    <div>
      <div
        style={{
          borderRadius: "8px",
          padding: "20px",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1
          className={`${BelerenTitle.variable} font-belerenTitle`}
          style={{
            color: COLORS.FONT_TITLE,
            fontSize: "1.5em",
            textAlign: "center",
          }}
        >
          Today&apos;s $0.79 Janklords are...
        </h1>

        {state[0].card.name && (
          <div style={MAIN_CONTENT_STYLE}>
            {state.map((element: JankTablet, index) => (
              <MagicCardWithPrice
                key={index}
                card={element.card}
                side2={element.side2}
                partner={element.partner}
                jankPrice={JANK_PRICE}
                fetchTime={element.fetchTime}
                pack={toJankPackNumber(index + 1)}
                sillinessAllowed={sillinessAllowed}
              />
            ))}
          </div>
        )}

        <button
          style={{
            backgroundColor: "rgba(234, 88, 12, 0.55)",
            color: "white",
            padding: "10px",
            borderRadius: "8px",
            marginTop: "2em",
            width: "10em",
            transition: "background-color 0.3s",
          }}
          onClick={handleRollButtonClick}
          /*
async (e) => {
            const button = e.currentTarget;
            button.disabled = true;
            button.textContent = "Fetching jank...";
            await doRoll();
            button.disabled = false;
            button.textContent = `Roll Three MORE ${
              sillinessAllowed ? "" : "vErY sErIoUs"
            } Jankmanders`;
          }
*/

          onMouseEnter={(e) => {
            e.currentTarget.style.transition = "filter 0.25s";
            e.currentTarget.style.filter = "brightness(150%)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transition = "filter 0.25s";
            e.currentTarget.style.filter = "brightness(100%)";
          }}
        >
          {buttonText(numberRolls, sillinessAllowed, isLoading)}
        </button>
      </div>

      <label style={{ color: "#888", fontSize: ".7em", padding: "1em" }}>
        <input
          type="checkbox"
          checked={sillinessAllowed}
          onChange={handleCheckboxChange}
        />
        &nbsp;&nbsp;Un-manders and test cards allowed
      </label>
    </div>
  );
}
