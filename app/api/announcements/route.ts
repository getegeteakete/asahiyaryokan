import { NextRequest, NextResponse } from 'next/server';
import { put, del } from '@vercel/blob';
import {
  readAnnouncements,
  writeAnnouncements,
  type Announcement,
} from '@/lib/announcements';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function authorized(req: NextRequest): boolean {
  const key = req.headers.get('x-admin-key') || '';
  const pw = process.env.ADMIN_PASSWORD || '';
  return pw.length > 0 && key === pw;
}

// 公開：一覧（新しい順）
export async function GET() {
  const items = await readAnnouncements();
  items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return NextResponse.json(items);
}

// 投稿（要パスワード）。{verify:true} はログイン確認用。
export async function POST(req: NextRequest) {
  const contentType = req.headers.get('content-type') || '';

  // ログイン確認（JSON）
  if (contentType.includes('application/json')) {
    const body = await req.json().catch(() => ({} as Record<string, unknown>));
    if (body && (body as Record<string, unknown>).verify) {
      return authorized(req)
        ? NextResponse.json({ ok: true })
        : NextResponse.json({ ok: false }, { status: 401 });
    }
    // JSONでの投稿（テキストのみ）
    if (!authorized(req)) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }
    const text = String((body as Record<string, unknown>).text || '').trim();
    if (!text) return NextResponse.json({ error: 'empty' }, { status: 400 });
    return await create(text, undefined);
  }

  // 写真つき投稿（multipart）
  if (!authorized(req)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: 'ADMIN_PASSWORD が未設定です。Vercelの環境変数を設定してください。' },
      { status: 500 }
    );
  }

  let text = '';
  let imageUrl: string | undefined;
  try {
    const form = await req.formData();
    text = String(form.get('text') || '').trim();
    const file = form.get('image');
    if (file && file instanceof File && file.size > 0) {
      const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '');
      const blob = await put(`announcements/img-${Date.now()}.${ext || 'jpg'}`, file, {
        access: 'public',
        addRandomSuffix: true,
      });
      imageUrl = blob.url;
    }
  } catch (e) {
    return NextResponse.json(
      { error: '保存に失敗しました。Blobストアの接続をご確認ください。' },
      { status: 500 }
    );
  }

  if (!text && !imageUrl) {
    return NextResponse.json({ error: 'empty' }, { status: 400 });
  }
  return await create(text, imageUrl);
}

// 削除（要パスワード）
export async function DELETE(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const id = req.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'no id' }, { status: 400 });

  const items = await readAnnouncements();
  const target = items.find((i) => i.id === id);
  const next = items.filter((i) => i.id !== id);
  await writeAnnouncements(next);
  // 画像も削除（失敗しても無視）
  if (target?.imageUrl) {
    try {
      await del(target.imageUrl);
    } catch {
      /* noop */
    }
  }
  return NextResponse.json({ ok: true });
}

async function create(text: string, imageUrl?: string) {
  try {
    const items = await readAnnouncements();
    const item: Announcement = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      text,
      imageUrl,
      createdAt: new Date().toISOString(),
    };
    items.push(item);
    await writeAnnouncements(items);
    return NextResponse.json(item);
  } catch {
    return NextResponse.json(
      { error: '保存に失敗しました。Blobストアの接続をご確認ください。' },
      { status: 500 }
    );
  }
}
