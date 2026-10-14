import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout, PublicLayout } from "./components/layout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Forgot from "./pages/Forgot";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import ModuleDetail from "./pages/ModuleDetail";
import Lesson from "./pages/Lesson";
import Hijaiyah from "./pages/Hijaiyah";
import Kamus from "./pages/Kamus";
import Flashcard from "./pages/Flashcard";
import Stories from "./pages/Stories";
import Games from "./pages/Games";
import Progress from "./pages/Progress";
import Leaderboard from "./pages/Leaderboard";
import Achievements from "./pages/Achievements";
import Profile from "./pages/Profile";
import Speaking from "./pages/Speaking";
import Certificate from "./pages/Certificate";
import Teacher from "./pages/Teacher";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/harga" element={<Pricing />} />
        <Route path="/tentang" element={<About />} />
        <Route path="/bantuan" element={<Help />} />
      </Route>

      <Route path="/masuk" element={<Login />} />
      <Route path="/daftar" element={<Register />} />
      <Route path="/lupa-sandi" element={<Forgot />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/kelas" element={<Teacher />} />

      <Route element={<AppLayout />}>
        <Route path="/app" element={<Navigate to="/app/belajar" replace />} />
        <Route path="/app/belajar" element={<Dashboard />} />
        <Route path="/app/belajar/:slug" element={<ModuleDetail />} />
        <Route path="/app/pelajaran/:moduleId/:lessonId" element={<Lesson />} />
        <Route path="/app/hijaiyah" element={<Hijaiyah />} />
        <Route path="/app/kamus" element={<Kamus />} />
        <Route path="/app/berbicara" element={<Speaking />} />
        <Route path="/app/flashcard" element={<Flashcard />} />
        <Route path="/app/cerita" element={<Stories />} />
        <Route path="/app/latihan" element={<Games />} />
        <Route path="/app/progres" element={<Progress />} />
        <Route path="/app/peringkat" element={<Leaderboard />} />
        <Route path="/app/pencapaian" element={<Achievements />} />
        <Route path="/app/profil" element={<Profile />} />
        <Route path="/app/sertifikat" element={<Certificate />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
