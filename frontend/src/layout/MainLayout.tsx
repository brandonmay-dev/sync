import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar";
import FriendsActivity from "./components/FriendsActivity";
import AudioPlayer from "./components/AudioPlayer";
import { PlaybackControls } from "./components/PlaybackControls";
import { useEffect, useState } from "react";

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="h-screen bg-black text-white flex flex-col">
        <AudioPlayer />

        <div className="flex-1 min-h-0 flex gap-2 p-2 overflow-hidden">
          <div className="w-20 shrink-0">
            <LeftSidebar />
          </div>

          <div className="min-w-0 flex-1 min-h-0 flex flex-col gap-2">
            <div className="min-h-0 flex-1">
              <Outlet />
            </div>

            <div className="h-72 shrink-0">
              <FriendsActivity />
            </div>
          </div>
        </div>

        <PlaybackControls />
      </div>
    );
  }

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <AudioPlayer />

      <ResizablePanelGroup
        orientation="horizontal"
        className="flex-1 flex h-full overflow-hidden p-2"
      >
        {/* left sidebar */}
        <ResizablePanel defaultSize={20} minSize={10}>
          <LeftSidebar />
        </ResizablePanel>

        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

        {/* Main content */}
        <ResizablePanel defaultSize={60}>
          <Outlet />
        </ResizablePanel>

        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

        {/* right sidebar */}
        <ResizablePanel defaultSize={20} minSize={0} collapsedSize={0}>
          <FriendsActivity />
        </ResizablePanel>
      </ResizablePanelGroup>

      <PlaybackControls />
    </div>
  );
};
export default MainLayout;
