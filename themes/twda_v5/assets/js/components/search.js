// Alpine.js 搜尋元件 (使用 Fuse.js)
document.addEventListener('alpine:init', () => {
  Alpine.data('search', () => ({
    query: '',
    results: [],
    showResults: false,
    isLoading: false,
    fuseInstance: null,
    
    init() {
      this.$watch('query', (value) => {
        if (value.length > 2) {
          this.performSearch()
        } else {
          this.results = []
        }
      })
      
      // 動態載入 Fuse.js (僅在需要時)
      if (!this.fuseInstance) {
        this.loadSearchIndex()
      }
    },
    
    async loadSearchIndex() {
      try {
        this.isLoading = true
        
        // 定義 Fuse 選項
        const fuseOptions = {
          keys: ['title', 'content', 'description'],
          includeMatches: true,
          threshold: 0.3,
          distance: 100
        }
        
        // 嘗試從 localStorage 獲取搜尋索引
        const cachedIndex = localStorage.getItem('searchIndex')
        
        if (cachedIndex) {
          const { data, timestamp } = JSON.parse(cachedIndex)
          const cacheAge = Date.now() - timestamp
          
          // 如果緩存不超過一天，直接使用緩存數據
          if (cacheAge < 86400000) {
            // 載入 Fuse.js 函式庫
            if (typeof Fuse === 'undefined') {
              await import('fuse.js')
            }
            
            this.fuseInstance = new Fuse(data, fuseOptions)
            this.isLoading = false
            return
          }
        }
        
        // 載入 Fuse.js 函式庫
        if (typeof Fuse === 'undefined') {
          await import('fuse.js')
        }
        
        // 從服務器獲取最新索引
        const response = await fetch('/index.json')
        const searchData = await response.json()
        
        // 建立 Fuse 實例
        this.fuseInstance = new Fuse(searchData, fuseOptions)
        
        // 緩存搜尋索引
        localStorage.setItem('searchIndex', JSON.stringify({
          data: searchData,
          timestamp: Date.now()
        }))
        
        this.isLoading = false
      } catch (error) {
        console.error('載入搜尋索引失敗:', error)
        this.isLoading = false
      }
    },
    
    performSearch() {
      if (!this.fuseInstance || this.query.length < 3) return
      
      this.isLoading = true
      this.showResults = true
      
      try {
        const searchResults = this.fuseInstance.search(this.query)
        this.results = searchResults.slice(0, 10).map(result => result.item)
      } catch (error) {
        console.error('搜尋過程中發生錯誤:', error)
        this.results = []
      } finally {
        this.isLoading = false
      }
    },
    
    clearSearch() {
      this.query = ''
      this.results = []
      this.showResults = false
    }
  }))
})
