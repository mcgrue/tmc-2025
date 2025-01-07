import * as Scry from "scryfall-sdk";

export async function getCardByName(name: string): Promise<Scry.Card> {
  return Scry.Cards.byName(name);
}
