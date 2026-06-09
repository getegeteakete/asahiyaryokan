import { put, list } from '@vercel/blob';

export type Announcement = {
  id: string;
  text: string;
  imageUrl?: string;
  createdAt: string; // ISO
};

const DATA_PATH = 'announcements/data.json';

/**
 * お知らせ一覧を読み込む。Blob未設定や未作成でも例外を投げず空配列を返す
 * （＝公開サイトはセットアップ前でもエラーにならない）。
 */
export async function readAnnouncements(): Promise<Announcement[]> {
  try {
    const { blobs } = await list({ prefix: DATA_PATH });
    const blob = blobs.find((b) => b.pathname === DATA_PATH);
    if (!blob) return [];
    // CDNキャッシュを避けるためクエリ付き＋no-storeで取得
    const res = await fetch(`${blob.url}?t=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? (data as Announcement[]) : [];
  } catch {
    return [];
  }
}

/** お知らせ一覧を保存（同じパスを上書き）。 */
export async function writeAnnouncements(items: Announcement[]): Promise<void> {
  await put(DATA_PATH, JSON.stringify(items), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
  });
}
