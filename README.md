# pstack Academy

以繁體中文從原始碼理解 pstack 的互動學院。探索 58 個 Skills、23 個 Playbooks、相依關係與三個教學 Simulation。

**發布網址：https://blog.yakushou.com/pstack-academy/**

GitHub Pages project site 使用 repo 名稱作為路徑。沿用同帳號 user site 的 `blog.yakushou.com` 網域，這個 repo 不新增 `CNAME`，不修改 Articles 或 Hugo 網站。

## 本機執行

需要 Node.js 22.12+、npm、Python 3 與固定版本的唯讀 pstack 研究來源。第一次 clone 後，在 repo 根目錄執行：

```sh
git clone https://github.com/backnotprop/pstack.git pstack
git -C pstack checkout --detach 74bcc61bd216687b1d6d480c28f109adfc9824ec
cd academy
npm ci
npm run dev
```

已有同一版本的 `pstack/` 就不必重新 clone。此目錄列入 gitignore，原始碼不修改、不 vendoring 到本 repo；來源 commit 與全部 hashes 由 content build 檢查。

## 發布

`.github/workflows/pages.yml` 參照 Articles 的 build／deploy 分離方式，只有 main push 或手動執行才發布。PR 執行相同檢查，沒有 Pages 發布權限。

流程：checkout Academy → checkout 固定研究 source → npm ci → Typecheck／Lint／Tests／Build → audit Pages paths → 上傳 academy/dist → deploy。

GitHub Settings → Pages 的 Source 應設為 **GitHub Actions**。完成首次設定後，更新 main 即可自動發布。只有 deploy job 具有 `pages: write`／`id-token: write`，build 不執行研究來源的 scripts，也不持續保存 checkout credentials。

`base: './'` 與 hash routing 讓 assets、來源 JSON、詳情路徑適用於 `/pstack-academy/`。保留 repo 名稱，網址才不會改變。

## 文件

- [安裝、功能與內容擴充](academy/README.md)
- [原始碼研究](academy/research/README.md)
- [自動檢查與瀏覽器驗證狀態](academy/validation/README.md)
- [部署設定與驗證](academy/deployment/README.md)

研究基準為 backnotprop/pstack mirror `0.15.42`，commit `74bcc61bd216687b1d6d480c28f109adfc9824ec`。作者 Lauren Tan／poteto，上游 cursor/plugins/pstack；本學院不是官方產品。原始碼在 Source Viewer 依來源 MIT 授權提供。
