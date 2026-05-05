import { NextResponse } from 'next/server'

export async function GET() {
  const scriptUrl = process.env.APPS_SCRIPT_URL
  if (!scriptUrl) {
    return NextResponse.json({}, { status: 500 })
  }

  try {
    const res = await fetch(scriptUrl, { cache: 'no-store', redirect: 'follow' })
    const text = await res.text()
    // Apps Script sometimes wraps response — find the JSON part
    const jsonStart = text.indexOf('{')
    const jsonEnd = text.lastIndexOf('}')
    if (jsonStart === -1 || jsonEnd === -1) {
      console.error('Apps Script returned non-JSON:', text.slice(0, 200))
      return NextResponse.json({}, { status: 500 })
    }
    const data = JSON.parse(text.slice(jsonStart, jsonEnd + 1))
    return NextResponse.json(data)
  } catch (err) {
    console.error('Failed to fetch slots:', err)
    return NextResponse.json({}, { status: 500 })
  }
}
