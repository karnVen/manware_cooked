/**
 * MyAnimeList API v2 & OAuth 2.0 PKCE Data Contracts
 * Official documentation: https://myanimelist.net/apiconfig/references/api/v2
 */

export interface PKCECodes {
  codeVerifier: string;
  codeChallenge: string;
  state: string;
}

export interface MALTokens {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
  created_at?: number; // Epoch timestamp (ms) when stored
}

export interface MALUserStatistics {
  num_items_watching: number;
  num_items_completed: number;
  num_items_on_hold: number;
  num_items_dropped: number;
  num_items_plan_to_watch: number;
  num_items: number;
  num_days_watched: number;
  num_days_watching: number;
  num_days_completed: number;
  num_days_on_hold: number;
  num_days_dropped: number;
  num_days: number;
  mean_score: number;
}

export interface MALUser {
  id: number;
  name: string;
  picture?: string;
  gender?: string;
  birthday?: string;
  location?: string;
  joined_at?: string;
  anime_statistics?: MALUserStatistics;
}

export interface MALGenre {
  id: number;
  name: string;
}

export interface MALAnimePicture {
  medium?: string;
  large?: string;
}

export type MALWatchStatus =
  | "watching"
  | "completed"
  | "on_hold"
  | "dropped"
  | "plan_to_watch";

export interface MALAnimeListStatus {
  status: MALWatchStatus;
  score: number; // 0 to 10 (0 means unrated)
  num_watched_episodes: number;
  is_rewatching: boolean;
  updated_at: string;
}

export interface MALAnimeNode {
  id: number;
  title: string;
  main_picture?: MALAnimePicture;
  mean?: number; // Community global rating
  genres?: MALGenre[];
  num_episodes?: number;
  media_type?: string;
  status?: string;
}

export interface MALUserAnimeEntry {
  node: MALAnimeNode;
  list_status: MALAnimeListStatus;
}

export interface MALUserAnimeListResponse {
  data: MALUserAnimeEntry[];
  paging: {
    next?: string;
    previous?: string;
  };
}
