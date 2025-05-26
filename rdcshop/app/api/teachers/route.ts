import { type NextRequest, NextResponse } from "next/server"
import { getAllTeachers } from "@/lib/teacher-management"

export async function GET(request: NextRequest) {
  try {
    const { teachers, error } = await getAllTeachers()

    if (error) {
      return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json({ teachers })
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
