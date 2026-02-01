import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const DATA_DIR = path.join(process.cwd(), 'data', 'calendar');

function keyToFilename(key: string) {
  const hash = crypto.createHash('sha256').update(key).digest('hex');
  return `${hash}.json`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { apiKey, events } = body || {};
    if (!apiKey) {
      return NextResponse.json({ error: 'apiKey required' }, { status: 400 });
    }

    const filename = keyToFilename(apiKey);
    await fs.mkdir(DATA_DIR, { recursive: true });
    const filePath = path.join(DATA_DIR, filename);
    await fs.writeFile(filePath, JSON.stringify(events || []), 'utf-8');
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Error saving persisted events:', err);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const apiKey = req.nextUrl.searchParams.get('apiKey');
    if (!apiKey) {
      return NextResponse.json({ error: 'apiKey required' }, { status: 400 });
    }

    const filename = keyToFilename(apiKey);
    const filePath = path.join(DATA_DIR, filename);
    try {
      const raw = await fs.readFile(filePath, 'utf-8');
      const parsed = JSON.parse(raw || '[]');
      return NextResponse.json(parsed);
    } catch (e) {
      // No file yet => return empty list
      return NextResponse.json([]);
    }
  } catch (err) {
    console.error('Error loading persisted events:', err);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}
