// Alpine.js 深色模式切換元件
document.addEventListener('alpine:init', () => {
  Alpine.data('darkMode', () => ({
    dark: Alpine.$persist(false).as('darkMode'),
    
    init() {
      // 檢查系統偏好
      if (!this.dark) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        this.dark = prefersDark
      }
      
      this.updateTheme()
      
      // 監聽系統主題變更
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('darkMode')) {
          this.dark = e.matches
          this.updateTheme()
        }
      })
    },
    
    toggle() {
      this.dark = !this.dark
      this.updateTheme()
    },
    
    updateTheme() {
      // 更新 HTML data-theme 屬性
      document.documentElement.setAttribute('data-theme', this.dark ? 'dark' : 'light')
      
      // 更新 HTML class 屬性
      if (this.dark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }))
})
