'use client';

import { useEffect, useState, useCallback } from 'react';

type Announcement = {
  id: string;
  text: string;
  imageUrl?: string;
  createdAt: string;
};

// ブラウザ側で画像を縮小（長辺1600px・JPEG）してアップロード容量を抑える
async function resizeImage(file: File, maxSize = 1600, quality = 0.82): Promise<Blob> {
  if (!file.type.startsWith('image/')) return file;
  const dataUrl: string = await new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as string);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
  const img: HTMLImageElement = await new Promise((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = rej;
    i.src = dataUrl;
  });
  let { width, height } = img;
  if (width > maxSize || height > maxSize) {
    if (width >= height) {
      height = Math.round((height * maxSize) / width);
      width = maxSize;
    } else {
      width = Math.round((width * maxSize) / height);
      height = maxSize;
    }
  }
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return file;
  ctx.drawImage(img, 0, 0, width, height);
  const blob: Blob | null = await new Promise((res) =>
    canvas.toBlob((b) => res(b), 'image/jpeg', quality)
  );
  return blob || file;
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [posting, setPosting] = useState(false);
  const [msg, setMsg] = useState('');

  const [items, setItems] = useState<Announcement[]>([]);

  const loadItems = useCallback(async () => {
    try {
      const r = await fetch('/api/announcements');
      const d = await r.json();
      setItems(Array.isArray(d) ? d : []);
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    if (authed) loadItems();
  }, [authed, loadItems]);

  const login = async () => {
    setLoggingIn(true);
    setLoginError('');
    try {
      const r = await fetch('/api/announcements', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-admin-key': password },
        body: JSON.stringify({ verify: true }),
      });
      if (r.ok) {
        setAuthed(true);
      } else {
        setLoginError('パスワードが違います。');
      }
    } catch {
      setLoginError('通信に失敗しました。');
    } finally {
      setLoggingIn(false);
    }
  };

  const post = async () => {
    if (!text.trim() && !file) {
      setMsg('文章か写真のどちらかを入力してください。');
      return;
    }
    setPosting(true);
    setMsg('');
    try {
      const form = new FormData();
      form.append('text', text.trim());
      if (file) {
        const resized = await resizeImage(file);
        form.append('image', resized, 'photo.jpg');
      }
      const r = await fetch('/api/announcements', {
        method: 'POST',
        headers: { 'x-admin-key': password },
        body: form,
      });
      if (!r.ok) {
        const e = await r.json().catch(() => ({}));
        setMsg(e.error || '投稿に失敗しました。');
      } else {
        setText('');
        setFile(null);
        setMsg('投稿しました。');
        await loadItems();
      }
    } catch {
      setMsg('投稿に失敗しました。');
    } finally {
      setPosting(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('このお知らせを削除しますか？')) return;
    try {
      await fetch(`/api/announcements?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': password },
      });
      await loadItems();
    } catch {
      /* noop */
    }
  };

  return (
    <div
      className="fixed inset-0 z-[300] bg-[#f3ede1] text-stone-800 overflow-auto"
      data-lenis-prevent
    >
      <div className="max-w-[640px] mx-auto px-5 py-10">
        <h1 className="text-[22px] font-medium tracking-[0.1em] mb-1">朝日屋 お知らせ管理</h1>
        <p className="text-[12px] text-stone-500 mb-8">投稿するとサイト上部に表示されます。</p>

        {!authed ? (
          <div className="bg-white rounded-md shadow-sm border border-stone-200 p-6">
            <label className="block text-[13px] text-stone-600 mb-2">パスワード</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && login()}
              className="w-full border border-stone-300 rounded px-3 py-2.5 text-[15px] focus:outline-none focus:border-stone-500"
              placeholder="パスワードを入力"
            />
            {loginError && <p className="text-[12px] text-red-600 mt-2">{loginError}</p>}
            <button
              onClick={login}
              disabled={loggingIn || !password}
              className="mt-4 w-full bg-stone-800 text-white py-2.5 rounded text-[14px] tracking-[0.1em] disabled:opacity-40 hover:bg-stone-700 transition-colors"
            >
              {loggingIn ? '確認中…' : 'ログイン'}
            </button>
          </div>
        ) : (
          <>
            {/* 投稿フォーム */}
            <div className="bg-white rounded-md shadow-sm border border-stone-200 p-6 mb-8">
              <label className="block text-[13px] text-stone-600 mb-2">お知らせ（一言）</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={3}
                className="w-full border border-stone-300 rounded px-3 py-2.5 text-[15px] focus:outline-none focus:border-stone-500 resize-y"
                placeholder="例）本日は満席をいただいております。"
              />
              <label className="block text-[13px] text-stone-600 mt-4 mb-2">写真（任意）</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="block w-full text-[13px] text-stone-600 file:mr-3 file:py-2 file:px-4 file:rounded file:border-0 file:bg-stone-200 file:text-stone-700"
              />
              {file && <p className="text-[11px] text-stone-500 mt-1">選択中: {file.name}</p>}

              {msg && <p className="text-[12px] text-stone-600 mt-3">{msg}</p>}
              <button
                onClick={post}
                disabled={posting}
                className="mt-4 w-full bg-stone-800 text-white py-2.5 rounded text-[14px] tracking-[0.1em] disabled:opacity-40 hover:bg-stone-700 transition-colors"
              >
                {posting ? '投稿中…' : '投稿する'}
              </button>
            </div>

            {/* 一覧 */}
            <h2 className="text-[14px] tracking-[0.1em] text-stone-600 mb-3">投稿一覧</h2>
            <div className="space-y-3">
              {items.length === 0 && (
                <p className="text-[13px] text-stone-400">まだ投稿はありません。</p>
              )}
              {items.map((a) => (
                <div
                  key={a.id}
                  className="bg-white rounded-md border border-stone-200 p-4 flex gap-3 items-start"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] text-stone-400 mb-1">
                      {new Date(a.createdAt).toLocaleString('ja-JP')}
                    </div>
                    {a.text && (
                      <p className="text-[14px] leading-[1.7] whitespace-pre-wrap break-words">
                        {a.text}
                      </p>
                    )}
                    {a.imageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={a.imageUrl} alt="" className="mt-2 max-h-40 rounded" />
                    )}
                  </div>
                  <button
                    onClick={() => remove(a.id)}
                    className="shrink-0 text-[12px] text-red-600 border border-red-200 rounded px-3 py-1.5 hover:bg-red-50 transition-colors"
                  >
                    削除
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
