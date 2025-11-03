import { NextRequest, NextResponse } from "next/server";
import { humanizeText } from "@/lib/groq";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { inputText, tone } = body;

    // Validation
    if (!inputText || typeof inputText !== "string") {
      return NextResponse.json(
        { error: "Input text is required and must be a string" },
        { status: 400 }
      );
    }

    if (!tone || typeof tone !== "string") {
      return NextResponse.json(
        { error: "Tone is required and must be a string" },
        { status: 400 }
      );
    }

    if (inputText.trim().length === 0) {
      return NextResponse.json(
        { error: "Input text cannot be empty" },
        { status: 400 }
      );
    }

    if (inputText.length > 5000) {
      return NextResponse.json(
        { error: "Input text is too long. Maximum 5000 characters allowed." },
        { status: 400 }
      );
    }

    // Call Groq to humanize the text
    const result = await humanizeText(inputText, tone);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({
      humanizedText: result.humanizedText,
      success: true,
    });
  } catch (error: any) {
    console.error("Error in /api/humanize:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
