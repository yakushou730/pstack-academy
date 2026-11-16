# 兩篇 X 指南的閱讀與教材補記

日期：2026-11-16（Asia/Taipei）。在使用者已登入並明確授權後，透過 Chrome 桌面視窗的 accessibility tree 閱讀兩篇原文。瀏覽器專用連接器仍回報 host unavailable；本次取得的是桌面視窗內容，不是 HTTP 抓取或帳號憑證。

## 來源與取得範圍

| 來源 | 作者 | 頁面日期 | 取得範圍 |
| --- | --- | --- | --- |
| [The Complete Guide to pstack Pt. 1](https://x.com/poteto/article/2094457600259842065?lang=en) | lauren / @poteto | 9 月 1 日；未顯示年份 | 正文主要章節、CLI 與 Feature Map 程式範例、結尾；部分長段落截斷、嵌圖未逐一核實 |
| [The Complete Guide to pstack Pt. 2](https://x.com/poteto/article/2097732320606507506) | lauren / @poteto | 9 月 10 日；未顯示年份 | 研究、文件、原型、架構、計畫與四個使用情境，讀至結尾；部分長段落截斷、嵌圖未逐一核實 |

因此取得標記使用「已讀正文（局部截斷）」，不標成「已讀全文」。兩篇都不在本站重刊全文；中文導讀、練習題、CLI 與提示範例是教學者重新編寫的內容，不是作者逐字引文。

## Part 1：驗證能力作為工程基礎

原文將可控制、觀察與除錯產品的能力放在優先位置。驗證技能結合小型 CLI 與 Feature Map，讓 Agent 找得到功能、知道如何操作，以及判定結果。功能地圖依使用者角度記錄入口與限制；工具應有可組合介面、清楚錯誤、help、結構化結果及危險操作的乾跑方式。作者建議持續維護驗證技能，並在單一環境能可靠運作後利用雲端環境擴大並行。這是作者的使用方式，不是對所有專案的雲端部署要求。

教材整理六個主題：控制與觀察、可重現 CLI、Feature Map、任務對應證據、維護，以及平行化之前的可靠基礎。對照 create-verification-skill、maintain-verification-skill、principle-build-the-lever、swarm；情境題以虛構的專案儲存功能測試地圖與維護的判斷。

## Part 2：以研究與可運行的草圖進行規劃

作者先要求 Agent 重述問題，核對其理解，再以 how、why、teach、recall 組織現況與歷史。設計從使用者教學或呼叫範例倒推，區分文件用途；面對未知以可丟棄原型比較，架構則比較用法、型別、介面與取捨，實作不符時重新設計。方向成立後，才拆成具有真實驗證結果的小型執行單位。

教材整理六個主題，連到上述技能、technical-writing、architect、arena 與 check-plan；prototype 與 multi-phase-plan 是 poteto-mode 的 Playbook，不增加成獨立 Skill。情境題用搜尋介面的需求釐清與原型比較，避免把第一個方案或長篇計畫視為已驗證設計。

## 證據邊界

- 原文出現每月 PR 產量與大幅效率提升的作者主張；本次閱讀未取得獨立量測設計、品質結果或可重現實驗，教材不呈現為保證。
- 每天維護是作者建議；學院不建立排程，也不操作任何真實產品、雲端 Agent 或帳號。
- 雲端、歷史查詢、模型與評估能力依宿主及連接器而定。
- 文章可能描述其他時間點的版本。學院的 58 個 Skills、23 個 Playbooks 與原始碼證據仍固定於 mirror commit `74bcc61bd216687b1d6d480c28f109adfc9824ec`。
- 文章文字不取代原始碼，元件映射表示主題對照，不宣稱已逐次執行本文所有工作流。
