# 🍳 Manware Cooked (MyAnimeList AI Roaster)

A full-stack, viral application that fetches a user's MyAnimeList profile/watch history and delivers a hilarious, hyper-personalized roast using an LLM, paired with a shareable graphic card.

## 🏗️ Architecture & Milestone Dependency Graph

```mermaid
flowchart TD
    M1["Milestone 1: Project Scaffolding & System Architecture<br/><b>(COMPLETED)</b>"]
    
    M2["Milestone 2: MyAnimeList OAuth 2.0 PKCE Engine<br/><i>Code challenge, login redirect, callback route, token exchange & session</i>"]
    
    M3["Milestone 3: MAL Ingestion & Profile Aggregator<br/><i>Fetch user profile, paginate animelist, handle rate limits, aggregate metrics</i>"]
    
    M4["Milestone 4: Anime Taste Profiler & Archetype Classifier<br/><i>Score variance, dropped ratio, guilty pleasures, archetype assignment</i>"]
    
    M5["Milestone 5: LLM Roasting Engine & Prompt Engineering<br/><i>System persona calibration, dynamic context assembly, structured JSON roast output</i>"]
    
    M6["Milestone 6: Viral Cyberpunk/Anime UI & Reveal Flow<br/><i>Interactive roast step-by-step reveal, spicy burns, stats cards</i>"]
    
    M7["Milestone 7: Social Share Card Generator & Deployment<br/><i>Dynamic exportable card (PNG), meta tags, production deploy & audit</i>"]

    M1 --> M2
    M2 --> M3
    M3 --> M4
    M4 --> M5
    M5 --> M6
    M4 --> M7
    M6 --> M7
```

## 🚀 Getting Started

1. Copy `.env.local.example` to `.env.local` and configure your credentials:
   - `MAL_CLIENT_ID`
   - `MAL_CLIENT_SECRET` (optional if using pure PKCE)
   - `NEXT_PUBLIC_APP_URL` (`http://localhost:3000`)
   - `SESSION_SECRET`
   - `GEMINI_API_KEY`
2. Run test suites:
   ```bash
   npm test
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
