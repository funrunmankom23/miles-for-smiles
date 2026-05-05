import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const scriptUrl = process.env.APPS_SCRIPT_URL
  if (!scriptUrl) {
    return NextResponse.json({ error: 'Apps Script URL not configured' }, { status: 500 })
  }

  const { orderId, proofBase64, fileName } = await req.json()

  if (!orderId || !proofBase64) {
    return NextResponse.json({ error: 'Missing orderId or proof image' }, { status: 400 })
  }

  try {
    const res = await fetch(scriptUrl, {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'uploadProof', orderId, proofBase64, fileName }),
    })

    const text = await res.text()
    const jsonStart = text.indexOf('{')
    const jsonEnd = text.lastIndexOf('}')
    if (jsonStart === -1 || jsonEnd === -1) {
      console.error('Apps Script returned non-JSON:', text.slice(0, 200))
      return NextResponse.json({ error: 'Invalid response from Apps Script' }, { status: 500 })
    }
    return NextResponse.json(JSON.parse(text.slice(jsonStart, jsonEnd + 1)))
  } catch (err) {
    console.error('Failed to upload proof:', err)
    return NextResponse.json({ error: 'Upload gagal. Coba lagi.' }, { status: 500 })
  }
}
