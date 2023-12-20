import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const id = request.nextUrl.searchParams.get('id')
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const result = await res.json()
    return NextResponse.json(result)
}
