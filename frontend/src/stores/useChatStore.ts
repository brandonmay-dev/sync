import { axiosInstance } from "@/lib/axios";
import type { Message, User } from "@/types";
import { create } from "zustand";
import { io } from "socket.io-client";

interface ChatStore {
  users: User[];
  isLoading: boolean;
  error: string | null;
  socket: any;
  isConnected: boolean;
  onlineUsers: Set<string>;
  userActivities: Map<string, string>;
  messages: Message[];
  selectedUser: User | null;

  fetchUsers: () => Promise<void>;
  initSocket: (userId: string) => void;
  disconnectSocket: () => void;
  sendMessage: (receiverId: string, senderId: string, content: string) => void;
  fetchMessages: (userId: string) => Promise<void>;
  setSelectedUser: (user: User | null) => void;
  updateActivity: (activity: string) => void;
}

const SOCKET_BASE_URL =
  import.meta.env.VITE_SOCKET_URL ||
  (import.meta.env.DEV ? "http://localhost:3000" : window.location.origin);

const getErrorMessage = (error: any, fallback: string) =>
  error.response?.data?.message || error.message || fallback;

const socket = io(SOCKET_BASE_URL, {
  autoConnect: false, // only connect if user is authenticated
  withCredentials: true,
});

export const useChatStore = create<ChatStore>((set, get) => ({
  users: [],
  isLoading: false,
  error: null,
  socket: socket,
  isConnected: false,
  onlineUsers: new Set(),
  userActivities: new Map(),
  messages: [],
  selectedUser: null,

  setSelectedUser: (user) => set({ selectedUser: user }),

  updateActivity: (activity) => {
    const currentUserId = (socket.auth as { userId?: string } | undefined)?.userId;

    if (!socket.connected || !currentUserId) return;

    socket.emit("update_activity", { userId: currentUserId, activity });
  },

  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/users");
      set({ users: response.data });
    } catch (error: any) {
      set({ error: getErrorMessage(error, "Failed to load users") });
    } finally {
      set({ isLoading: false });
    }
  },

  initSocket: (userId) => {
    const currentSocketUserId = (socket.auth as { userId?: string } | undefined)
      ?.userId;
    if (get().isConnected && currentSocketUserId === userId) return;

    socket.off("connect");
    socket.off("disconnect");
    socket.off("connect_error");
    socket.off("users_online");
    socket.off("activities");
    socket.off("user_connected");
    socket.off("user_disconnected");
    socket.off("new_message");
    socket.off("message_sent");
    socket.off("activity_updated");

    if (socket.connected) {
      socket.disconnect();
    }

    socket.auth = { userId };

    socket.on("connect", () => {
      socket.emit("user_connected", userId);
      set({ isConnected: true, error: null });
    });

    socket.on("disconnect", () => {
      set({
        isConnected: false,
        onlineUsers: new Set(),
        userActivities: new Map(),
      });
    });

    socket.on("connect_error", (error: Error) => {
      set({ error: error.message || "Failed to connect to live updates" });
    });

    socket.on("users_online", (users: string[]) => {
      set({ onlineUsers: new Set(users) });
      void get().fetchUsers();
    });

    socket.on("activities", (activities: [string, string][]) => {
      set({ userActivities: new Map(activities) });
    });

    socket.on("user_connected", (connectedUserId: string) => {
      set((state) => ({
        onlineUsers: new Set([...state.onlineUsers, connectedUserId]),
      }));
      void get().fetchUsers();
    });

    socket.on("user_disconnected", (disconnectedUserId: string) => {
      set((state) => {
        const newOnlineUsers = new Set(state.onlineUsers);
        newOnlineUsers.delete(disconnectedUserId);
        return { onlineUsers: newOnlineUsers };
      });
    });

    socket.on("new_message", (message: Message) => {
      set((state) =>
        state.messages.some((existingMessage) => existingMessage._id === message._id)
          ? state
          : {
              messages: [...state.messages, message],
            },
      );
    });

    socket.on("message_sent", (message: Message) => {
      set((state) =>
        state.messages.some((existingMessage) => existingMessage._id === message._id)
          ? state
          : {
              messages: [...state.messages, message],
            },
      );
    });

    socket.on("activity_updated", ({ userId, activity }) => {
      set((state) => {
        const newActivities = new Map(state.userActivities);
        newActivities.set(userId, activity);
        return { userActivities: newActivities };
      });
    });

    socket.connect();
  },

  disconnectSocket: () => {
    socket.off("connect");
    socket.off("disconnect");
    socket.off("connect_error");
    socket.off("users_online");
    socket.off("activities");
    socket.off("user_connected");
    socket.off("user_disconnected");
    socket.off("new_message");
    socket.off("message_sent");
    socket.off("activity_updated");

    if (socket.connected) {
      socket.disconnect();
    }

    set({
      isConnected: false,
      onlineUsers: new Set(),
      userActivities: new Map(),
      messages: [],
      selectedUser: null,
    });
  },

  sendMessage: async (receiverId, senderId, content) => {
    const socket = get().socket;
    if (!socket) return;

    socket.emit("send_message", { receiverId, senderId, content });
  },

  fetchMessages: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/users/messages/${userId}`);
      set({ messages: response.data });
    } catch (error: any) {
      set({ error: getErrorMessage(error, "Failed to load messages") });
    } finally {
      set({ isLoading: false });
    }
  },
}));
