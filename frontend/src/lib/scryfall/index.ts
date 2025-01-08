import * as Scry from "scryfall-sdk";

export async function getExactByName(name: string): Promise<Scry.Card> {
  return Scry.Cards.byName(name, true);
}

export async function getJank(
  jankPrice: number,
  noSilliness: boolean,
): Promise<Scry.Card> {
  if (jankPrice < 0) {
    jankPrice = .79;
  }

  //url: `https://api.scryfall.com/cards/random?q=%28type%3Acreature+type%3Alegendary%29+-type%3Abattle+usd<=${jankPrice}`,
  // {
  //   type: "creature",
  //   subtype: "legendary",
  //   usd: `<=${jankPrice}`,
  // }

  let query = `(type:creature type:legendary) -type:battle usd<=${jankPrice}`;

  if (noSilliness) {
    query += " -is:funny";
  }

  return Scry.Cards.random(query);
}

export async function getRandom(
  randomQueryParams: string,
  noSilliness: boolean,
): Promise<Scry.Card> {
  if (noSilliness) {
    randomQueryParams += " -is:funny";
  }

  return Scry.Cards.random(randomQueryParams);
}
