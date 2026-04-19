import { cn } from "@/lib/utils";
import { usePlayerStore } from "@/stores/usePlayerStore";
import type { Song } from "@/types";
import SectionGridSkeleton from "./SectionGridSkeleton";
import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";
import { Link } from "react-router-dom";

type SectionGridProps = {
  title: string;
  songs: Song[];
  isLoading: boolean;
  viewAllPath: string;
};

const SectionGrid = ({
  title,
  songs,
  isLoading,
  viewAllPath,
}: SectionGridProps) => {
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

  if (isLoading) return <SectionGridSkeleton />;

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold sm:text-2xl">{title}</h2>
        <Button
          asChild
          variant="link"
          className="text-sm text-zinc-400 hover:text-white"
        >
          <Link to={viewAllPath}>See all</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {songs.map((song, index) => {
          const isCurrentSong = currentSong?._id === song._id;

          const handleSongClick = () => {
            if (isCurrentSong) {
              togglePlay();
              return;
            }

            playAlbum(songs, index);
          };

          return (
            <button
              type="button"
            key={song._id}
              onClick={handleSongClick}
              className={cn(
                "group rounded-md bg-zinc-800/40 p-4 text-left transition-all hover:bg-zinc-700/40 cursor-pointer",
                isCurrentSong && "bg-zinc-700/55 ring-1 ring-white/10",
              )}
              aria-label={`${isCurrentSong && isPlaying ? "Pause" : "Play"} ${song.title} by ${song.artist}`}
            >
              <div className="relative mb-4">
                <div className="aspect-square overflow-hidden rounded-md shadow-lg">
                  <img
                    src={song.imageUrl}
                    alt={song.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div
                  className={cn(
                    "absolute inset-0 flex items-center justify-center rounded-md bg-black/40 transition-opacity",
                    isCurrentSong
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100",
                  )}
                  aria-hidden="true"
                >
                  {isCurrentSong && isPlaying ? (
                    <Pause className="size-8 text-white" />
                  ) : (
                    <Play className="size-8 text-white" />
                  )}
                </div>
              </div>

              <h3 className="truncate font-medium mb-2">{song.title}</h3>
              <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SectionGrid;
