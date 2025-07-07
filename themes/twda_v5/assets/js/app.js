// Alpine.js 核心及插件
import Alpine from 'alpinejs'
import intersect from '@alpinejs/intersect'
import persist from '@alpinejs/persist'

// 註冊 Alpine.js 插件
Alpine.plugin(intersect)
Alpine.plugin(persist)

// 創建全局主題存儲
document.addEventListener('alpine:init', () => {
  // 檢查主題存儲是否已存在，避免重複創建
  if (!Alpine.store('theme')) {
    Alpine.store('theme', {
      themes: ['light', 'dark', 'cupcake', 'dracula', 'autumn', 'emerald'],
      currentTheme: localStorage.getItem('theme') || 'light',
      
      init() {
        this.applyTheme(this.currentTheme);
        this.setupThemeControllers();
      },
      
      setTheme(theme) {
        if (this.themes.includes(theme)) {
          this.currentTheme = theme;
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
      },
      
      setupThemeControllers() {
        document.querySelectorAll('.theme-controller').forEach(ctrl => {
          ctrl.addEventListener('change', (e) => {
            if (e.target.checked) {
              this.setTheme(e.target.value);
            }
          });
        });
        
        // 設置初始狀態
        const initialController = document.querySelector(`.theme-controller[value="${this.currentTheme}"]`);
        if (initialController) {
          initialController.checked = true;
        }
      }
    });
  }
});

// 自定義 Alpine.js 元件
import './components/dropdown'
import './components/modal'
import './components/tabs'
import './components/darkMode'
import './components/search'
import './components/fontSize'
import './components/dateFormat'
import themeManager from './components/themeManager'

// 註冊進階主題管理系統
Alpine.data('themeManager', themeManager)

// 啟動 Alpine.js
window.Alpine = Alpine

// 確保 Alpine.js 在 DOM 載入後啟動
document.addEventListener('DOMContentLoaded', () => {
  Alpine.start()
  
  // 初始化主題存儲
  setTimeout(() => {
    const store = Alpine.store('theme');
    if (store && store.init) {
      store.init();
    }
  }, 100);
})
