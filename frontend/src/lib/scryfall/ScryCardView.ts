import * as Scry from "scryfall-sdk";

export type ScryCardView = {
  url: string;
  name: string | string[];
  price: number;
  cardData?: Scry.Card;
};
