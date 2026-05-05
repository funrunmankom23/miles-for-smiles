import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const scriptUrl = process.env.APPS_SCRIPT_URL
  if (!scriptUrl) {
    return NextResponse.json({ error: 'Apps Script URL not configured' }, { status: 500 })
  }

  const data = await req.json()

  try {
    const res = await fetch(scriptUrl, {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(data),
    })

    const text = await res.text()
    return NextResponse.json(JSON.parse(text))
  } catch (err) {
    console.error('Failed to submit to Google Sheets:', err)
    return NextResponse.json({ error: 'Failed to save registration' }, { status: 500 })
  }
}
