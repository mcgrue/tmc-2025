import Image from "next/image";
import { BelerenTitle } from "@/fonts/Beleren";
import { format } from "date-fns";

import { getCardByName, getJank } from "@/scryfall/scryfall";
import { type ScryCard } from "@/scryfall/ScryCard";

import { MagicCardWithPrice } from "../../components/card";

const result = await getJank(0.82);
console.log("result", result);

const displayName = result.name
  .split(", ")
  .map((subtitle, index) => (index === 0 ? subtitle : `, ${subtitle}`));

// displayName.pop();

// displayName.push(", The Freshmaker");

const url = result.card_faces[0].image_uris.normal;
const price = result.prices.usd ? result.prices.usd : result.prices.usd_foil;

const card: ScryCard = {
  url: url,
  name: displayName,
  price: price,
};

// const card {
//   name: displayName,
//   url,
//   price: result.prices.usd,
// }

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
      <MagicCardWithPrice card={card} fetchTime={fetchTime} />
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}
