/**
 * LLM Roast Output & Share Card Contracts
 */

import { AnimeArchetype } from "./metrics";

export type RoastIntensity = "mild" | "spicy" | "apocalyptic";

export interface RoastCardData {
  username: string;
  avatarUrl?: string;
  archetype: AnimeArchetype;
  archetypeTagline: string;
  tasteRating: string; // e.g. "D-", "Unsalvageable", "Terminal Weeb"
  topOffense: string; // The single most unhinged stat/score
  punchline: string; // Short 1-2 sentence roast for Twitter/Discord preview
  daysWasted: number;
}

export interface RoastResponse {
  headline: string;
  archetype: AnimeArchetype;
  roastPoints: string[]; // 3-4 sequential savage burns
  guiltyPleasureCallout?: string;
  droppedAnimeCallout?: string;
  verdict: {
    letterGrade: string; // e.g. "F+"
    diagnosis: string;
    recommendedRemedy: string; // e.g. "Touch grass immediately"
  };
  card: RoastCardData;
}
