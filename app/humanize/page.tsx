"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { TextInput } from "@/components/TextInput";
import { ToneSelector } from "@/components/ToneSelector";
import { OutputBox } from "@/components/OutputBox";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wand2, AlertCircle, Lock } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function HumanizePage() {
  const [inputText, setInputText] = useState("");
  const [tone, setTone] = useState("casual");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, loading } = useAuth();

  const handleHumanize = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text to humanize");
      return;
    }

    setIsLoading(true);
    setError(null);
    setOutputText("");

    try {
      const response = await fetch("/api/humanize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputText,
          tone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to humanize text");
      }

      setOutputText(data.humanizedText);
    } catch (err: any) {
      setError(err.message || "An error occurred while humanizing the text");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show login required message if not authenticated
  if (!user) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex flex-1 items-center justify-center p-6">
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Lock className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl">
                Authentication Required
              </CardTitle>
              <CardDescription>
                You must log in to use the humanizer.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/login">
                <Button size="lg" className="w-full">
                  Go to Login
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-6xl space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Text Humanizer
              </h1>
              <p className="text-muted-foreground mt-2">
                Transform robotic AI-generated text into natural, human-like
                content
              </p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end mb-6">
              <div className="flex-1 w-full">
                <ToneSelector value={tone} onChange={setTone} />
              </div>
              <Button
                onClick={handleHumanize}
                disabled={isLoading || !inputText.trim()}
                size="lg"
                className="w-full sm:w-auto">
                <Wand2 className="mr-2 h-5 w-5" />
                {isLoading ? "Humanizing..." : "Humanize Text"}
              </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <TextInput value={inputText} onChange={setInputText} />
              <OutputBox
                value={outputText}
                onChange={setOutputText}
                isLoading={isLoading}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
