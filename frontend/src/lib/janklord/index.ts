import { format } from "date-fns";

import { getExactByName, getJank, getRandom } from "@/lib/scryfall";
import { type ScryCard } from "@/lib/scryfall/ScryCard";

function extractPartnerWithName(text: string) {
  if (!text) {
    return null;
  }

  const partnerWithPattern = /Partner with ([^()]+) \(/;
  const match = text.match(partnerWithPattern);
  return match ? match[1].trim() : null;
}

export async function rollJanklord(
  jankPrice: number,
  noSilliness: boolean,
): Promise<JankTablet> {
  const result = await getJank(jankPrice, noSilliness);
  // const result = await getExactByName("Brallin, Skyshark Rider");
  // const result = await getExactByName("Amy Pond");
  // const result = await getExactByName("The Eighth Doctor");
  // const result = await getExactByName("Alena, Kessig Trapper");
  // const result = await getExactByName("Faceless One");

  let secondFace = null;

  if (result.name.includes(" // ")) {
    const halves = result.name.split(" // ");
    result.name = halves[0];
    secondFace = {
      name: halves[1],
      // @ts-expect-error: Object is possibly 'null'.
      url: result.card_faces[1].image_uris.normal,
      price: 0,
    };
  }

  function makeCard(name: string, url: string, price: number): ScryCard {
    const displayName = name
      .split(", ")
      .map((subtitle, index) => (index === 0 ? subtitle : `, ${subtitle}`));

    // displayName.pop();

    // displayName.push(", The Freshmaker");

    return {
      url: url,
      name: displayName,
      price: price,
    };
  }

  const card = makeCard(
    result.name,
    // @ts-expect-error: Object is possibly 'null'.
    result.card_faces[0].image_uris.normal,
    // @ts-expect-error: Object is possibly 'null'.
    result.prices.usd ? result.prices.usd : result.prices.usd_foil,
  );

  const side2 = secondFace
    ? makeCard(secondFace.name, secondFace.url, secondFace.price)
    : undefined;

  // @ts-expect-error: Object is possibly 'null'.
  const partnerWithName = extractPartnerWithName(result.oracle_text);

  let partner = undefined;
  if (partnerWithName) {
    console.log("partner found: " + partnerWithName);
    partner = await getExactByName(partnerWithName);
  } else if (
    result.oracle_text &&
    result.oracle_text.lastIndexOf("\nPartner ") >= 0
  ) {
    console.log("is a Partner but not with");
    partner = await getRandom(
      `(type:creature type:legendary) usd<=${jankPrice} o:/Partner(?! with)/ name:/^(?!.*${result.name}).*/`,
      noSilliness,
    );
  } else if (
    result.oracle_text &&
    result.oracle_text.lastIndexOf("\nChoose a Background ") >= 0
  ) {
    console.log("needs a background");
    partner = await getRandom(
      `(type:background) usd<=${jankPrice} `,
      noSilliness,
    );
  } else if (
    result.oracle_text && result.oracle_text.includes("Doctor's companion")
  ) {
    console.log("is a doctors companion");
    partner = await getRandom(
      `(type:creature type:legendary) usd<=${jankPrice} (type:doctor type:time type:lord)`,
      noSilliness,
    );
  } else if (
    result.type_line &&
    result.type_line.includes("Time Lord") &&
    result.type_line.includes("Doctor")
  ) {
    console.log("is a Time Lord Doctor");
    partner = await getRandom(
      `(type:creature type:legendary) usd<=${jankPrice} oracle:Doctor's oracle:Companion`,
      noSilliness,
    );
  }

  partner = partner
    ? makeCard(
      partner.name,
      // @ts-expect-error: Object is possibly 'null'.
      partner.card_faces[0].image_uris.normal,
      // @ts-expect-error: Object is possibly 'null'.
      partner.prices.usd ? partner.prices.usd : partner.prices.usd_foil,
    )
    : undefined;

  const fetchTime = format(new Date(), "MMMM do, yyyy");

  return { card, side2, partner, fetchTime, jankPrice };
}

export type JankTablet = {
  card: ScryCard;
  side2: ScryCard | undefined;
  partner: ScryCard | undefined;
  jankPrice: number;
  fetchTime: string;
};
