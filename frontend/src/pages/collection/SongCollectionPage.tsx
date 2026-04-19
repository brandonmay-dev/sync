import Topbar from "@/components/Topbar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { ArrowLeft, Clock, Pause, Play, TrendingUp, WandSparkles } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

type SongCollectionSection = "made-for-you" | "trending";

const SECTION_CONFIG: Record<
  SongCollectionSection,
  {
    title: string;
    subtitle: string;
    icon: typeof WandSparkles;
    gradient: string;
  }
> = {
  "made-for-you": {
    title: "Made For You",
    subtitle:
      "A dedicated stream of recommendations that keep the vibe going when you want more than the homepage preview.",
    icon: WandSparkles,
    gradient: "from-emerald-500/25 via-sky-500/10 to-transparent",
  },
  trending: {
    title: "Trending",
    subtitle:
      "A fuller look at what is popping right now, with the whole section ready to play in one shot.",
    icon: TrendingUp,
    gradient: "from-orange-500/25 via-rose-500/10 to-transparent",
  },
};

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${mins}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const SongCollectionPage = ({
  section,
}: {
  section: SongCollectionSection;
}) => {
  const {
    madeForYouSongs,
    trendingSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs,
    isLoading,
    error,
  } = useMusicStore();
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

  const config = SECTION_CONFIG[section];
  const songs = section === "made-for-you" ? madeForYouSongs : trendingSongs;
  const fetchSongs =
    section === "made-for-you" ? fetchMadeForYouSongs : fetchTrendingSongs;
  const SectionIcon = config.icon;

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  const isCurrentSectionSelected = songs.some(
    (song) => song._id === currentSong?._id,
  );

  const handlePlaySection = () => {
    if (songs.length === 0) return;

    if (isCurrentSectionSelected) {
      togglePlay();
      return;
    }

    playAlbum(songs, 0);
  };

  const handlePlaySong = (index: number) => {
    if (songs.length === 0) return;

    playAlbum(songs, index);
  };

  return (
    <main className="rounded-md overflow-hidden h-full bg-linear-to-b from-zinc-800 to-zinc-900">
      <Topbar />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="relative min-h-full">
          <div
            className={`absolute inset-0 bg-linear-to-b ${config.gradient} via-zinc-900/55 to-zinc-900 pointer-events-none`}
            aria-hidden="true"
          />

          <div className="relative z-10 p-4 sm:p-6">
            <div className="mb-6 flex flex-col gap-6 sm:mb-8">
              <Button
                asChild
                variant="ghost"
                className="w-fit px-0 text-zinc-400 hover:bg-transparent hover:text-white"
              >
                <Link to="/">
                  <ArrowLeft className="mr-2 size-4" />
                  Back home
                </Link>
              </Button>

              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-zinc-300">
                    <SectionIcon className="size-3.5" />
                    Song Section
                  </div>
                  <div className="space-y-3">
                    <h1 className="text-3xl font-bold sm:text-5xl">
                      {config.title}
                    </h1>
                    <p className="max-w-2xl text-sm text-zinc-300 sm:text-base">
                      {config.subtitle}
                    </p>
                    <p className="text-sm text-zinc-400">
                      {songs.length} songs ready to play
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handlePlaySection}
                  size="lg"
                  className="h-12 rounded-full bg-green-500 px-6 text-black hover:bg-green-400"
                  disabled={songs.length === 0}
                >
                  {isCurrentSectionSelected && isPlaying ? (
                    <Pause className="mr-2 size-5" />
                  ) : (
                    <Play className="mr-2 size-5" />
                  )}
                  Play section
                </Button>
              </div>
            </div>

            {error && songs.length === 0 ? (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
                {error}
              </div>
            ) : isLoading && songs.length === 0 ? (
              <div className="rounded-xl border border-white/5 bg-black/20 p-6 text-sm text-zinc-400">
                Loading songs...
              </div>
            ) : (
              <div className="rounded-2xl bg-black/20 backdrop-blur-sm">
                <div className="grid grid-cols-[16px_minmax(0,1fr)_auto] gap-4 border-b border-white/5 px-6 py-3 text-sm text-zinc-400 md:grid-cols-[16px_minmax(0,4fr)_minmax(0,2fr)_auto]">
                  <div>#</div>
                  <div>Title</div>
                  <div className="hidden md:block">Added</div>
                  <div>
                    <Clock className="size-4" />
                  </div>
                </div>

                <div className="px-3 py-3 sm:px-4">
                  <div className="space-y-1">
                    {songs.map((song, index) => {
                      const isCurrentSong = currentSong?._id === song._id;

                      return (
                        <div
                          key={song._id}
                          onClick={() => handlePlaySong(index)}
                          className="group grid cursor-pointer grid-cols-[16px_minmax(0,1fr)_auto] gap-4 rounded-xl px-3 py-3 text-sm text-zinc-300 transition-colors hover:bg-white/5 md:grid-cols-[16px_minmax(0,4fr)_minmax(0,2fr)_auto]"
                        >
                          <div className="flex items-center justify-center">
                            {isCurrentSong && isPlaying ? (
                              <span className="text-green-500">♫</span>
                            ) : (
                              <>
                                <span className="group-hover:hidden">
                                  {index + 1}
                                </span>
                                <Play className="hidden size-4 group-hover:block" />
                              </>
                            )}
                          </div>

                          <div className="flex min-w-0 items-center gap-3">
                            <img
                              src={song.imageUrl}
                              alt={song.title}
                              className="size-12 rounded-md object-cover"
                            />
                            <div className="min-w-0">
                              <div className="truncate font-medium text-white">
                                {song.title}
                              </div>
                              <div className="truncate text-zinc-400">
                                {song.artist}
                              </div>
                            </div>
                          </div>

                          <div className="hidden items-center text-zinc-400 md:flex">
                            {song.createdAt.split("T")[0]}
                          </div>

                          <div className="flex items-center text-zinc-400">
                            {formatDuration(song.duration)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};

export default SongCollectionPage;
