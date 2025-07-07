# TWDA v5 - Hugo Theme

現代化 Hugo 主題，完整整合 TailwindCSS v4 + DaisyUI v5 + Alpine.js v3，符合 Hugo v0.147.9+ 新模板系統標準。

## ✨ 特色功能

- 🎨 **現代化設計**: 基於 DaisyUI v5 的美觀 UI 組件
- 🌙 **多主題支援**: 10+ 內建主題，支援亮暗模式切換
- 📱 **響應式設計**: 完美適配各種裝置螢幕
- 🚀 **效能優化**: 圖片處理、資源最小化、CDN 整合
- 🔍 **SEO 友好**: 完整的 SEO 優化與結構化資料
- 🌐 **國際化**: 支援多語言與在地化
- ♿ **無障礙設計**: 遵循 WCAG 2.1 AA 標準
- 🔧 **開發友好**: 模組化架構、豐富的 shortcodes

## 🛠️ 技術棧

- **Hugo**: v0.147.9+ (新模板系統)
- **TailwindCSS**: v4.1.11
- **DaisyUI**: v5.0.43  
- **Alpine.js**: v3.14.9
- **PostCSS**: v8.4+

## 📦 主題架構

```text
themes/twda_v5/
├── layouts/                    # 模板文件
│   ├── baseof.html            # 基礎模板
│   ├── home.html              # 首頁模板
│   ├── page.html              # 文章頁面
│   ├── section.html           # 列表頁面
│   ├── taxonomy.html          # 分類法頁面
│   ├── term.html              # 標籤頁面
│   ├── _partials/             # 組件目錄
│   │   ├── components/        # UI 組件
│   │   ├── helpers/           # 輔助函數
│   │   ├── seo/              # SEO 組件
│   │   └── *.html            # 其他 partials
│   ├── _shortcodes/          # 內容組件
│   └── _markup/              # 渲染鉤子
├── assets/                   # 資源文件
├── static/                   # 靜態文件
├── data/                     # 資料文件
├── i18n/                     # 國際化
└── archetypes/              # 內容模板
```

## 🚀 快速開始

### 1. 安裝主題

```bash
# 進入你的 Hugo 專案目錄
cd your-hugo-site

# 複製主題到 themes 目錄
git clone https://github.com/yourusername/twda_v5.git themes/twda_v5
```

### 2. 配置主題

在 `config.toml` 中設定主題：

```toml
theme = "twda_v5"

[params]
  author = "Your Name"
  description = "Your site description"
  
  [params.theme]
    default = "light"
    
  [params.seo]
    image = "/images/og-image.jpg"
    twitter = "@yourusername"
```

### 3. 啟動開發

```bash
hugo server
```

## 🎨 主題切換

支援 10+ DaisyUI 主題：

- `light` - 淺色主題 (預設)
- `dark` - 深色主題
- `cupcake` - 蛋糕主題
- `bumblebee` - 大黃蜂主題
- `emerald` - 翡翠主題
- `corporate` - 企業主題
- `synthwave` - 合成波主題
- `retro` - 復古主題
- `cyberpunk` - 賽博龐克主題
- `valentine` - 情人節主題

## 📝 內容建立

### 建立文章

```bash
hugo new content/posts/my-post.md
```

### 建立頁面

```bash
hugo new content/about.md
```

### 建立文檔

```bash
hugo new content/docs/quick-start.md
```

## 🔧 Shortcodes

主題提供豐富的 shortcodes：

### Alert 警告框

```markdown
{{< alert type="info" title="提示" >}}
這是一個資訊提示框
{{< /alert >}}
```

### Tabs 頁籤

```markdown
{{< tabs >}}
{{< tab "標籤 1" >}}
內容 1
{{< /tab >}}
{{< tab "標籤 2" >}}
內容 2
{{< /tab >}}
{{< /tabs >}}
```

### Gallery 圖片畫廊

```markdown
{{< gallery columns="3" >}}
![描述](image1.jpg "標題 1")
![描述](image2.jpg "標題 2")
![描述](image3.jpg "標題 3")
{{< /gallery >}}
```

### Video 影片

```markdown
{{< video src="video.mp4" poster="poster.jpg" >}}
```

## 🌐 國際化

支援繁體中文與英文：

```toml
[languages]
  [languages.zh-tw]
    title = "我的網站"
    weight = 1
  [languages.en]
    title = "My Website"
    weight = 2
```

## 📊 SEO 優化

- ✅ Meta 標籤優化
- ✅ Open Graph 支援
- ✅ Twitter Cards
- ✅ 結構化資料 (JSON-LD)
- ✅ XML Sitemap
- ✅ robots.txt
- ✅ 語義化 HTML

## 🎯 效能特色

- ⚡ 圖片自動優化 (WebP/AVIF)
- 📦 CSS/JS 資源最小化
- 🗜️ 資源打包與壓縮  
- 🎨 關鍵 CSS 內聯
- 📱 響應式圖片
- 🔗 資源預載入

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📄 授權

MIT License

## 🔗 相關連結

- [Hugo 官網](https://gohugo.io)
- [TailwindCSS](https://tailwindcss.com)
- [DaisyUI](https://daisyui.com)
- [Alpine.js](https://alpinejs.dev)

## 特色功能

- 🎨 現代化設計系統
- 🌙 深色/淺色主題切換
- 📱 完全響應式設計
- ⚡ 極快的載入速度
- 🔍 SEO 優化
- ♿ 無障礙支援

## 安裝使用

請參考完整的建構指南文檔。

## 授權

MIT License
