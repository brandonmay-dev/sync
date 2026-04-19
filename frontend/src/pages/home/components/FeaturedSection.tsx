import FeaturedGridSkeleton from "@/components/skeletons/FeaturedGridSkeleton";
import { cn } from "@/lib/utils";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Pause, Play } from "lucide-react";

const FeaturedSection = () => {
  const { isLoading, featuredSongs, error } = useMusicStore();
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

  if (isLoading) return <FeaturedGridSkeleton />;

  if (error) return <div className="text-red-500 mb-4 text-lg">{error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {featuredSongs.map((song, index) => {
        const isCurrentSong = currentSong?._id === song._id;

        const handleSongClick = () => {
          if (isCurrentSong) {
            togglePlay();
            return;
          }

          playAlbum(featuredSongs, index);
        };

        return (
          <button
            type="button"
          key={song._id}
            onClick={handleSongClick}
            className={cn(
              "group flex items-center overflow-hidden rounded-md bg-zinc-800/50 text-left transition-colors hover:bg-zinc-700/50 cursor-pointer",
              isCurrentSong && "bg-zinc-700/70 ring-1 ring-white/10",
            )}
            aria-label={`${isCurrentSong && isPlaying ? "Pause" : "Play"} ${song.title} by ${song.artist}`}
          >
            <div className="relative shrink-0">
              <img
                src={song.imageUrl}
                alt={song.title}
                className="w-16 sm:w-20 h-16 sm:h-20 object-cover"
              />
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center bg-black/45 transition-opacity",
                  isCurrentSong
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100",
                )}
                aria-hidden="true"
              >
                {isCurrentSong && isPlaying ? (
                  <Pause className="size-5 text-white" />
                ) : (
                  <Play className="size-5 text-white" />
                )}
              </div>
            </div>
            <div className="flex-1 p-4">
              <p className="font-medium truncate">{song.title}</p>
              <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default FeaturedSection;
