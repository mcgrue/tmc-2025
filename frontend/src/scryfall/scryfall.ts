import * as Scry from "scryfall-sdk";

export async function getExactByName(name: string): Promise<Scry.Card> {
  return Scry.Cards.byName(name, true);
}

export async function getJank(jankPrice: number): Promise<Scry.Card> {
  if (jankPrice < 0) {
    jankPrice = .79;
  }

  //url: `https://api.scryfall.com/cards/random?q=%28type%3Acreature+type%3Alegendary%29+-type%3Abattle+usd<=${jankPrice}`,
  // {
  //   type: "creature",
  //   subtype: "legendary",
  //   usd: `<=${jankPrice}`,
  // }
  return Scry.Cards.random(
    "(type:creature type:legendary) -type:battle usd<=" + jankPrice,
  );
}

export async function getRandom(randomQueryParams: string): Promise<Scry.Card> {
  return Scry.Cards.random(randomQueryParams);
}
