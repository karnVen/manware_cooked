/**
 * Aggregated Anime Taste & Statistics Contracts
 */

export interface GenreStat {
  genre: string;
  count: number;
  meanScore: number;
}

export interface ScoreDistribution {
  // Score 1 through 10 counts, plus 0 (unrated)
  [score: number]: number;
}

export interface ControversialTake {
  animeId: number;
  title: string;
  userScore: number;
  communityMean: number;
  delta: number; // userScore - communityMean
  type: "hot_take" | "guilty_pleasure"; // hot_take: rated way lower than community; guilty_pleasure: rated way higher than trash
}

export interface DroppedAnimeInsight {
  animeId: number;
  title: string;
  episodesWatched: number;
  totalEpisodes?: number;
}

export type AnimeArchetype =
  | "Isekai Slime Consumer"
  | "Shonen Nostalgia Merchant"
  | "Pretentious Elitist Gatekeeper"
  | "Slice-of-Life Escapist"
  | "Indecisive Season Hopper"
  | "Merciless Serial Dropper"
  | "Everything is a 10/10 Enthusiast"
  | "Mid Enjoyer";

export interface ArchetypeProfile {
  archetype: AnimeArchetype;
  confidenceScore: number; // 0.0 - 1.0
  tagline: string;
  primaryTrait: string;
  secondaryTrait: string;
}

export interface AggregatedUserTaste {
  username: string;
  daysWatched: number;
  totalCompleted: number;
  totalDropped: number;
  dropRatePercentage: number;
  userMeanScore: number;
  communityScoreDelta: number; // userMeanScore - globalCommunityAverage
  scoreDistribution: ScoreDistribution;
  topGenres: GenreStat[];
  controversialTakes: ControversialTake[];
  notableDropped: DroppedAnimeInsight[];
  archetype: ArchetypeProfile;
}
