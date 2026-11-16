# Implementation Validation

此報告區分靜態／自動化檢查與真實瀏覽器驗證。研究來源固定為 `74bcc61bd216687b1d6d480c28f109adfc9824ec`。

## 最新結果

| 項目 | 結果 |
|---|---|
| Typecheck／Lint | PASS |
| Vitest | 4 files、16 tests PASS |
| Production Build／靜態來源產物 | PASS |
| pstack 原始碼 | Working tree clean |
| 真實瀏覽器／手機／鍵盤／視覺 | NOT VERIFIED，原因見下方 |

機器可讀摘要：[results.json](results.json)。

## 已執行的檢查

確切結果見 [check.log](check.log)。檢查的 scope：

- 內容建置：確認原始 source commit、569 個檔案的集合與 hashes；58 個 Skills、23 Playbooks 對應；137 個 steps／sections 與來源 marker／行號；93 條已核對關係；107 份純文字來源。
- TypeScript strict typecheck 與 ESLint：網站與測試程式。
- Vitest：完整 catalog／source integrity、每一步 excerpt、選項／evidence、direct 與 transitive 路徑、cycle／filter／方向、中文與多詞搜尋、無效 route／step、過期／損壞進度、答案修正／清除、全元件與全工作流步驟的 server rendering。
- Production build：產出 `dist/`，source payload 靜態複製，不需 runtime 存取 pstack。
- `python3 scripts/validate_build.py`：確認 dist/index 引用的 JS／CSS 與全部來源 payload 存在、版本與 hashes 一致。
- `python3 research/validate.py`：文件本機連結、研究清單與重現性，以及 pstack working tree clean。排除網站 dependencies／build outputs 的第三方文件。

本次使用可讀的本機 npm 快取完成離線安裝；lockfile 仍使用官方 registry URL 與 package integrity，沒有個人絕對路徑或本機 tarball dependency。首次失敗的測試發現搜尋沒有涵蓋 I/O／情境內容，已修正 selector 再重跑。完整最後結果以 log 為準。

## 瀏覽器驗證的實際限制

**未完成，不標為 PASS。**

1. In-app browser 連接器回覆 `The browser access host is unavailable`；沒有回覆使用者的 OS 權限被拒絕，不能把原因歸咎於電腦未開權限。
2. 改用原生 Chrome 建立專用分頁並前往本機預覽網址，實際觀察到 `ERR_CONNECTION_REFUSED`。
3. 預覽程序的終端機輸出為 `Error: listen EPERM: operation not permitted 127.0.0.1:4173`。因此本次受限執行環境未能啟動可被瀏覽器連線的 server。
4. 沒有繞過 sandbox／防火牆／系統安全設定；沒有拍攝或交付未真正渲染的網站截圖。

Server-render tests 只能證明各內容頁可產生 markup、引用與 Simulation 標記存在，**不能證明 click、localStorage、browser fetch、responsive layout 或鍵盤焦點已在真正瀏覽器成功運作**。

## 待跑的 Live QA 清單

在一般本機終端機啟動 `npm run dev`，或 build 後啟動 `npm run preview`。以下各項仍待 browser 驗證：

- [ ] 首頁：點三個架構階段與節點，確認細節改變；按開始導覽確認捲動，不進入不存在 route。
- [ ] 元件：搜尋 architect、中文「型別 邊界」、不可能詞；切原則／工具類型；空結果可清除。
- [ ] 元件詳情：architect→arena direct；兩跳顯示 Feature／arena 的 chain；切方向／關係與排序，點 graph node 可導航。
- [ ] 工作流：Bug fix 第一步前一個 disabled，最後一步下一個 disabled；原文／I/O／conditional metadata 正確；refresh `#/workflows/bug-fix?step=3` 保留步驟。
- [ ] Source Viewer：從 step 點引用，載入後 hash check 成功、行號／範圍對應；搜尋、完整檔案、外部固定 SHA URL；中斷載入有可理解的重試。
- [ ] 作者頁：切取得層級；X／YouTube 無全文且沒有虛構內容；Maven 時間標成主辦方章節。
- [ ] 五個 Simulation：先錯誤選項看到解釋，再修正、下一題；restart；全對顯示完成；不發生真實 PR／TLC 操作。
- [ ] 進度：reload 恢復作答／visited，清除可重置；儲存被拒絕仍可使用本次進度。
- [ ] 390／768／1440px：主要內容可讀、menu 行為、桌面與手機 graph／table 不遮擋。
- [ ] 鍵盤：skip link、Tab／Enter 選節點與步驟、Escape 關閉手機 menu 並回到開啟按鈕、可見 focus；減少動態效果正常。
- [ ] Production preview：來源 payload 正常讀取，沒有 runtime 依賴 `../pstack/`；沒有 console runtime errors。

完成後才可補 live QA 結果與真實截圖。本報告不把打勾清單的存在當成已跑過。
