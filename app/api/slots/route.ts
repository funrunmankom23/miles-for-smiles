import { NextResponse } from 'next/server'

export async function GET() {
  const scriptUrl = process.env.APPS_SCRIPT_URL
  if (!scriptUrl) {
    return NextResponse.json({}, { status: 500 })
  }

  try {
    const res = await fetch(scriptUrl, { cache: 'no-store' })
    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    console.error('Failed to fetch slots:', err)
    return NextResponse.json({}, { status: 500 })
  }
}
