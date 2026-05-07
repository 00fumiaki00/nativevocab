# NativeVocab — プロジェクトメモリ

## 概要
英語ネイティブ表現学習アプリ。React (Vite) + Vercel serverless。
- **本番URL**: https://nativevocab.vercel.app（永久固定）
- **GitHub**: https://github.com/00fumiaki00/nativevocab
- **作業ディレクトリ**: `C:\Users\user\Cowork\nativevocab_fresh\nativevocab\`

## 技術スタック
- フロントエンド: React 18 (JSX, Hooks), Vite
- スタイル: インラインスタイル（CSS-in-JS）
- ストレージ: localStorage（`nv-words-v4`, `nv-streak-v2`）
- API: `/api/claude.js`（Vercel serverless → Anthropic API）
- フォント: DM Sans (Google Fonts), Inter

## デプロイフロー（完全自動）
1. 私（Claude）がコードを編集
2. `/tmp/` にcloneしたrepoからgit push（PAT: `C:\Users\user\Cowork\.github_pat`）
3. GitHub Actions（`.github/workflows/deploy.yml`）が自動でVercelにデプロイ

```bash
# セッション開始時の標準手順
PAT=$(cat /sessions/trusting-busy-meitner/mnt/Cowork/.github_pat)
git clone "https://00fumiaki00:${PAT}@github.com/00fumiaki00/nativevocab.git" /tmp/nativevocab
cd /tmp/nativevocab
git config user.email "nafinekouen@gmail.com"
git config user.name "00fumiaki00"
# 編集後
git add -A && git commit -m "..." && git push "https://00fumiaki00:${PAT}@github.com/00fumiaki00/nativevocab.git" main
```

## ファイル構成
```
src/App.jsx          # メインファイル（全コンポーネント、約1230行）
api/claude.js        # Anthropic APIプロキシ（Vercel serverless）
.github/workflows/   # GitHub Actions（自動デプロイ）
C:\Users\user\Cowork\.github_pat    # GitHub PAT（sandbox読み取り可）
C:\Users\user\Cowork\.vercel_token  # Vercel token（保存済み）
```

## データ構造
```js
// 単語オブジェクト
{
  id: "pre_0",           // pre_N (プリロード) or timestamp (ユーザー追加)
  word: "GOAT",
  meaning: "史上最高（Greatest Of All Time）",
  category: "スラング",   // CATS参照
  level: 1,              // 1〜5（★の数）
  phonetic: "/ɡoʊt/",   // IPA発音記号
  audioUS: "",           // 音声URL
  audioUK: "",
  examples: ["..."],     // 例文配列
  image: "",             // base64 or URL
  srs: { i, e, n, due }, // SM-2アルゴリズム
  history: [{date, correct}], // 最大20件
  createdAt: 1777887506629
}
```

## カテゴリー（CATS）
```js
['日常会話', 'スラング', '口語表現', '熟語・イディオム', 'ビジネス', '旅行', 'その他']
```

## コンポーネント構成
- `App` — メインコンテナ、ルーティング（view state）
- `HomeView` — ホーム画面
- `AddWordView` — 単語追加・編集
- `LibraryView` — 単語一覧（単語/カテゴリーフィルター）
- `WordCard` — 単語カード（展開で詳細）
- `StudyView` — 学習（モード選択→クイズ→結果）
- `StatsView` — 統計
- `SlangModal` — 最新スラング取得（Web検索）
- `BottomNav` — ナビゲーション

## 重要な実装メモ

### App.jsx大幅編集時の注意
**必ずPythonスクリプトで行う**（Editツールは大きいnew_stringで末尾が切れるバグあり）
```python
# パターン
pattern = r'// ===== SECTION =====\nfunction Name.*?(?=\n// ===== NEXT =====)'
match = re.search(pattern, content, re.DOTALL)
content = content[:match.start()] + NEW_CODE + content[match.end():]
```

### Dictionary API（発音記号取得）
```js
// lookupWord(word) → {phonetic, audioUS, audioUK}
`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
```

### Claude API呼び出し
```js
fetch('/api/claude', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    model: 'claude-haiku-4-5-20251001', // 説明生成はhaiku
    // model: 'claude-sonnet-4-20250514', // 単語生成はsonnet
    max_tokens: 600,
    messages: [{role: 'user', content: '...'}]
  })
})
```

### SRS（Spaced Repetition）
`nextSRS(srs, q)` — SM-2アルゴリズム。q=2で正解、q=0で不正解。

## PRELOADEDデータ
- 合計444語（pre_0〜pre_443）
- pre_0〜pre_378: スラング・口語・イディオム中心、phonetic=""が多い
- pre_379〜pre_443: 単語単体（IPA発音記号付き）
- カテゴリー別: スラング68語、口語表現67語、熟語・イディオム多数、単語65語など

## ユーザー情報
- メール: nafinekouen@gmail.com
- GitHub: 00fumiaki00
