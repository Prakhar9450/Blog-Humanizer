"use client"

import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

interface TextInputProps {
  value: string
  onChange: (value: string) => void
}

export function TextInput({ value, onChange }: TextInputProps) {
  const [charCount, setCharCount] = useState(0)
  const maxChars = 5000

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    if (newValue.length <= maxChars) {
      onChange(newValue)
      setCharCount(newValue.length)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Input Text</CardTitle>
        <CardDescription>
          Paste your AI-generated or robotic text here to humanize it
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Paste your text here..."
          value={value}
          onChange={handleChange}
          className="min-h-[300px] resize-y"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Character count: {charCount}</span>
          <span>{charCount}/{maxChars}</span>
        </div>
      </CardContent>
    </Card>
  )
}

