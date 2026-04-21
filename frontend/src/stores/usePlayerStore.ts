import { create } from "zustand";
import type { Song } from "@/types";

interface PlayerStore {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  currentIndex: number;
  isShuffled: boolean;
  repeatMode: "off" | "all" | "one";
  restartCounter: number;

  initializeQueue: (songs: Song[]) => void;
  playAlbum: (songs: Song[], startIndex?: number) => void;
  setCurrentSong: (song: Song | null) => void;
  restartCurrentSong: () => void;
  togglePlay: () => void;
  toggleShuffle: () => void;
  cycleRepeatMode: () => void;
  playNext: () => void;
  playPrevious: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: -1,
  isShuffled: false,
  repeatMode: "off",
  restartCounter: 0,

  initializeQueue: (songs: Song[]) => {
    set({
      queue: songs,
      currentSong: get().currentSong || songs[0],
      currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
    });
  },
  playAlbum: (songs: Song[], startIndex = 0) => {
    if (songs.length === 0) return;

    const song = songs[startIndex];

    set({
      queue: songs,
      currentSong: song,
      currentIndex: startIndex,
      isPlaying: true,
    });
  },
  setCurrentSong: (song: Song | null) => {
    if (!song) return;

    const songIndex = get().queue.findIndex((s) => s._id === song._id);
    set({
      currentSong: song,
      isPlaying: true,
      currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
    });
  },
  restartCurrentSong: () => {
    const { currentSong, queue, currentIndex } = get();

    if (currentSong) {
      set((state) => ({
        isPlaying: true,
        restartCounter: state.restartCounter + 1,
      }));
      return;
    }

    if (queue.length > 0) {
      const restartIndex = currentIndex >= 0 ? currentIndex : 0;
      set((state) => ({
        currentSong: queue[restartIndex],
        currentIndex: restartIndex,
        isPlaying: true,
        restartCounter: state.restartCounter + 1,
      }));
    }
  },
  togglePlay: () => {
    const willStartPlaying = !get().isPlaying;

    set({ isPlaying: willStartPlaying });
  },
  toggleShuffle: () => {
    set((state) => ({ isShuffled: !state.isShuffled }));
  },
  cycleRepeatMode: () => {
    set((state) => {
      const nextRepeatMode =
        state.repeatMode === "off"
          ? "all"
          : state.repeatMode === "all"
            ? "one"
            : "off";

      return { repeatMode: nextRepeatMode };
    });
  },
  playNext: () => {
    const { queue, currentIndex, isShuffled, repeatMode } = get();
    if (queue.length === 0) return;

    if (repeatMode === "one") {
      get().restartCurrentSong();
      return;
    }

    if (isShuffled && queue.length > 1) {
      let nextIndex = currentIndex;

      while (nextIndex === currentIndex) {
        nextIndex = Math.floor(Math.random() * queue.length);
      }

      set({
        currentSong: queue[nextIndex],
        currentIndex: nextIndex,
        isPlaying: true,
      });
      return;
    }

    const nextIndex = currentIndex + 1;

    if (nextIndex < queue.length) {
      const nextSong = queue[nextIndex];
      set({
        currentSong: nextSong,
        currentIndex: nextIndex,
        isPlaying: true,
      });
    } else if (repeatMode === "all" && queue.length > 0) {
      set({
        currentSong: queue[0],
        currentIndex: 0,
        isPlaying: true,
      });
    } else {
      // reached end of queue, stop playback
      set({ isPlaying: false });
    }
  },
  playPrevious: () => {
    const { queue, currentIndex, isShuffled, repeatMode } = get();
    if (queue.length === 0) return;

    if (repeatMode === "one") {
      get().restartCurrentSong();
      return;
    }

    if (isShuffled && queue.length > 1) {
      let prevIndex = currentIndex;

      while (prevIndex === currentIndex) {
        prevIndex = Math.floor(Math.random() * queue.length);
      }

      set({
        currentSong: queue[prevIndex],
        currentIndex: prevIndex,
        isPlaying: true,
      });
      return;
    }

    const prevIndex = currentIndex - 1;

    if (prevIndex >= 0) {
      const prevSong = queue[prevIndex];
      set({
        currentSong: prevSong,
        currentIndex: prevIndex,
        isPlaying: true,
      });
    } else if (repeatMode === "all" && queue.length > 0) {
      const lastIndex = queue.length - 1;
      set({
        currentSong: queue[lastIndex],
        currentIndex: lastIndex,
        isPlaying: true,
      });
    } else {
      // at start of queue, restart current song
      set({ isPlaying: true });
    }
  },
}));
