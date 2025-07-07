// Alpine.js 日期格式化元件 (使用 date-fns)
document.addEventListener('alpine:init', () => {
  Alpine.data('dateFormat', () => ({
    formattedDate: '',
    relativeDate: '',
    
    // 初始化
    init() {
      // 動態引入 date-fns
      this.importDateFns()
    },
    
    // 動態引入 date-fns 庫
    async importDateFns() {
      try {
        // 檢查是否有 date-post-date 元素
        const postDateElement = this.$el.querySelector('[data-post-date]')
        if (!postDateElement) return
        
        const postDateString = postDateElement.dataset.postDate
        const postDate = new Date(postDateString)
        
        // 動態引入 date-fns
        const { format, formatDistance } = await import('date-fns')
        const { zhTW } = await import('date-fns/locale')
        
        // 格式化日期 (繁體中文)
        this.formattedDate = format(postDate, 'yyyy年MM月dd日', { locale: zhTW })
        
        // 計算相對日期 (例如：3天前)
        this.relativeDate = formatDistance(postDate, new Date(), { 
          locale: zhTW, 
          addSuffix: true 
        })
        
        // 更新顯示
        if (postDateElement) {
          postDateElement.textContent = this.formattedDate
        }
        
        const relativeElement = this.$el.querySelector('[data-relative-date]')
        if (relativeElement) {
          relativeElement.textContent = this.relativeDate
        }
        
      } catch (error) {
        console.error('載入 date-fns 出錯:', error)
      }
    }
  }))
})
