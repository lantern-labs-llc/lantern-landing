"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const lanternLogo = "/lantern-logo-2.png";

const PASSWORD = "lantern";

const PasswordGate = ({ children }: { children: React.ReactNode }) => {
  const [unlocked, setUnlocked] = useState(
    () => typeof window !== "undefined" && sessionStorage.getItem("site_unlocked") === "true"
  );
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === PASSWORD) {
      sessionStorage.setItem("site_unlocked", "true");
      setUnlocked(true);
    } else {
      setError(true);
    }
  };

  if (unlocked) return <>{children}</>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm space-y-8 text-center">
        {/* Logo + Wordmark */}
        <div className="flex flex-col items-center gap-3">
          <img src={lanternLogo} alt="Lantern" className="h-14 w-auto" />
          <h1 className="font-display text-3xl text-foreground tracking-tight">Lantern</h1>
          <p className="text-xs font-body uppercase tracking-[0.1em] text-muted-foreground">
            Illuminating Main Street
          </p>
        </div>

        {/* Coming soon message */}
        <p className="font-body text-muted-foreground text-sm leading-relaxed">
          We're building something special to support Main&nbsp;St. businesses. Stay tuned.
        </p>

        {/* Password form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="password"
            placeholder="Enter password"
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
};

export default PasswordGate;
