// Alpine.js 模態視窗元件
document.addEventListener('alpine:init', () => {
  Alpine.data('modal', () => ({
    visible: false,
    
    show() {
      this.visible = true
      document.body.classList.add('overflow-hidden')
    },
    
    hide() {
      this.visible = false
      document.body.classList.remove('overflow-hidden')
    },
    
    toggle() {
      this.visible ? this.hide() : this.show()
    }
  }))
})
