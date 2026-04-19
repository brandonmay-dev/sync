import { SignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import AuthLayout from "../auth/AuthLayout";

const SignInPage = () => {
  return (
    <>
      <SignedIn>
        <Navigate to="/" replace />
      </SignedIn>

      <SignedOut>
        <AuthLayout
          title="Sign in your way"
          subtitle="Use Clerk's sign-in flow instead of the old Google-only shortcut. Email/password and any enabled providers can live here."
        >
          <SignIn
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            forceRedirectUrl="/auth-callback"
            fallbackRedirectUrl="/auth-callback"
            oidcPrompt="select_account"
          />
        </AuthLayout>
      </SignedOut>
    </>
  );
};

export default SignInPage;
