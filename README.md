# 朝日屋 Asahiya

糸島・芥屋の割烹民宿「朝日屋」公式サイト（リニューアル版）

Next.js 14 (App Router) + next-intl + Tailwind CSS + TypeScript

---

## 🚀 セットアップ

```bash
npm install
npm run dev
```

開きたいURL:

- 日本語: http://localhost:3000/ja
- 英語: http://localhost:3000/en
- ルート `/` にアクセスすると自動で `/ja` にリダイレクト

## 🛠️ スクリプト

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | 本番ビルド |
| `npm run start` | 本番サーバー起動 |
| `npm run lint` | ESLint |
| `npm run typecheck` | 型チェック |

---

## 📁 ディレクトリ構成

```
asahiya-next/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx       # ロケールごとのレイアウト・metadata
│   │   └── page.tsx         # トップページ（全セクションの組み立て）
│   └── globals.css          # 和紙テクスチャ・ベーススタイル
├── components/
│   ├── Header.tsx           # 固定ヘッダー + 言語スイッチ
│   ├── Hero.tsx             # 縦書きタイトルのヒーロー
│   ├── About.tsx            # 店について
│   ├── VideoSection.tsx     # YouTube動画埋め込み
│   ├── Menu.tsx             # お品書き（タブ切替・クライアント）
│   ├── Kaiseki.tsx          # 懐石
│   ├── Stay.tsx             # 宿泊プラン
│   ├── Press.tsx            # 雑誌掲載
│   ├── Access.tsx           # 店舗情報・マップ・CTA
│   └── Footer.tsx
├── i18n/
│   ├── routing.ts           # locales 定義・Linkヘルパー
│   └── request.ts           # next-intl のメッセージロード
├── messages/
│   ├── ja.json              # 日本語メッセージ
│   └── en.json              # 英訳
├── public/
│   └── images/              # 料理・店舗写真 30枚
├── middleware.ts            # ロケール検出ミドルウェア
├── next.config.mjs          # next-intl プラグイン
├── tailwind.config.ts       # カスタムカラー（和の色）
└── tsconfig.json
```

---

## 🎨 デザインシステム

### カラーパレット（`tailwind.config.ts`）

| Token | Value | 用途 |
| --- | --- | --- |
| `kinari` | `#ede5d3` | 生成り・メイン背景 |
| `kinari-light` | `#f4eedd` | 明るい和紙 |
| `washi` | `#e8dfc9` | 和紙（宿泊セクション） |
| `sumi` | `#1a1512` | 墨・ダークセクション |
| `sumi-soft` | `#3a332c` | 本文 |
| `clay` | `#8b7f6b` | 補助テキスト |
| `shu` | `#9a2f26` | 朱・アクセント |
| `shu-deep` | `#7a241c` | 朱（濃） |
| `kin` | `#a98646` | 金・装飾 |
| `kin-light` | `#c9a86b` | 金（明） |
| `ai` | `#1d3b4f` | 藍 |

### タイポグラフィ

- **Shippori Mincho B1**: 日本語の見出し・本文（`--font-mincho`）
- **Cormorant Garamond**: 英語の見出し・装飾（`--font-cormorant`）

`next/font/google` で自動最適化（セルフホスト化）。

---

## 🌐 多言語対応（next-intl）

### ロケール追加方法

1. `i18n/routing.ts` の `locales` に新ロケールを追加
2. `messages/{locale}.json` を作成
3. 既存の `ja.json` / `en.json` と同じキー構造で翻訳

### メッセージ更新

`messages/ja.json` と `messages/en.json` は同じキー構造を維持してください。キーが片方で欠けると実行時エラーになります。

---

## 🎥 YouTube動画

- 動画ID: `y0Y9ATpIGrc`（`components/VideoSection.tsx` の `VIDEO_ID`）
- `youtube-nocookie.com` を使用しCookie同意不要
- `loading="lazy"` で LCP 最適化

### さらに高速化したい場合

```bash
npm install react-lite-youtube-embed
```

初期表示はサムネのみ、クリックで本体iframeを展開する「ファサードパターン」に差し替え可能。

---

## 🗺️ Googleマップ

`components/Access.tsx` 内で通常の Google Maps embed を使用。将来的に **Google Maps Platform API** に切り替える場合は、API キーを `.env.local` に追加。

---

## 📸 画像

- 全画像は `public/images/` に配置済み（30枚）
- 元サイトから最大解像度 (2048×1365) を取得
- `next/image` で AVIF/WebP 自動配信
- ASCII ファイル名にリネーム済みで扱いやすい

### 主要画像一覧

```
asahi-teishoku.jpg   朝日膳
kaisen-don.jpg       海鮮丼
kamameshi.jpg        釜めし膳
kaiseki-01〜03.jpg   懐石（3点）
enkai-01〜03.jpg     宴会部屋（3点）
press-*.jpg          雑誌掲載（7点）
room-01.jpg          客室
access-map.jpg       外観
ashirai.png          あしらい素材
```

---

## 🚢 デプロイ

### Vercel（推奨）

```bash
npm i -g vercel
vercel
```

環境変数は不要。`next.config.mjs` の next-intl プラグイン設定のみで動作。

### その他

- Cloudflare Pages: `npm run build` → `out/`（ただし middleware 利用のため Edge 互換確認必要）
- Node.js サーバー: `npm run build` → `npm run start`

---

## 🔮 今後の拡張アイデア

- [ ] microCMS 連携でお品書き・雑誌掲載を CMS 化
- [ ] じゃらん / Booking.com の予約ウィジェット埋め込み
- [ ] `react-lite-youtube-embed` で動画のさらなる軽量化
- [ ] Google Maps Platform API でマップをブランドカラーにカスタマイズ
- [ ] Instagram Graph API で最新投稿を自動表示
- [ ] OGP 画像の動的生成（`@vercel/og`）
- [ ] 構造化データ（Restaurant / LodgingBusiness schema.org）

---

## 📞 お問い合わせ

朝日屋  
〒819-1335 福岡県糸島市志摩芥屋874-3  
TEL: 092-328-2634 / 080-2754-7721  
Instagram: [@keyaasahiya](https://www.instagram.com/keyaasahiya)
