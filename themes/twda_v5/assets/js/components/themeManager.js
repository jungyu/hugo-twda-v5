// 進階主題管理系統
// 先定義一個輔助函數來獲取系統偏好
const getSystemPreferenceHelper = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export default () => ({
  // 使用 DaisyUI v5 精選主題
  themes: ['light', 'dark', 'cupcake', 'dracula', 'autumn', 'emerald'],
  currentTheme: localStorage.getItem('theme') || getSystemPreferenceHelper(),
  fontSize: localStorage.getItem('fontSize') || 'base',
  fontSizeOptions: ['sm', 'base', 'lg', 'xl'],
  
  init() {
    this.applyTheme(this.currentTheme);
    this.applyFontSize(this.fontSize);
    this.setupListeners();
    
    // 發送初始主題加載事件
    window.dispatchEvent(new CustomEvent('theme-loaded', { 
      detail: { theme: this.currentTheme }
    }));
  },
  
  getSystemPreference() {
    return getSystemPreferenceHelper();
  },
  
  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.currentTheme = theme;
    
    // 發送主題變更事件
    window.dispatchEvent(new CustomEvent('theme-changed', { 
      detail: { theme }
    }));
  },
  
  applyFontSize(size) {
    // 移除所有字體大小類
    this.fontSizeOptions.forEach(option => {
      document.documentElement.classList.remove(`font-size-${option}`);
    });
    
    // 應用選擇的字體大小
    if (size !== 'base') {
      document.documentElement.classList.add(`font-size-${size}`);
    }
    
    localStorage.setItem('fontSize', size);
    this.fontSize = size;
    
    // 發送字體大小變更事件
    window.dispatchEvent(new CustomEvent('font-size-changed', { 
      detail: { size }
    }));
  },
  
  setupListeners() {
    // 監聽系統偏好變更
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('theme-locked')) {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
});
