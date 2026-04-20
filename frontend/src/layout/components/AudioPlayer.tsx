import { usePlayerStore } from "@/stores/usePlayerStore";
import { useChatStore } from "@/stores/useChatStore";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);
  const lastActivityRef = useRef<string | null>(null);

  const { currentSong, isPlaying, playNext } = usePlayerStore();
  const { updateActivity, isConnected } = useChatStore();
  const { userId } = useAuth();

  useEffect(() => {
    if (isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      playNext();
    };

    audio?.addEventListener("ended", handleEnded);

    return () => {
      audio?.removeEventListener("ended", handleEnded);
    };
  }, [playNext]);

  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    const audio = audioRef.current;
    const isSongChange = prevSongRef.current !== currentSong?.audioUrl;

    if (isSongChange) {
      audio.src = currentSong?.audioUrl;
      audio.currentTime = 0;
      prevSongRef.current = currentSong?.audioUrl;
      if (isPlaying) audio.play();
    }
  }, [currentSong, isPlaying]);

  useEffect(() => {
    if (!userId || !isConnected) {
      lastActivityRef.current = null;
      return;
    }

    const nextActivity =
      currentSong && isPlaying
        ? `Playing ${currentSong.title} by ${currentSong.artist}`
        : "Online";

    if (lastActivityRef.current === nextActivity) return;

    updateActivity(nextActivity);
    lastActivityRef.current = nextActivity;
  }, [currentSong, isConnected, isPlaying, updateActivity, userId]);

  return <audio ref={audioRef} />;
};

export default AudioPlayer;
