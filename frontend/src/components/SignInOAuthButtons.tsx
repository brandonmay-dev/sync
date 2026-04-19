import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { buttonVariants } from "./ui/button-variants";

const SignInOAuthButtons = () => {
  return (
    <div className="flex items-center gap-2">
      <Link
        to="/sign-in"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800",
        )}
      >
        Sign In
      </Link>

      <Link to="/sign-up" className={cn(buttonVariants({ variant: "default" }))}>
        Sign Up
      </Link>
    </div>
  );
};

export default SignInOAuthButtons;
