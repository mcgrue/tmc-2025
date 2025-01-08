import { MagicCardWithPrice } from "../../components/card";
import { rollJanklord } from "../../lib/janklord";

const JANK_PRICE = 0.79;

const { card, side2, partner, fetchTime } = await rollJanklord(JANK_PRICE);

// type JankTablet = {};

export default function DrawJankTablet() {
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
        partner={partner}
        jankPrice={JANK_PRICE}
        fetchTime={fetchTime}
      />
      {/* <pre>{JSON.stringify(result, null, 2)}</pre> */}
    </div>
  );
}
