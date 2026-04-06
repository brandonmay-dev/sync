import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-red-600 text-5xl">Welcome to the App!</h1>

      <Button>Click me</Button>

      <div className="w-full max-w-sm">
        <Input placeholder="Type something..." />
      </div>
    </div>
  );
}

export default App;
