import { type ScryCardView } from "@/lib/scryfall/ScryCardView";
import { type JankPackNumber } from "@/lib/janklord/JankPackNumber";

export type JankTablet = {
  card: ScryCardView;
  side2: ScryCardView | undefined;
  partner: ScryCardView | undefined;
  jankPrice: number;
  fetchTime: string;
  pack?: JankPackNumber;
};
