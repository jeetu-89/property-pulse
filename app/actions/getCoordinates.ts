"use server";

import opencage from "opencage-api-client";

export async function getCoordinates(address: string) {
  const opencageApi = process.env.OPENCAGE_API_KEY;
  if (!opencageApi) {
    throw new Error("Must provide API key of opencage at .env.");
  }
  const res = await opencage.geocode({
    q: address,
    key: opencageApi,
  });
  return res;
}
