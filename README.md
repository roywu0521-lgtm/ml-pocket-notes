# 機器學習口袋筆記

一個以 **AGENTS.md 驅動內容延伸**的繁體中文學習網站。每篇筆記固定包含概念、自編示例、常見誤解、一句話重點、三選一自測與原始來源。以內容 JSON 與共用產生器分離知識和版型，不需要付費服務或 API。

- 公開網站：https://roywu0521-lgtm.github.io/ml-pocket-notes/
- 協作規則展示：https://roywu0521-lgtm.github.io/ml-pocket-notes/rules.html
- GitHub：https://github.com/roywu0521-lgtm/ml-pocket-notes
- [作業繳交文字](SUBMISSION.md) · [驗證紀錄](VERIFICATION.md)

## 本機使用

需求：Node.js 22 以上；零外部相依套件，不需要 npm install。

```sh
npm run build
npm test
npm run serve
```

開啟 <http://127.0.0.1:4173>。也能直接開啟 `docs/index.html` 閱讀，搜尋與分類不依賴 fetch。停止預覽按 Ctrl+C。

## 新增筆記

1. 請 AI 先讀 [AGENTS.md](AGENTS.md)。
2. 複製 [範本](templates/note.json) 到 `content/notes/your-topic.json`。
3. 填入完整欄位，使用相同 slug 與檔名，選未使用的 order；查證來源並記錄日期。
4. 執行 build 和 test，檢查新頁面、搜尋、分類與來源。
5. 一併提交來源與 `docs/`；請勿手動維護多份文章版型。

例如新增「資料洩漏」的紀錄見 [examples/extension.md](examples/extension.md)。網站的「協作規則」頁直接展示根目錄 AGENTS.md，避免文件內容不一致。

## 專案結構

`content/notes` 放知識，`src` 放共用樣式與互動，`scripts` 放驗證／產生器／預覽，`templates` 放內容範本，`docs` 是可公開的產物。完整命名、格式、視覺與 AI 變更規則見 AGENTS.md。

## GitHub Pages 發佈

將本專案獨立上傳到公開 repository，包含產生好的 `docs/`。在 repository 的 Settings → Pages，選 Deploy from a branch → `main` → `/docs` → Save。等待部署成功後，使用 GitHub 回傳的網址驗證首頁、文章與規則頁。不要把本專案的上層課程資料夾整包上傳。

GitHub 官方操作來源：https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 驗證範圍

`npm test` 檢查資料契約、非未來日期、排序唯一性、相關文章、HTML 本機資源／錨點與規則同步；它不會自動查證知識正確性、不會確認外部網址可用，也不能取代瀏覽器的版面與互動檢查。外部來源必須由作者實際查核。

## AI 協作與內容說明

本專案由使用者選定主題，透過 AI 協作建立規則、筆記與網頁。知識摘要參考各頁列出的官方文件；案例與測驗為教學自編，不代表課程官方講義或實際模型實驗。
