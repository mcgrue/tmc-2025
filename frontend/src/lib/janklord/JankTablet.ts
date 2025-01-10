import { type ScryCard } from "@/lib/scryfall/ScryCard";
import { type JankPackNumber } from "@/lib/janklord/JankPackNumber";

export type JankTablet = {
  card: ScryCard;
  side2: ScryCard | undefined;
  partner: ScryCard | undefined;
  jankPrice: number;
  fetchTime: string;
  pack?: JankPackNumber;
};
