import { setAuthTokenGetter } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken, userId, isLoaded, isSignedIn } = useAuth();
  const [loading, setLoading] = useState(true);
  const { checkAdminStatus, reset } = useAuthStore();
  const { initSocket, disconnectSocket } = useChatStore();

  useEffect(() => {
    const initAuth = async () => {
      if (!isLoaded) return;

      try {
        setAuthTokenGetter(async () => {
          if (!isSignedIn) return null;
          return getToken();
        });

        if (!isSignedIn) {
          reset();
          disconnectSocket();
          return;
        }

        const token = await getToken();
        if (token) {
          await checkAdminStatus();

          if (userId) {
            initSocket(userId);
          }
        } else {
          reset();
          disconnectSocket();
        }
      } catch (error: any) {
        setAuthTokenGetter(null);
        reset();
        disconnectSocket();
        console.log("Error in auth provider", error);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    initAuth();

    return () => {
      setAuthTokenGetter(null);
      disconnectSocket();
    };
  }, [
    checkAdminStatus,
    disconnectSocket,
    getToken,
    initSocket,
    isLoaded,
    isSignedIn,
    reset,
    userId,
  ]);

  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="size-8 text-emerald-500 animate-spin" />
      </div>
    );

  return <>{children}</>;
};
export default AuthProvider;
