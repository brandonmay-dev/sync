import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button-variants";
import syncTopbarLogo from "@/assets/branding/sync-topbar-logo.png";

const Topbar = () => {
  const { isAdmin, isLoading } = useAuthStore();
  return (
    <div
      className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10
  "
    >
      <Link to="/" className="flex items-center">
        <img
          src={syncTopbarLogo}
          alt="Sync"
          className="h-12 w-auto max-w-[320px] object-contain md:h-14"
        />
        <span className="sr-only">Sync</span>
      </Link>
      <div className=" flex items-center gap-4">
        <SignedIn>
          {!isLoading && isAdmin && (
            <Link
              to={"/admin"}
              className={cn(buttonVariants({ variant: "default" }))}
            >
              <LayoutDashboardIcon className="size-4 mr-2" />
              Admin Dashboard
            </Link>
          )}
        </SignedIn>

        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
};

export default Topbar;
