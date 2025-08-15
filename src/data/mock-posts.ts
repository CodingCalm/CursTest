import { Post } from '@/types/post';

// Mock data for development and testing
export const mockPostsData: Post[] = [
  {
    id: 1,
    title: "Vad tycker ni om den nya Next.js 15?",
    content: "Jag har precis uppgraderat mitt projekt till Next.js 15 och är imponerad av förbättringarna. Turbopack är mycket snabbare än Webpack och App Router har blivit ännu mer stabil. Den nya Partial Prerendering-funktionen är fantastisk för prestanda. Jag märker att sidorna laddar mycket snabbare nu, särskilt på mobil. TypeScript-stödet har också förbättrats avsevärt. Den nya Image-komponenten med bättre optimering är också värd att nämna. Har någon testat den nya Server Actions-funktionen än? Jag funderar på att implementera det i mitt projekt. Dessutom verkar den nya routing-systemet vara mer intuitivt. Vad har ni för erfarenheter med uppgraderingen?",
    author: "dev_swede",
    upvotes: 127,
    comments: 23,
    timeAgo: "2 timmar sedan",
    nominations: 5
  },
  {
    id: 2,
    title: "Tips för att lära sig TypeScript?",
    content: "Jag har programmerat JavaScript i flera år men känner att det är dags att lära sig TypeScript. Jag har redan kollat på TypeScript-dokumentationen men känner mig fortfarande osäker. Har ni några bra resurser eller tips för att komma igång? Särskilt intresserad av React + TypeScript. Jag har hört att det kan vara svårt att komma igång med types och interfaces. Finns det några vanliga fallgropar jag borde vara uppmärksam på? Jag har också funderat på att börja med ett mindre projekt för att öva. Vilka typer av projekt rekommenderar ni för en nybörjare? Dessutom undrar jag om det finns några bra verktyg eller IDE-inställningar som gör utvecklingen smidigare.",
    author: "js_learner",
    upvotes: 89,
    comments: 45,
    timeAgo: "5 timmar sedan",
    nominations: 12
  },
  {
    id: 3,
    title: "Bästa sättet att hantera state i React 2024?",
    content: "Med alla nya hooks och bibliotek som kommer ut, vad använder ni för state management? Zustand, Redux Toolkit, eller bara useState/useReducer? Jag har använt Redux i flera år men känner att det kan vara överkill för mindre projekt. Zustand verkar lovande med sin enkelhet. Jag har också hört bra saker om Jotai och Valtio. Vad har ni för erfarenheter med dessa bibliotek? Jag är särskilt intresserad av prestanda och utvecklingsupplevelse. Finns det några nya patterns eller best practices som har dykt upp det senaste året? Jag funderar också på att byta från Redux till något lättare. Har någon gjort den övergången? Dela gärna era erfarenheter!",
    author: "react_dev",
    upvotes: 203,
    comments: 67,
    timeAgo: "1 dag sedan",
    nominations: 8
  },
  {
    id: 4,
    title: "Hur gör ni för att hålla er kodbas ren?",
    content: "Jag arbetar på ett större projekt och märker att koden blir rörig över tid. Vi har flera utvecklare som arbetar på samma kodbas och det blir svårt att hålla koll på alla ändringar. Vilka strategier använder ni för att hålla er kodbas organiserad och underhållbar? Jag har funderat på att implementera mer strikta linting-regler och pre-commit hooks. Vi använder redan TypeScript vilket hjälper en del. Jag har också hört bra saker om monorepo-strukturer för större projekt. Finns det några verktyg eller metoder ni rekommenderar? Jag är särskilt intresserad av hur ni hanterar kodgranskning och dokumentation.",
    author: "clean_coder",
    upvotes: 156,
    comments: 34,
    timeAgo: "3 dagar sedan",
    nominations: 3
  },
  {
    id: 5,
    title: "Bästa sättet att lära sig algoritmer och datastrukturer?",
    content: "Jag har programmerat i några år men känner att jag behöver förbättra min förståelse för algoritmer och datastrukturer. Jag har börjat med LeetCode-problem men känner mig överväldigad. Vilka resurser rekommenderar ni för att lära sig detta systematiskt? Jag har hört att 'Grokking Algorithms' är en bra bok för nybörjare. Finns det några specifika algoritmer eller datastrukturer jag borde fokusera på först? Jag är särskilt intresserad av att förbättra min problemlösningsförmåga för tekniska intervjuer. Har ni några tips för hur man bäst tränar sig på dessa typer av problem? Jag har också funderat på att ta en online-kurs. Vilka plattformar rekommenderar ni?",
    author: "algo_learner",
    upvotes: 89,
    comments: 56,
    timeAgo: "1 vecka sedan",
    nominations: 7
  }
];
