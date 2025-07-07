// Alpine.js 字體大小切換元件
document.addEventListener('alpine:init', () => {
  Alpine.data('fontSize', () => ({
    size: Alpine.$persist('text-base').as('fontSize'),
    
    init() {
      // 找到內容元素並應用字體大小
      this.applyFontSize();
    },
    
    setSize(newSize) {
      if (['text-custom-sm', 'text-base', 'text-custom-lg'].includes(newSize)) {
        this.size = newSize;
        this.applyFontSize();
      }
    },
    
    // 特定字體大小快捷方法
    setSmall() {
      this.setSize('text-custom-sm');
    },
    
    setMedium() {
      this.setSize('text-base');
    },
    
    setLarge() {
      this.setSize('text-custom-lg');
    },
    
    applyFontSize() {
      const content = document.getElementById('content');
      if (content) {
        // 移除所有字體大小類別
        content.classList.remove('text-custom-sm', 'text-base', 'text-custom-lg');
        // 添加新的字體大小類別
        content.classList.add(this.size);
      }
    }
  }));
});
