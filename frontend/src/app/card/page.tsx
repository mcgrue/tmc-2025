import Image from "next/image";
import { BelerenTitle } from "@/fonts/Beleren";
import { format } from "date-fns";

const card = {
  url: "https://cards.scryfall.io/large/front/6/5/651626f5-aca6-4653-aa27-36c919566cb0.jpg?1720467986",
  name: "Magical Hacker",
  price: 0.01,
};

const fetchTime = format(new Date(), "MMMM do, yyyy");

export default function Card() {
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
        ${card.price} (USD) as of {fetchTime}
      </div>
    </div>
  );
}
