import { NextRequest } from 'next/server'
import { parser } from './parser'
import { pick } from 'lodash-es'

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')

  if (!url) {
    return new Response('URL parameter is required', { status: 400 })
  }

  const res = await fetch(url, { headers: { 'user-agent': 'ClashforWindows/0.19.23' } })
  const raw = await res.text()
  const ret = parser(raw)

  return new Response(ret, {
    headers: pick(Object.fromEntries(res.headers.entries()), [
      'content-disposition',
      'subscription-userinfo',
    ]),
  })
}
