"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PASSWORD = "skink";
const STORAGE_KEY = "admin_unlocked";

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(
    () => typeof window !== "undefined" && sessionStorage.getItem(STORAGE_KEY) === "true"
  );
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setUnlocked(true);
    } else {
      setError(true);
    }
  };

  if (unlocked) return <>{children}</>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm space-y-6 text-center">
        <h1 className="font-display text-2xl text-foreground tracking-tight">Lantern Admin</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="password"
            placeholder="Password"
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(false); }}
            className={error ? "border-destructive" : ""}
            autoFocus
          />
          {error && <p className="text-sm text-destructive">Incorrect password</p>}
          <Button type="submit" className="w-full">Enter</Button>
        </form>
      </div>
    </div>
  );
}
