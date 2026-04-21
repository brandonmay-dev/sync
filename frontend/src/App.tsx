import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { Toaster } from "react-hot-toast";

const HomePage = lazy(() => import("./pages/home/HomePage"));
const AuthCallbackPage = lazy(
  () => import("./pages/auth-callback/AuthCallbackPage"),
);
const MainLayout = lazy(() => import("./layout/MainLayout"));
const ChatPage = lazy(() => import("./pages/chat/ChatPage"));
const AlbumPage = lazy(() => import("./pages/album/AlbumPage"));
const AdminPage = lazy(() => import("./pages/admin/AdminPage"));
const SignInPage = lazy(() => import("./pages/sign-in/SignInPage"));
const SignUpPage = lazy(() => import("./pages/sign-up/SignUpPage"));
const SongCollectionPage = lazy(() => import("./pages/collection/SongCollectionPage"));
const NotFoundPage = lazy(() => import("./pages/404/NotFoundPage"));

const RouteFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-zinc-900 text-zinc-300">
    Loading...
  </div>
);

function App() {
  return (
    <>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/sign-in/*" element={<SignInPage />} />
          <Route path="/sign-up/*" element={<SignUpPage />} />
          <Route path="/auth-callback" element={<AuthCallbackPage />} />
          <Route path="/admin" element={<AdminPage />} />

          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route
              path="/made-for-you"
              element={<SongCollectionPage section="made-for-you" />}
            />
            <Route
              path="/trending"
              element={<SongCollectionPage section="trending" />}
            />
            <Route path="/albums/:albumId" element={<AlbumPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster />
    </>
  );
}

export default App;
