// 主題橋接腳本 - 與 Alpine.js 的主題存儲協調工作
(function() {
  'use strict';
  
  // 等待 Alpine.js 完全初始化
  document.addEventListener('alpine:init', () => {
    // 檢查 Alpine.js 主題存儲是否已存在
    if (window.Alpine && window.Alpine.store && !window.Alpine.store('theme')) {
      // 創建主題存儲（如果尚未創建）
      initAlpineThemeStore();
    }
  });

  function initAlpineThemeStore() {
    console.log('初始化主題橋接');
    
    // 創建 Alpine.js 主題存儲
    window.Alpine.store('theme', {
      themes: ['light', 'dark', 'cupcake', 'dracula', 'autumn', 'emerald'],
      current: localStorage.getItem('theme') || 'light',
      
      init() {
        // 設置初始主題
        this.applyTheme(this.current);
        
        // 設置主題控制器事件監聽
        document.querySelectorAll('.theme-controller').forEach(ctrl => {
          ctrl.addEventListener('change', (e) => {
            if (e.target.checked) {
              this.setTheme(e.target.value);
            }
          });
        });
        
        // 設置初始選中狀態
        const initialController = document.querySelector(`.theme-controller[value="${this.current}"]`);
        if (initialController) {
          initialController.checked = true;
        }
      },
      
      setTheme(theme) {
        if (this.themes.includes(theme)) {
          this.current = theme;
          localStorage.setItem('theme', theme);
          this.applyTheme(theme);
          
          // 觸發自定義事件
          window.dispatchEvent(new CustomEvent('theme-changed', {
            detail: { theme: theme }
          }));
        }
      },
      
      applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // 更新 Tailwind 的 dark 模式
        if (theme === 'dark' || theme === 'dracula') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        
        // 同步更新所有 theme-controller 元素
        document.querySelectorAll('.theme-controller').forEach(ctrl => {
          ctrl.checked = (ctrl.value === theme);
        });
      }
    });
    
    // 創建 darkMode 組件
    window.Alpine.data('darkMode', () => ({
      dark: window.Alpine.$persist(false).as('darkMode'),
      
      init() {
        if (!this.dark) {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          this.dark = prefersDark;
        }
        
        this.updateTheme();
        
        // 監聽系統主題變化
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
          if (!localStorage.getItem('darkMode')) {
            this.dark = e.matches;
            this.updateTheme();
          }
        });
      },
      
      toggle() {
        this.dark = !this.dark;
        this.updateTheme();
      },
      
      updateTheme() {
        const store = window.Alpine.store('theme');
        if (store) {
          store.setTheme(this.dark ? 'dark' : 'light');
        }
      }
    }));
  }

  // DOM 載入完成時的備用初始化
  document.addEventListener('DOMContentLoaded', () => {
    // 延遲檢查，確保 Alpine.js 有時間初始化
    setTimeout(() => {
      if (typeof Alpine !== 'undefined' && Alpine.store && Alpine.store('theme')) {
        const store = Alpine.store('theme');
        if (store && store.init) {
          store.init();
        }
      }
    }, 100);
  });
})();
