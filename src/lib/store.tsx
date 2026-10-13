import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ACHIEVEMENTS } from "./data";
import { todayKey } from "./utils";

/* ------------------------------- Types ---------------------------------- */
export type ThemeMode = "light" | "dark" | "system";

export type Settings = {
  theme: ThemeMode;
  translit: boolean;
  harakat: boolean;
  rate: number;
  lang: "id" | "en";
  reminders: boolean;
  remindAt: string;
  soundEffects: boolean;
};

export type HistoryEntry = { date: string; xp: number };

export type Progress = {
  completedLessons: string[];
  learnedWords: string[];
  weakWords: string[];
  storiesRead: string[];
  favorites: string[];
  flashcards: string[];
  xp: number;
  streak: number;
  bestStreak: number;
  lastActive: string | null;
  history: HistoryEntry[];
  accuracy: number;
  quizzes: number;
};

export type User = {
  name: string;
  email: string;
  avatar: string;
  goals: string[];
  dailyMinutes: number;
  onboarded: boolean;
};

type Persisted = {
  user: User | null;
  progress: Progress;
  settings: Settings;
};

type Ctx = {
  user: User | null;
  progress: Progress;
  settings: Settings;
  level: number;
  unlockedBadges: string[];
  login: (email: string, name?: string) => void;
  register: (name: string, email: string) => void;
  logout: () => void;
  completeOnboarding: (data: Pick<User, "goals" | "dailyMinutes">) => void;
  setAvatar: (emoji: string) => void;
  addXp: (n: number) => void;
  completeLesson: (lessonId: string, learnedWordIds: string[], accuracy: number, xp: number) => void;
  markWeak: (wordId: string) => void;
  markKnown: (wordId: string) => void;
  toggleFavorite: (wordId: string) => void;
  addFlashcard: (wordId: string) => void;
  readStory: (id: string) => void;
  update: (patch: Partial<Progress>) => void;
  setSettings: (patch: Partial<Settings>) => void;
  toggleTheme: () => void;
  resetProgress: () => void;
  isLessonDone: (id: string) => boolean;
  moduleProgress: (moduleId: string, lessonIds: string[]) => number;
};

const KEY = "lughati.v1";

const defaultSettings: Settings = {
  theme: "system",
  translit: true,
  harakat: true,
  rate: 1,
  lang: "id",
  reminders: true,
  remindAt: "19:30",
  soundEffects: true,
};

const defaultProgress: Progress = {
  completedLessons: [],
  learnedWords: [],
  weakWords: [],
  storiesRead: [],
  favorites: [],
  flashcards: [],
  xp: 0,
  streak: 0,
  bestStreak: 0,
  lastActive: null,
  history: [],
  accuracy: 0,
  quizzes: 0,
};

function load(): Persisted {
  if (typeof localStorage === "undefined") {
    return { user: null, progress: defaultProgress, settings: defaultSettings };
  }
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) throw new Error("empty");
    const parsed = JSON.parse(raw) as Partial<Persisted>;
    return {
      user: parsed.user ?? null,
      progress: { ...defaultProgress, ...parsed.progress },
      settings: { ...defaultSettings, ...parsed.settings },
    };
  } catch {
    return { user: null, progress: defaultProgress, settings: defaultSettings };
  }
}

const AppContext = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const initial = useRef(load());
  const [user, setUser] = useState<User | null>(initial.current.user);
  const [progress, setProgress] = useState<Progress>(initial.current.progress);
  const [settings, setSettingsState] = useState<Settings>(initial.current.settings);

  /* persist */
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ user, progress, settings }));
    } catch {
      /* ignore quota errors */
    }
  }, [user, progress, settings]);

  /* apply theme */
  useEffect(() => {
    const root = document.documentElement;
    const apply = () => {
      const dark =
        settings.theme === "dark" ||
        (settings.theme === "system" &&
          window.matchMedia?.("(prefers-color-scheme: dark)").matches);
      root.classList.toggle("dark", !!dark);
    };
    apply();
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    mq?.addEventListener?.("change", apply);
    return () => mq?.removeEventListener?.("change", apply);
  }, [settings.theme]);

  const update = useCallback((patch: Partial<Progress>) => {
    setProgress((p) => ({ ...p, ...patch }));
  }, []);

  const addXp = useCallback((n: number) => {
    setProgress((p) => {
      const key = todayKey();
      const history = [...p.history];
      const idx = history.findIndex((h) => h.date === key);
      if (idx >= 0) history[idx] = { ...history[idx], xp: history[idx].xp + n };
      else history.push({ date: key, xp: n });
      return { ...p, xp: p.xp + n, history: history.slice(-90) };
    });
  }, []);

  const touchStreak = useCallback(() => {
    setProgress((p) => {
      const today = todayKey();
      if (p.lastActive === today) return p;
      const yesterday = todayKey(new Date(Date.now() - 86400000));
      const streak = p.lastActive === yesterday ? p.streak + 1 : 1;
      return {
        ...p,
        streak,
        bestStreak: Math.max(p.bestStreak, streak),
        lastActive: today,
      };
    });
  }, []);

  const completeLesson = useCallback(
    (lessonId: string, learnedWordIds: string[], accuracy: number, xp: number) => {
      setProgress((p) => {
        const completedLessons = p.completedLessons.includes(lessonId)
          ? p.completedLessons
          : [...p.completedLessons, lessonId];
        const learned = new Set([...p.learnedWords, ...learnedWordIds]);
        const weakSet = new Set(p.weakWords.filter((w) => !learnedWordIds.includes(w)));
        const totalQuizzes = p.quizzes + 1;
        const newAccuracy = Math.round((p.accuracy * p.quizzes + accuracy) / totalQuizzes);
        const key = todayKey();
        const history = [...p.history];
        const idx = history.findIndex((h) => h.date === key);
        if (idx >= 0) history[idx] = { ...history[idx], xp: history[idx].xp + xp };
        else history.push({ date: key, xp });
        return {
          ...p,
          completedLessons,
          learnedWords: [...learned],
          weakWords: [...weakSet],
          xp: p.xp + xp,
          accuracy: newAccuracy,
          quizzes: totalQuizzes,
          history: history.slice(-90),
        };
      });
      touchStreak();
    },
    [touchStreak],
  );

  const markWeak = useCallback((wordId: string) => {
    setProgress((p) =>
      p.weakWords.includes(wordId) ? p : { ...p, weakWords: [...p.weakWords, wordId] },
    );
  }, []);

  const markKnown = useCallback((wordId: string) => {
    setProgress((p) => ({
      ...p,
      weakWords: p.weakWords.filter((w) => w !== wordId),
      learnedWords: p.learnedWords.includes(wordId)
        ? p.learnedWords
        : [...p.learnedWords, wordId],
    }));
  }, []);

  const toggleFavorite = useCallback((wordId: string) => {
    setProgress((p) => ({
      ...p,
      favorites: p.favorites.includes(wordId)
        ? p.favorites.filter((w) => w !== wordId)
        : [...p.favorites, wordId],
    }));
  }, []);

  const addFlashcard = useCallback((wordId: string) => {
    setProgress((p) =>
      p.flashcards.includes(wordId)
        ? p
        : { ...p, flashcards: [...p.flashcards, wordId] },
    );
  }, []);

  const readStory = useCallback((id: string) => {
    setProgress((p) =>
      p.storiesRead.includes(id)
        ? p
        : { ...p, storiesRead: [...p.storiesRead, id], xp: p.xp + 30 },
    );
  }, []);

  const setSettings = useCallback((patch: Partial<Settings>) => {
    setSettingsState((s) => ({ ...s, ...patch }));
  }, []);

  const toggleTheme = useCallback(() => {
    setSettingsState((s) => {
      const isDark =
        s.theme === "dark" ||
        (s.theme === "system" &&
          typeof window !== "undefined" &&
          window.matchMedia?.("(prefers-color-scheme: dark)").matches);
      return { ...s, theme: isDark ? "light" : "dark" };
    });
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
  }, []);

  const login = useCallback((email: string, name?: string) => {
    setUser((u) => ({
      name: name || u?.name || email.split("@")[0] || "Sahabat Lughati",
      email,
      avatar: u?.avatar || "🙂",
      goals: u?.goals || [],
      dailyMinutes: u?.dailyMinutes || 10,
      onboarded: u?.onboarded ?? true,
    }));
  }, []);

  const register = useCallback((name: string, email: string) => {
    setUser({ name, email, avatar: "🙂", goals: [], dailyMinutes: 10, onboarded: false });
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const setAvatar = useCallback((emoji: string) => {
    setUser((u) => (u ? { ...u, avatar: emoji } : u));
  }, []);

  const completeOnboarding = useCallback(
    (data: Pick<User, "goals" | "dailyMinutes">) => {
      setUser((u) =>
        u
          ? { ...u, ...data, onboarded: true }
          : {
              name: "Sahabat Lughati",
              email: "tamu@lughati.app",
              avatar: "🙂",
              ...data,
              onboarded: true,
            },
      );
    },
    [],
  );

  const level = useMemo(() => Math.floor(progress.xp / 300) + 1, [progress.xp]);

  const unlockedBadges = useMemo(() => {
    const stats: Record<string, number> = {
      lessons: progress.completedLessons.length,
      words: progress.learnedWords.length,
      streak: progress.bestStreak,
      xp: progress.xp,
      stories: progress.storiesRead.length,
    };
    return ACHIEVEMENTS.filter((a) => (stats[a.metric] ?? 0) >= a.goal).map((a) => a.id);
  }, [progress]);

  const isLessonDone = useCallback(
    (id: string) => progress.completedLessons.includes(id),
    [progress.completedLessons],
  );

  const moduleProgress = useCallback(
    (_moduleId: string, lessonIds: string[]) => {
      if (!lessonIds.length) return 0;
      const done = lessonIds.filter((id) => progress.completedLessons.includes(id)).length;
      return Math.round((done / lessonIds.length) * 100);
    },
    [progress.completedLessons],
  );

  const value: Ctx = {
    user,
    progress,
    settings,
    level,
    unlockedBadges,
    login,
    register,
    logout,
    completeOnboarding,
    setAvatar,
    addXp,
    completeLesson,
    markWeak,
    markKnown,
    toggleFavorite,
    addFlashcard,
    readStory,
    update,
    setSettings,
    toggleTheme,
    resetProgress,
    isLessonDone,
    moduleProgress,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): Ctx {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp harus dipakai di dalam <AppProvider>");
  return ctx;
}
