// Alpine.js 核心及插件
import Alpine from 'alpinejs'
import intersect from '@alpinejs/intersect'
import persist from '@alpinejs/persist'

// 註冊 Alpine.js 插件
Alpine.plugin(intersect)
Alpine.plugin(persist)

// 創建全局主題存儲
document.addEventListener('alpine:init', () => {
  Alpine.store('theme', {
    currentTheme: localStorage.getItem('theme') || 'light',
    setTheme(theme) {
      this.currentTheme = theme;
      localStorage.setItem('theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
      // 同步更新 DaisyUI theme-controller 元素
      const themeControllers = document.querySelectorAll(`.theme-controller[value="${theme}"]`);
      if (themeControllers.length > 0) {
        themeControllers.forEach(ctrl => {
          if (ctrl.type === 'checkbox') {
            ctrl.checked = (theme === 'dark');
          } else if (ctrl.type === 'radio') {
            ctrl.checked = true;
          }
        });
      }
    }
  });
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
Alpine.start()
