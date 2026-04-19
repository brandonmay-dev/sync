import { useAuthStore } from "@/stores/useAuthStore";
import { Button } from "@/components/ui/button";
import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import { Album, Loader, Music, ShieldX } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SongsTabContent from "./components/SongsTabContent";
import AlbumsTabContent from "./components/AlbumsTabContent";
import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const AdminPage = () => {
  const { isAdmin, isLoading, error } = useAuthStore();
  const { user } = useUser();

  const { fetchAlbums, fetchSongs, fetchStats } = useMusicStore();

  useEffect(() => {
    if (!isAdmin) return;

    fetchAlbums();
    fetchSongs();
    fetchStats();
  }, [fetchAlbums, fetchSongs, fetchStats, isAdmin]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader className="size-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="max-w-md text-center space-y-6">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-red-500/10">
            <ShieldX className="size-8 text-red-400" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Admin access required</h1>
            <p className="text-zinc-400">
              This route is working, but the current account does not have admin
              permissions in the backend check.
            </p>
            {error && <p className="text-sm text-red-300">{error}</p>}
            {user?.primaryEmailAddress?.emailAddress && (
              <p className="text-sm text-zinc-500">
                Signed in as {user.primaryEmailAddress.emailAddress}
              </p>
            )}
          </div>
          <div className="flex items-center justify-center gap-3">
            <Link to="/">
              <Button variant="outline">Back Home</Button>
            </Link>
            <Link to="/auth-callback">
              <Button>Refresh Session</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-linear-to-b from-zinc-900 via-zinc-900
   to-black text-zinc-100 p-8"
    >
      <Header />

      <DashboardStats />

      <Tabs defaultValue="songs" className="space-y-6">
        <TabsList className="p-1 bg-zinc-800/50">
          <TabsTrigger
            value="songs"
            className="data-[state=active]:bg-zinc-700"
          >
            <Music className="mr-2 size-4" />
            Songs
          </TabsTrigger>
          <TabsTrigger
            value="albums"
            className="data-[state=active]:bg-zinc-700"
          >
            <Album className="mr-2 size-4" />
            Albums
          </TabsTrigger>
        </TabsList>

        <TabsContent value="songs">
          <SongsTabContent />
        </TabsContent>
        <TabsContent value="albums">
          <AlbumsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default AdminPage;
