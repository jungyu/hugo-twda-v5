---
title: "主題切換測試"
date: 2025-07-03
draft: false
---

# 主題切換測試頁面

這個頁面用於測試 DaisyUI 主題切換功能。

## 基本主題切換器

<div class="grid grid-cols-2 md:grid-cols-3 gap-4 my-8">
  <!-- 下拉式主題選單 -->
  <div class="card bg-base-100 shadow-lg p-4">
    <h3 class="font-bold mb-4">下拉選單</h3>
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-primary">選擇主題</div>
      <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        <li><input type="radio" name="theme-test" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="淺色" value="light"/></li>
        <li><input type="radio" name="theme-test" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="深色" value="dark"/></li>
        <li><input type="radio" name="theme-test" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="杯子蛋糕" value="cupcake"/></li>
        <li><input type="radio" name="theme-test" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="德古拉" value="dracula"/></li>
        <li><input type="radio" name="theme-test" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="秋季" value="autumn"/></li>
        <li><input type="radio" name="theme-test" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="翡翠" value="emerald"/></li>
      </ul>
    </div>
  </div>

  <!-- 簡單按鈕切換 -->
  <div class="card bg-base-100 shadow-lg p-4">
    <h3 class="font-bold mb-4">快速切換</h3>
    <div class="flex flex-col gap-2">
      <button onclick="setTheme('light')" class="btn btn-sm">Light</button>
      <button onclick="setTheme('dark')" class="btn btn-sm">Dark</button>
      <button onclick="setTheme('cupcake')" class="btn btn-sm">Cupcake</button>
    </div>
  </div>

  <!-- 調試信息 -->
  <div class="card bg-base-100 shadow-lg p-4">
    <h3 class="font-bold mb-4">調試信息</h3>
    <button onclick="debugTheme()" class="btn btn-sm btn-secondary">檢查主題狀態</button>
    <div id="debug-output" class="mt-2 text-xs bg-base-200 p-2 rounded"></div>
  </div>
</div>

## 顏色展示

這個區塊會根據當前主題顯示不同的顏色：

<div class="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
  <div class="bg-primary text-primary-content p-4 rounded">Primary</div>
  <div class="bg-secondary text-secondary-content p-4 rounded">Secondary</div>
  <div class="bg-accent text-accent-content p-4 rounded">Accent</div>
  <div class="bg-neutral text-neutral-content p-4 rounded">Neutral</div>
  <div class="bg-base-100 text-base-content border p-4 rounded">Base 100</div>
  <div class="bg-base-200 text-base-content p-4 rounded">Base 200</div>
  <div class="bg-base-300 text-base-content p-4 rounded">Base 300</div>
  <div class="bg-info text-info-content p-4 rounded">Info</div>
  <div class="bg-success text-success-content p-4 rounded">Success</div>
  <div class="bg-warning text-warning-content p-4 rounded">Warning</div>
  <div class="bg-error text-error-content p-4 rounded">Error</div>
</div>

<script>
// 調試用的主題切換函數
window.setTheme = function(theme) {
  console.log('Manual theme change to:', theme);
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  
  // 更新調試輸出
  const output = document.getElementById('debug-output');
  if (output) {
    output.innerHTML = `主題已設置為: ${theme}<br>時間: ${new Date().toLocaleTimeString()}`;
  }
  
  // 更新對應的 theme-controller 狀態
  document.querySelectorAll('.theme-controller').forEach(controller => {
    controller.checked = controller.value === theme;
  });
};

// 擴展調試函數
window.debugTheme = function() {
  const info = {
    currentTheme: document.documentElement.getAttribute('data-theme'),
    localStorage: localStorage.getItem('theme'),
    bodyClasses: document.body.className,
    controllersCount: document.querySelectorAll('.theme-controller').length,
    alpineAvailable: typeof Alpine !== 'undefined',
    controllers: []
  };
  
  document.querySelectorAll('.theme-controller').forEach((controller, index) => {
    info.controllers.push({
      index,
      value: controller.value,
      checked: controller.checked,
      name: controller.name
    });
  });
  
  console.log('=== Theme Debug Info ===', info);
  
  const output = document.getElementById('debug-output');
  if (output) {
    output.innerHTML = `
      <strong>當前主題:</strong> ${info.currentTheme}<br>
      <strong>本地存儲:</strong> ${info.localStorage}<br>
      <strong>控制器數量:</strong> ${info.controllersCount}<br>
      <strong>Alpine.js:</strong> ${info.alpineAvailable ? '已載入' : '未載入'}<br>
      <strong>檢查時間:</strong> ${new Date().toLocaleTimeString()}
    `;
  }
  
  return info;
};
</script>
