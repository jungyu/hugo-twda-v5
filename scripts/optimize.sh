#!/bin/bash

# 資源最佳化腳本
echo "🚀 開始最佳化資源..."

# 確認 public 目錄存在
if [ ! -d "public" ]; then
  echo "❌ public 目錄不存在。請先執行 Hugo 建構。"
  exit 1
fi

# 檢查必要工具
for cmd in jpegoptim optipng pngquant svgo brotli gzip; do
  if ! command -v $cmd &> /dev/null; then
    echo "❌ 找不到命令 $cmd。請安裝所需工具。"
    exit 1
  fi
done

# 原始大小記錄
original_size=$(du -sh public | cut -f1)

# 最佳化 JPEG 圖片
echo "📷 最佳化 JPEG 圖片..."
find public -type f \( -name "*.jpg" -o -name "*.jpeg" \) | xargs -I{} jpegoptim --max=85 --strip-all --all-progressive --quiet "{}"

# 最佳化 PNG 圖片
echo "📷 最佳化 PNG 圖片..."
find public -type f -name "*.png" | xargs -I{} optipng -quiet -o5 "{}"
find public -type f -name "*.png" | xargs -I{} pngquant --quality=65-80 --skip-if-larger --force --ext=.png --output="{}" "{}"

# 最佳化 SVG
echo "🖌️ 最佳化 SVG 圖片..."
find public -type f -name "*.svg" | xargs -I{} svgo --multipass --quiet "{}"

# 產生壓縮版本
echo "🗜️ 產生 Brotli 壓縮版本..."
find public -type f \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.xml" -o -name "*.svg" -o -name "*.json" \) | xargs -I{} brotli -q 11 -f "{}"

echo "🗜️ 產生 Gzip 壓縮版本..."
find public -type f \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.xml" -o -name "*.svg" -o -name "*.json" \) | xargs -I{} gzip -9 -k -f "{}"

# 最終大小記錄
compressed_size=$(du -sh public | cut -f1)

echo "✅ 資源最佳化完成！"
echo "📊 統計:"
echo "  原始大小: $original_size"
echo "  最終大小: $compressed_size"

# 列出大型檔案
echo "📁 最大的 10 個檔案:"
find public -type f -not -name "*.br" -not -name "*.gz" | xargs du -h | sort -hr | head -n 10

echo "🏁 完成!"
