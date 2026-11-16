# 作業繳交文字（標題個人資料請自行補齊）

繳交標題：［學校簡稱］ ［學號］ ［系級簡稱］ ［姓名］ 機器學習口袋筆記

## 1. 專案簡介

「機器學習口袋筆記」是一個面向初學者的繁體中文學習網站，收錄資料切分、過度擬合、交叉驗證、混淆矩陣與資料洩漏五篇筆記。每篇都有已查證概念、自編示例、常見誤解、一句話重點、自我測驗與來源。首頁支援搜尋和分類，文章有獨立網址，適合持續擴充。

## 2. GitHub Repository 連結

https://github.com/roywu0521-lgtm/ml-pocket-notes

## 3. 網頁連結

https://roywu0521-lgtm.github.io/ml-pocket-notes/

## 4. AGENTS.md

規則文件：https://github.com/roywu0521-lgtm/ml-pocket-notes/blob/main/AGENTS.md

網頁展示與下載：https://roywu0521-lgtm.github.io/ml-pocket-notes/rules.html

## 5. 新增內容時，規則如何協助 AI？

AGENTS.md 定義專案目的、資料夾結構、命名方式、視覺風格、內容欄位、查證原則與驗證命令。之後只要請 AI 先讀規則，複製 JSON 範本並填寫新的概念、示例、測驗與來源，再執行 build 和 test，網站就能以相同版型產生新頁面並加入首頁。第五篇「資料洩漏」即展示同一套格式的延伸；不必為每一篇重新撰寫網頁樣式。若欄位遺漏、順序重複或相關文章不存在，檢查程式會回報錯誤。

本專案透過 AI 協作製作，概念來源列於各頁；案例與測驗為自編教學內容。
