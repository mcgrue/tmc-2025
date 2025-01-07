import Image from "next/image";
import { BelerenTitle } from "@/fonts/Beleren";
import { format } from "date-fns";

import { getCardByName, getJank } from "@/scryfall/scryfall";

import { MagicCardWithPrice } from "../../components/card";

// const result = await getJank(0.82);
const result = await getCardByName("Tibalt, Cosmic Impostor");

console.log("result", result);

let secondFace = null;

if (result.name.includes(" // ")) {
  const halves = result.name.split(" // ");
  result.name = halves[0];
  secondFace = {
    name: halves[1],
    url: result.card_faces[1].image_uris.normal,
    price: 0,
  };
}

function makeCard(name: string, url: string, price: number) {
  const displayName = name
    .split(", ")
    .map((subtitle, index) => (index === 0 ? subtitle : `, ${subtitle}`));

  // displayName.pop();

  // displayName.push(", The Freshmaker");

  return {
    url: url,
    name: displayName,
    price: price,
  };
}

let card = makeCard(
  result.name,
  result.card_faces[0].image_uris.normal,
  result.prices.usd ? result.prices.usd : result.prices.usd_foil
);

const side2 = secondFace
  ? makeCard(secondFace.name, secondFace.url, secondFace.price)
  : undefined;

const fetchTime = format(new Date(), "MMMM do, yyyy");

export default function DrawCard() {
  return (
    <div
      style={{
        backgroundColor: "#222",
        borderRadius: "8px",
        padding: "20px",
      }}
    >
      <MagicCardWithPrice
        card={card}
        side2={side2}
        partner={undefined}
        fetchTime={fetchTime}
      />
      {/* <pre>{JSON.stringify(result, null, 2)}</pre> */}
    </div>
  );
}
