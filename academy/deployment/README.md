# GitHub Pages deployment

目標 repo：`yakushou730/pstack-academy`。Project path：`/pstack-academy/`。

目標網址：`https://blog.yakushou.com/pstack-academy/`，沿用同帳號 user site 的 custom domain。沒有新增 CNAME、DNS 或 Articles 修改。

參照來源：

- [Articles workflow](https://github.com/yakushou730/Articles/blob/main/.github/workflows/pages.yml)。
- [Articles 網域與 project site 說明](https://github.com/yakushou730/Articles/blob/main/README.md)。
- [GitHub custom domain 繼承規則](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages#using-a-custom-domain-across-multiple-repositories)。

## 建置與發布契約

- App、研究與專屬工具保留在 `academy/`；Actions workflow 在 repo 根目錄的 `.github/workflows/pages.yml`。
- `pstack/` 不提交到本 repo。CI 用第二個 checkout 取得明確 SHA，content build 驗證所有 569 個檔案的集合／hashes。
- `npm run check` 通過後才上傳 `academy/dist`，不發布 repo tooling、node_modules 或整個研究 checkout。
- Production 的 JS／CSS／source fetch 都使用相對 base；hash routes 不需要 Pages server fallback。
- PR 只執行 build／checks，不上傳 Pages artifact 或 deploy；只有 deploy job 取得 Pages／OIDC 權限。
- Pages 要啟用一次且 Source 設為 GitHub Actions。Workflow 不放 administration token，也不試圖用一般 GITHUB_TOKEN 自行開啟 Pages。
- `.nojekyll` 隨靜態產物提供；不新增 CNAME，避免覆蓋既有 user-site custom domain。

## 驗證方式

本機執行：

```sh
cd academy
npm run check
python3 scripts/validate_build.py
```

遠端確認順序：Actions build 成功 → deploy 成功 → Pages 回傳網址 → 網站 HTML／JS／CSS／來源 JSON 實際可取得。Production build 通過不等於遠端已發布，結果以實際 deployment 狀態為準。
