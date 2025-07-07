// Alpine.js 頁籤元件
document.addEventListener('alpine:init', () => {
  Alpine.data('tabs', () => ({
    selectedTab: null,
    tabs: [],
    
    init() {
      this.tabs = Array.from(this.$el.querySelectorAll('[x-tab]')).map(tab => ({
        id: tab.getAttribute('x-tab'),
        el: tab
      }))
      
      // 預設選擇第一個頁籤
      this.selectedTab = this.tabs.length > 0 ? this.tabs[0].id : null
    },
    
    selectTab(id) {
      this.selectedTab = id
    },
    
    isSelected(id) {
      return this.selectedTab === id
    }
  }))
})
