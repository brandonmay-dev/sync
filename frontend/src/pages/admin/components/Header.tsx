import { UserButton } from "@clerk/clerk-react";
import { Music2 } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 mb-8">
        <Link
          to="/"
          className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/15"
        >
          <Music2 className="size-5 text-emerald-400" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Music Manager</h1>
          <p className="text-zinc-400 mt-1">Manage your music catalog</p>
        </div>
      </div>
      <UserButton />
    </div>
  );
};
export default Header;
