import FeaturedGridSkeleton from "@/components/skeletons/FeaturedGridSkeleton";
import { useMusicStore } from "@/stores/useMusicStore";
import PlayButton from "./PlayButton";

const FeaturedSection = () => {
  const { isLoading, featuredSongs, error } = useMusicStore();

  if (isLoading) return <FeaturedGridSkeleton />;

  if (error) return <div className="text-red-500 mb-4 text-lg">{error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {featuredSongs.map((song) => (
        <div
          key={song._id}
          className="group relative flex items-center overflow-hidden rounded-md bg-zinc-800/50 transition-colors hover:bg-zinc-700/50 cursor-pointer"
        >
          <img
            src={song.imageUrl}
            alt={song.title}
            className="w-16 sm:w-20 h-16 sm:h-20 object-cover shrink-0"
          />
          <div className="flex-1 p-4 pr-16">
            <p className="font-medium truncate">{song.title}</p>
            <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
          </div>
          <PlayButton
            song={song}
            className="bottom-1/2 right-3 translate-y-1/2 group-hover:translate-y-1/2"
          />
        </div>
      ))}
    </div>
  );
};

export default FeaturedSection;
