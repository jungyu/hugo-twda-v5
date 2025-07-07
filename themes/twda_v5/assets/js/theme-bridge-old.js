// themes/twda_v5/assets/js/theme-bridge.js
document.addEventListener('alpine:init', () => {
  // 創建全局主題存儲
  Alpine.store('theme', {
    // 可用的 DaisyUI 主題
    themes: ['light', 'dark', 'cupcake', 'dracula', 'autumn', 'emerald'],
    current: localStorage.getItem('theme') || 'light',
    
    init() {
      // 設置初始主題
      this.applyTheme(this.current);
      
      // 監聽 DaisyUI theme-controller 變化
      document.querySelectorAll('.theme-controller').forEach(controller => {
        controller.addEventListener('change', (e) => {
          if (e.target.checked) {
            this.setTheme(e.target.value);
          }
        });
      });
      
      // 設置當前主題的 radio 為 checked
      const currentController = document.querySelector(`.theme-controller[value="${this.current}"]`);
      if (currentController) {
        currentController.checked = true;
      }
    },
    
    setTheme(theme) {
      if (this.themes.includes(theme)) {
        this.current = theme;
        localStorage.setItem('theme', theme);
        this.applyTheme(theme);
        
        // 發送主題變更事件
        window.dispatchEvent(new CustomEvent('theme-changed', {
          detail: { theme }
        }));
      }
    },
    
    applyTheme(theme) {
      // 更新 HTML data-theme 屬性
      document.documentElement.setAttribute('data-theme', theme);
      
      // 更新 HTML class 屬性（用於 Tailwind 的 dark mode）
      if (theme === 'dark' || theme === 'dracula') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // 更新對應的 theme-controller 狀態
      document.querySelectorAll('.theme-controller').forEach(controller => {
        controller.checked = controller.value === theme;
      });
    }
  });
  
  // 相容性：保留 darkMode 元件以支援舊版代碼
  Alpine.data('darkMode', () => ({
    dark: Alpine.$persist(false).as('darkMode'),
    
    init() {
      // 檢查系統偏好
      if (!this.dark) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.dark = prefersDark;
      }
      
      this.updateTheme();
      
      // 監聽系統主題變更
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
      // 使用新的主題存儲
      Alpine.store('theme').setTheme(this.dark ? 'dark' : 'light');
    }
  }));
});

// 在 DOM 加載完成後初始化主題系統
document.addEventListener('DOMContentLoaded', () => {
  // 確保 Alpine 已加載
  if (typeof Alpine !== 'undefined') {
    Alpine.store('theme').init();
  } else {
    // 如果 Alpine 還沒加載，等待 alpine:init 事件
    document.addEventListener('alpine:init', () => {
      Alpine.store('theme').init();
    });
  }
});
