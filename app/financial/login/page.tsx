"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCardIcon } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { identify, track } from "@/lib/mixpanel";

export default function Component() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: use stable id from email for identity merge; in production use backend user id
    const userId = "financial-" + (email || "anonymous").toLowerCase().replace(/\s+/g, "");
    identify(userId);
    track("login_completed", {
      sign_up_method: "email",
      platform: "web",
      vertical: "financial",
    });
    console.log("Login form submitted", { email, password });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <CreditCardIcon className="h-6 w-6" />
          <span className="sr-only">iBank</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8 px-4 py-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Log In</h1>
            <p className="text-gray-500 dark:text-gray-400">Enter your credentials to access your account</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              id="logIn"
              className="w-full hover:bg-opacity-90 active:scale-95 transition-all"
              type="submit"
            >
              Log In
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link className="underline" href="/financial/signup">
              Sign up
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
