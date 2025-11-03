"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Copy, Download, CheckCheck } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useState } from "react"

interface OutputBoxProps {
  value: string
  onChange: (value: string) => void
  isLoading: boolean
}

export function OutputBox({ value, onChange, isLoading }: OutputBoxProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([value], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `humanized-text-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Humanized Output</CardTitle>
        <CardDescription>
          Your text has been transformed into natural, human-like content
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-[300px] w-full" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        ) : !value ? (
          <div className="min-h-[300px] flex items-center justify-center border border-dashed rounded-md">
            <p className="text-muted-foreground text-center">
              Humanized text will appear here after processing...
            </p>
          </div>
        ) : (
          <>
            <Textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="min-h-[300px] resize-y"
              placeholder="Humanized text will appear here..."
            />
            <div className="flex gap-2">
              <Button
                onClick={handleCopy}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <CheckCheck className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy to Clipboard
                  </>
                )}
              </Button>
              <Button
                onClick={handleDownload}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download as .txt
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

