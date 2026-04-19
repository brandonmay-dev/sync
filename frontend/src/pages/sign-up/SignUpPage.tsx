import { SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import AuthLayout from "../auth/AuthLayout";

const SignUpPage = () => {
  return (
    <>
      <SignedIn>
        <Navigate to="/" replace />
      </SignedIn>

      <SignedOut>
        <AuthLayout
          title="Create a Sync account"
          subtitle="New users can now sign up through Clerk directly, instead of being forced through the old Google-only button."
        >
          <SignUp
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            forceRedirectUrl="/auth-callback"
            fallbackRedirectUrl="/auth-callback"
            oidcPrompt="select_account"
          />
        </AuthLayout>
      </SignedOut>
    </>
  );
};

export default SignUpPage;
