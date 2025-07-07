// Alpine.js 下拉選單元件
document.addEventListener('alpine:init', () => {
  Alpine.data('dropdown', () => ({
    open: false,
    
    toggle() {
      this.open = !this.open
    },
    
    close() {
      this.open = false
    }
  }))
})
