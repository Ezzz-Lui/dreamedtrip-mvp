import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import type { TravelerProfile } from "@/lib/types/traveler";
import { itineraryAiSchema } from "@/lib/schemas/itinerary-ai";
import { CENTRAL_AMERICA_COUNTRIES } from "@/lib/types/traveler";

const COUNTRY_LABELS: Record<string, string> = {
  costa_rica: "Costa Rica",
  guatemala: "Guatemala",
  panama: "Panamá",
  belize: "Belice",
  honduras: "Honduras",
  el_salvador: "El Salvador",
  nicaragua: "Nicaragua",
};

const DESTINATION_LABELS: Record<string, string> = {
  city: "city",
  nature: "nature",
  beach: "beach",
  mixed: "mixed",
};

const BUDGET_LABELS: Record<string, string> = {
  budget: "budget (economical)",
  mid: "mid-range",
  premium: "premium",
};

const PACE_LABELS: Record<string, string> = {
  relaxed: "relaxed",
  balanced: "balanced",
  intense: "intense",
};

export async function POST(request: Request) {
  const googleKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  if (!googleKey && !openaiKey) {
    return Response.json(
      { error: "Set GOOGLE_GENERATIVE_AI_API_KEY or OPENAI_API_KEY in .env" },
      { status: 503 }
    );
  }
  const model = googleKey
    ? google("gemini-2.5-flash")
    : openai("gpt-4o-mini");

  let profile: TravelerProfile;
  try {
    profile = (await request.json()) as TravelerProfile;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const country =
    profile.country && CENTRAL_AMERICA_COUNTRIES.includes(profile.country)
      ? COUNTRY_LABELS[profile.country] ?? profile.country
      : "Costa Rica";
  const days = Math.min(Math.max(Number(profile.days) || 3, 1), 14);
  const budget = BUDGET_LABELS[profile.budget] ?? profile.budget;
  const pace = PACE_LABELS[profile.pace] ?? profile.pace;
  const interests =
    Array.isArray(profile.interests) && profile.interests.length > 0
      ? profile.interests.join(", ")
      : "culture, nature";

  const systemPrompt = `You are a travel expert for Central America. Generate a realistic ${days}-day itinerary for ${country}.
Rules:
- Use REAL places, attractions, hotels, and restaurants that exist in ${country}. Use correct names and real approximate coordinates (lat/lng within the country).
- Budget level: ${budget}. Adjust price estimates (in USD) accordingly.
- Pace: ${pace}. Adjust number of stops per day (relaxed: 2-3, balanced: 4-5, intense: 5-6).
- Interests: ${interests}. Prioritize activities and places that match these.
- Each day must have at least one stop. Stops must have: placeId (unique, e.g. "stop-1-0"), name, lat, lng (real coordinates in ${country}), type (one of: hotel, restaurant, activity, attraction, transport, guide), optional price (USD), optional duration (minutes), optional description.
- transportBetweenStops: for each consecutive pair of stops in a day, add one segment with fromStopId, toStopId, mode (walk/taxi/transit), optional durationMinutes and price.
- summary: totalEstimatedCost (sum of all stop prices and transport), totalDays: ${days}, destinationLabel: "${country}".
- Use real city/region coordinates for ${country} (e.g. Costa Rica: lat 9-11, lng -85 to -82; Guatemala: lat 14-17, lng -92 to -88; Panama: lat 7-10, lng -83 to -77; Belize: lat 15-18, lng -89 to -87; Honduras: lat 13-16, lng -89 to -83; El Salvador: lat 13-14.5, lng -90 to -87; Nicaragua: lat 11-15, lng -87 to -83).`;

  const userPrompt = `Generate the ${days}-day itinerary for ${country} as JSON matching the schema.`;

  try {
    const { object } = await generateObject({
      model,
      schema: itineraryAiSchema,
      system: systemPrompt,
      prompt: userPrompt,
    });

    return Response.json({ itinerary: object });
  } catch (err) {
    console.error("AI itinerary generate error:", err);
    return Response.json(
      { error: err instanceof Error ? err.message : "Generation failed" },
      { status: 500 }
    );
  }
}
