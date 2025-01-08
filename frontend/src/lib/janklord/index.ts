import { format } from "date-fns";

import { getExactByName, getJank, getRandom } from "@/lib/scryfall";

function extractPartnerWithName(text: string) {
  const partnerWithPattern = /Partner with ([^()]+) \(/;
  const match = text.match(partnerWithPattern);
  return match ? match[1].trim() : null;
}

export async function rollJanklord(jankPrice: number) {
  const result = await getJank(jankPrice); // 4
  // const result = await getExactByName("Brallin, Skyshark Rider");
  // const result = await getExactByName("Amy Pond");
  // const result = await getExactByName("The Eighth Doctor"); //1
  // const result = await getExactByName("Alena, Kessig Trapper"); //2

  let secondFace = null;

  if (result.name.includes(" // ")) {
    const halves = result.name.split(" // ");
    result.name = halves[0];
    secondFace = {
      name: halves[1],
      url: result.card_faces[1].image_uris.normal,
      price: 0,
    };
  }

  function makeCard(name: string, url: string, price: number) {
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

  let card = makeCard(
    result.name,
    result.card_faces[0].image_uris.normal,
    result.prices.usd ? result.prices.usd : result.prices.usd_foil,
  );

  const side2 = secondFace
    ? makeCard(secondFace.name, secondFace.url, secondFace.price)
    : undefined;

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
    );
  }
  if (result.oracle_text && result.oracle_text.includes("Doctor's companion")) {
    console.log("is a doctors companion");
    partner = await getRandom(
      `(type:creature type:legendary) usd<=${jankPrice} (type:doctor type:time type:lord)`,
    );
  } else if (
    result.type_line &&
    result.type_line.includes("Time Lord") &&
    result.type_line.includes("Doctor")
  ) {
    console.log("is a Time Lord Doctor");
    partner = await getRandom(
      `(type:creature type:legendary) usd<=${jankPrice} oracle:Doctor's oracle:Companion`,
    );
  }

  partner = partner
    ? makeCard(
      partner.name,
      partner.card_faces[0].image_uris.normal,
      partner.prices.usd ? partner.prices.usd : partner.prices.usd_foil,
    )
    : undefined;

  const fetchTime = format(new Date(), "MMMM do, yyyy");

  return { card, side2, partner, fetchTime };
}
