import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PASSWORD = "lantern";

const PasswordGate = ({ children }: { children: React.ReactNode }) => {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem("site_unlocked") === "true"
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
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 text-center">
        <h2 className="font-display text-2xl">Enter Password</h2>
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
  );
};

export default PasswordGate;
