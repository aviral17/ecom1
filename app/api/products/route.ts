import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
    const res = await fetch('https://dummyjson.com/products', {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const result = await res.json()
    return NextResponse.json(result)
}
