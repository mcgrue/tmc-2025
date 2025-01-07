import Image from "next/image";
import { BelerenTitle } from "@/fonts/Beleren";
import { format } from "date-fns";
import { CardThing, type ScryCard } from "../../components/card";

const card: ScryCard = {
  url: "https://cards.scryfall.io/large/front/6/5/651626f5-aca6-4653-aa27-36c919566cb0.jpg?1720467986",
  name: "Magical Hacker",
  price: 0.01,
};

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
      <CardThing card={card} fetchTime={fetchTime} />
    </div>
  );
}
