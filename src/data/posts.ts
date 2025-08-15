export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  subreddit: string;
  upvotes: number;
  comments: number;
  timeAgo: string;
}

export const mockPosts: Post[] = [
  {
    id: 1,
    title: "Vad tycker ni om den nya Next.js 15?",
    content: "Jag har precis uppgraderat mitt projekt till Next.js 15 och är imponerad av förbättringarna. Turbopack är mycket snabbare och App Router har blivit ännu mer stabil. Vad har ni för erfarenheter?",
    author: "dev_swede",
    subreddit: "nextjs",
    upvotes: 127,
    comments: 23,
    timeAgo: "2 timmar sedan"
  },
  {
    id: 2,
    title: "Tips för att lära sig TypeScript?",
    content: "Jag har programmerat JavaScript i flera år men känner att det är dags att lära sig TypeScript. Har ni några bra resurser eller tips för att komma igång? Särskilt intresserad av React + TypeScript.",
    author: "js_learner",
    subreddit: "typescript",
    upvotes: 89,
    comments: 45,
    timeAgo: "5 timmar sedan"
  },
  {
    id: 3,
    title: "Bästa sättet att hantera state i React 2024?",
    content: "Med alla nya hooks och bibliotek som kommer ut, vad använder ni för state management? Zustand, Redux Toolkit, eller bara useState/useReducer? Dela gärna era erfarenheter!",
    author: "react_dev",
    subreddit: "reactjs",
    upvotes: 203,
    comments: 67,
    timeAgo: "1 dag sedan"
  },
  {
    id: 4,
    title: "Hur gör ni för att hålla er kodbas ren?",
    content: "Jag arbetar på ett större projekt och märker att koden blir rörig över tid. Vilka strategier använder ni för att hålla er kodbas organiserad och underhållbar?",
    author: "clean_coder",
    subreddit: "programming",
    upvotes: 156,
    comments: 34,
    timeAgo: "3 dagar sedan"
  },
  {
    id: 5,
    title: "Hur gör ni för att adfla er kodbas ren?",
    content: "Jag arbetar på ett större projekt och märker att koden blir rörig över tid. Vilka strategier använder ni för att hålla er kodbas organiserad och underhållbar?",
    author: "clean_coder",
    subreddit: "programming",
    upvotes: 156,
    comments: 34,
    timeAgo: "3 dagar sedan"
  }
];
