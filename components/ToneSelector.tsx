"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const tones = [
  { value: "casual", label: "Casual", description: "Friendly and conversational" },
  { value: "professional", label: "Professional", description: "Formal and business-like" },
  { value: "storytelling", label: "Storytelling", description: "Engaging and narrative" },
  { value: "seo-friendly", label: "SEO-Friendly", description: "Optimized for search engines" },
]

interface ToneSelectorProps {
  value: string
  onChange: (value: string) => void
}

export function ToneSelector({ value, onChange }: ToneSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="tone">Select Tone</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="tone">
          <SelectValue placeholder="Choose a tone..." />
        </SelectTrigger>
        <SelectContent>
          {tones.map((tone) => (
            <SelectItem key={tone.value} value={tone.value}>
              <div className="flex flex-col">
                <span className="font-medium">{tone.label}</span>
                <span className="text-xs text-muted-foreground">{tone.description}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

