"use client"

import { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { Sidebar } from "@/components/Sidebar"
import { TextInput } from "@/components/TextInput"
import { ToneSelector } from "@/components/ToneSelector"
import { OutputBox } from "@/components/OutputBox"
import { Button } from "@/components/ui/button"
import { Wand2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function HumanizePage() {
  const [inputText, setInputText] = useState("")
  const [tone, setTone] = useState("casual")
  const [outputText, setOutputText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleHumanize = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text to humanize")
      return
    }

    setIsLoading(true)
    setError(null)
    setOutputText("")

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
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to humanize text")
      }

      setOutputText(data.humanizedText)
    } catch (err: any) {
      setError(err.message || "An error occurred while humanizing the text")
      console.error("Error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-6xl space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Text Humanizer</h1>
              <p className="text-muted-foreground mt-2">
                Transform robotic AI-generated text into natural, human-like content
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
                className="w-full sm:w-auto"
              >
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
  )
}

